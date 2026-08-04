"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AlertCircle, ArrowRight, Check, Loader2, X } from "lucide-react";
import { site } from "@/lib/site";

/**
 * The newsletter dialog that opens itself on a first visit.
 *
 * An uninvited modal is the most intrusive thing on a marketing site, so
 * everything here is about it happening exactly once and being trivially
 * escapable: it waits before appearing, closes on Escape, on a backdrop click
 * and on an explicit button, and it records the outcome so a second visit is
 * left alone. A visitor who dismisses it must never see it again — that is the
 * whole contract, and localStorage is what keeps it across sessions.
 *
 * Deliberately not rendered until the delay elapses. Mounting it hidden would
 * put a dialog in the accessibility tree of every page for anyone using a
 * screen reader, on a page they may never have wanted it on.
 */

/**
 * What we remember, and why the two are separate keys.
 *
 * A dismissal is a "not now" that could reasonably be asked again after a long
 * gap; a subscription is permanent. Keeping them apart means a future change to
 * re-prompt dismissers cannot accidentally re-prompt subscribers.
 */
const DISMISSED_KEY = "quantalog_newsletter_dismissed";
const SUBSCRIBED_KEY = "quantalog_newsletter_subscribed";

/** How long to wait before opening. Long enough to read the hero first. */
const OPEN_DELAY_MS = 12_000;

/** Matches the closing animation in globals.css, so the node leaves when it finishes. */
const CLOSE_ANIM_MS = 180;

/**
 * Pages the dialog stays off.
 *
 * `/thank-you` and `/contact` already have the visitor's address or are asking
 * for it — a second, uninvited ask reads as not having noticed. The legal pages
 * are where someone goes specifically to check what we collect, and popping a
 * form over that answer undercuts it.
 */
const EXCLUDED = ["/thank-you", "/contact", "/privacy", "/terms"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type State = "idle" | "sending" | "done" | "error";

/** Reading localStorage throws in some privacy modes — treat that as "not seen". */
function seen(): boolean {
  try {
    return (
      localStorage.getItem(DISMISSED_KEY) === "1" ||
      localStorage.getItem(SUBSCRIBED_KEY) === "1"
    );
  } catch {
    return false;
  }
}

function remember(key: string) {
  try {
    localStorage.setItem(key, "1");
  } catch {
    // Storage denied. The dialog will open again next visit, which is the
    // right failure: showing it twice is better than a crash on a landing page.
  }
}

export function NewsletterDialog() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [state, setState] = useState<State>("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  /** What had focus before the dialog took it, so it can be handed back. */
  const restoreRef = useRef<HTMLElement | null>(null);

  // The timer starts over on navigation rather than carrying across it: the
  // delay is meant to be time spent reading, and someone who moved pages has
  // been reading, not idling on the one page the timer began on.
  useEffect(() => {
    if (seen()) return;
    if (EXCLUDED.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return;

    const t = setTimeout(() => {
      restoreRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    }, OPEN_DELAY_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  const close = useCallback(
    (reason: "dismissed" | "subscribed") => {
      remember(reason === "subscribed" ? SUBSCRIBED_KEY : DISMISSED_KEY);
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
        // Hand focus back where it was, or the next Tab starts from the top of
        // the document rather than where the visitor was reading.
        restoreRef.current?.focus?.();
      }, CLOSE_ANIM_MS);
    },
    [],
  );

  // Escape closes, and focus is kept inside while it is open. A modal that can
  // be tabbed out of leaves a keyboard user typing into a page they cannot see.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close("dismissed");
        return;
      }
      if (e.key !== "Tab") return;

      const root = document.getElementById("newsletter-dialog");
      if (!root) return;
      const focusable = root.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href]',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    // The page behind must not scroll under the dialog.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the close button rather than the input: opening straight into a
    // text field on a page nobody asked to fill in is presumptuous, and it
    // hides the way out from a screen reader until they tab backwards.
    const t = setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      clearTimeout(t);
    };
  }, [open, close]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;

    const value = email.trim();
    if (!value) {
      setError("We need an address to send it to.");
      inputRef.current?.focus();
      return;
    }
    if (!EMAIL.test(value)) {
      setError("That does not look like an email address.");
      inputRef.current?.focus();
      return;
    }

    setError("");
    setState("sending");

    try {
      const form = e.currentTarget;
      const res = await fetch(`${site.api}/api/public/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value,
          website: new FormData(form).get("website"), // honeypot
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.error ||
            (res.status === 429
              ? "Too many signups from here. Try again in a little while."
              : "That did not go through. Please try again."),
        );
      }

      setState("done");
      // Let the confirmation be read before the dialog leaves.
      setTimeout(() => close("subscribed"), 2200);
    } catch (err) {
      const network = err instanceof TypeError;
      setError(
        network
          ? "We could not reach the server. Check your connection and try again."
          : err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      );
      setState("error");
    }
  }

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center ${
        closing ? "nl-closing" : ""
      }`}
    >
      <div
        className="nl-backdrop absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={() => close("dismissed")}
        aria-hidden="true"
      />

      <div
        id="newsletter-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-title"
        aria-describedby="newsletter-body"
        className="nl-card card relative w-full max-w-md p-6 sm:p-7"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={() => close("dismissed")}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-lg p-1.5 text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg"
        >
          <X size={17} />
        </button>

        {state === "done" ? (
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent/15">
              <Check size={20} className="text-accent" />
            </div>
            <h2 id="newsletter-title" className="text-lg font-semibold tracking-tight">
              You&rsquo;re on the list
            </h2>
            <p id="newsletter-body" className="mt-2 text-sm text-fg-muted">
              Check your inbox — we&rsquo;ve sent a confirmation.
            </p>
          </div>
        ) : (
          <>
            <h2
              id="newsletter-title"
              className="pr-8 text-lg font-semibold tracking-tight sm:text-xl"
            >
              Analytics without the creepy parts
            </h2>
            <p id="newsletter-body" className="mt-2 text-sm leading-relaxed text-fg-muted">
              A few times a month: what we ship, and what we learn building
              analytics that needs no cookie banner. No sales sequence, and one
              click to stop.
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-5">
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <input
                  ref={inputRef}
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                    if (error) setError("");
                  }}
                  placeholder="you@company.com"
                  autoComplete="email"
                  aria-label="Email address"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className="q-input flex-1"
                />
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-fg shadow-soft transition duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {state === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Joining
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Hidden from people, irresistible to bots. Not display:none —
                  some bots skip those — and never focusable or announced. */}
              <div
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
              >
                <label htmlFor="newsletter-website">Do not fill this in</label>
                <input
                  id="newsletter-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {error && (
                <p
                  id="newsletter-error"
                  role="alert"
                  className="mt-3 flex items-start gap-2 text-sm text-red-400"
                >
                  <AlertCircle size={15} className="mt-0.5 shrink-0" />
                  {error}
                </p>
              )}
            </form>

            <p className="mt-4 text-xs leading-relaxed text-fg-faint">
              We use your address for the newsletter and nothing else.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
