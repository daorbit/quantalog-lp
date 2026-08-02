"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { SelectField } from "./select-field";
import { site } from "@/lib/site";

/**
 * The contact form.
 *
 * Posts to the public, unauthenticated endpoint on the API — the rest of the
 * marketing site is static, and this is the only thing on it that talks back.
 *
 * Validation runs here so the message is useful when it arrives, but it is a
 * convenience and not a guard: the server re-checks every field, because
 * anything a browser enforces is advisory.
 *
 * `noValidate` is deliberate. The browser's own validation renders an OS-drawn
 * bubble that no page styling can reach — a grey system tooltip on a dark page
 * — and it stops at the first bad field instead of showing everything that
 * needs fixing. Doing it here costs a function and gets both back.
 */

const SUBJECTS = [
  { value: "general", label: "General enquiry" },
  { value: "sales", label: "Pricing and plans" },
  { value: "support", label: "Help with my account" },
  { value: "platform-api", label: "Platform API / white label" },
  { value: "privacy", label: "Privacy and compliance" },
  { value: "other", label: "Something else" },
];

type State = "idle" | "sending" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

/** Permissive on purpose: the only thing worth rejecting is a value that
 *  cannot possibly be an address. A false negative loses a real message. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};

  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();

  if (!name) errors.name = "Please tell us your name.";

  if (!email) errors.email = "We need an address to reply to.";
  else if (!EMAIL.test(email)) errors.email = "That does not look like an email address.";

  if (!message) errors.message = "Please write your message.";
  else if (message.length < 10) errors.message = "A little more detail, please — at least 10 characters.";

  return errors;
}

export function ContactForm() {
  const router = useRouter();
  const [state, setState] = useState<State>("idle");
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    if (Object.keys(found).length) {
      setErrors(found);
      setFormError("");
      setState("idle");
      // Put the cursor on the first problem rather than making someone hunt
      // for which of five fields the message refers to.
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setFormError("");
    setState("sending");

    try {
      const res = await fetch(`${site.api}/api/public/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          subject: data.get("subject"),
          message: data.get("message"),
          website: data.get("website"), // honeypot
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.error ||
            (res.status === 429
              ? "Too many messages from here. Try again in a little while."
              : "Your message could not be sent. Please try again.")
        );
      }

      form.reset();
      // Stays "sending" through the navigation: flipping back to idle would
      // flash an empty form for the moment before the route changes.
      router.push("/contact/thank-you");
    } catch (err) {
      // A failed fetch throws TypeError with a message about the network that
      // means nothing to a visitor — say what it means for them instead.
      const network = err instanceof TypeError;
      setFormError(
        network
          ? "We could not reach the server. Check your connection and try again."
          : err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
      );
      setState("error");
    }
  }

  /** Clear a field's error as soon as the person starts fixing it. */
  const clear = (field: keyof Errors) => () =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  return (
    <form onSubmit={onSubmit} noValidate className="card p-7 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="contact-name" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            maxLength={120}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            onChange={clear("name")}
            className="q-input"
            placeholder="Ada Lovelace"
          />
        </Field>

        <Field label="Email" htmlFor="contact-email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            maxLength={200}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            onChange={clear("email")}
            className="q-input"
            placeholder="ada@example.com"
          />
        </Field>

        <Field label="Company" htmlFor="contact-company" optional>
          <input
            id="contact-company"
            name="company"
            maxLength={160}
            autoComplete="organization"
            className="q-input"
            placeholder="Acme Inc."
          />
        </Field>

        <Field label="What is this about?" htmlFor="contact-subject">
          <SelectField
            id="contact-subject"
            name="subject"
            options={SUBJECTS}
            defaultValue="general"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" htmlFor="contact-message" error={errors.message}>
          <textarea
            id="contact-message"
            name="message"
            maxLength={5000}
            rows={6}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            onChange={clear("message")}
            className="q-input resize-y"
            placeholder="Tell us what you are trying to do, and we will tell you whether Quantalog fits."
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people, irresistible to bots. Not `display:none`
          — some bots skip those — and never focusable or announced. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Do not fill this in</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {formError && (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {formError}
        </p>
      )}

      {/* Full-width submit, with the reassurance below rather than squeezed
          beside it — at the old width the label wrapped onto two lines. */}
      <button
        type="submit"
        disabled={state === "sending"}
        className="group mt-7 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg shadow-soft transition duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="mt-3 text-center text-xs leading-relaxed text-fg-faint">
        We use what you send only to reply. Nothing is added to a mailing list.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  optional = false,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline gap-2 text-sm font-medium">
        {label}
        {optional && <span className="text-xs font-normal text-fg-faint">Optional</span>}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
