"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";

type State = "idle" | "sending" | "sent" | "error";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch(`${site.api}/api/public/status/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Could not subscribe. Try again in a moment.");
      }
      setState("sent");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not subscribe. Try again in a moment.");
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <p className="rounded-[8px] border border-border bg-bg-subtle px-4 py-3 text-[14px] text-fg" role="status">
        Check your inbox and press the link to confirm. Until then, nothing is sent.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row" aria-label="Subscribe to status updates">
      <label htmlFor="status-email" className="sr-only">
        Email address
      </label>
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-faint" aria-hidden="true" />
        <input
          id="status-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 w-full rounded-[10px] border border-border bg-surface pl-9 pr-3 text-[15px] text-fg outline-none transition-colors focus:border-accent"
        />
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className="h-11 rounded-[10px] bg-cta px-5 text-[14px] font-semibold text-cta-fg transition-colors hover:bg-cta-hover disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Get updates"}
      </button>
      {state === "error" && (
        <p className="text-[13px] text-status-outage sm:basis-full" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
