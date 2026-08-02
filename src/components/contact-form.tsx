"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/lib/site";

/**
 * The contact form.
 *
 * Posts to the public, unauthenticated endpoint on the API — the rest of the
 * marketing site is static, and this is the only thing on it that talks back.
 *
 * Validation here is a convenience, not a guard: the server re-checks every
 * field, because anything a browser enforces is advisory.
 */

const SUBJECTS = [
  { value: "general", label: "General enquiry" },
  { value: "sales", label: "Pricing and plans" },
  { value: "support", label: "Help with my account" },
  { value: "platform-api", label: "Platform API / white label" },
  { value: "privacy", label: "Privacy and compliance" },
  { value: "other", label: "Something else" },
];

type State = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setState("sending");
    setError("");

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
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      form.reset();
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="card flex flex-col items-center gap-4 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-accent" aria-hidden="true" />
        <div>
          <h2 className="text-[1.25rem] font-semibold tracking-tight">Message sent</h2>
          <p className="mx-auto mt-2 max-w-sm text-pretty leading-relaxed text-fg-muted">
            Thanks — it reached a person, not a queue. You should hear back
            within a working day at the address you gave.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="text-sm font-medium text-accent hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="contact-name">
          <input
            id="contact-name"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            className="q-input"
            placeholder="Ada Lovelace"
          />
        </Field>

        <Field label="Email" htmlFor="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
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
          <select id="contact-subject" name="subject" className="q-input" defaultValue="general">
            {SUBJECTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" htmlFor="contact-message">
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={6}
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

      {state === "error" && (
        <p role="alert" className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-fg shadow-soft transition duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
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

        <p className="text-xs leading-relaxed text-fg-faint">
          We use what you send here only to reply. Nothing is added to a mailing
          list.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  optional = false,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline gap-2 text-sm font-medium">
        {label}
        {optional && <span className="text-xs font-normal text-fg-faint">Optional</span>}
      </label>
      {children}
    </div>
  );
}
