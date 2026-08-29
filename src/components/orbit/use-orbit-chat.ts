"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * The landing-page Orbit conversation.
 *
 * Held in React state only — never persisted, never sent anywhere but the ask
 * endpoint. A pre-sales chat is something a visitor has once while deciding; a
 * refresh losing it is the correct behaviour, not a bug to paper over.
 *
 * This talks to `/api/public/orbit`, the unauthenticated marketing endpoint —
 * no workspace, no account, Cloudflare-only models, rate-limited per IP on the
 * server. There is nothing to configure here and no key in the browser.
 */

export type OrbitMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** Set when the send failed, so the bubble renders as an error. */
  failed?: boolean;
  /** Follow-up questions the model offered on this turn. Only the last turn's render. */
  suggestions?: string[];
};

/** Opening prompts, replaced by the server's list once `/status` returns. */
const FALLBACK_SUGGESTIONS = [
  "Do I need a cookie banner?",
  "How is this different from Google Analytics?",
  "Is there a free plan?",
];

let counter = 0;
const nextId = () => `orbit-${Date.now()}-${counter++}`;

type AskResponse = { reply: string; suggestions: string[] };

/** Max page text sent for a "summarise this" question — matches the server cap. */
const MAX_PAGE_CHARS = 12_000;

/**
 * The readable text of the page the visitor is on, so Orbit can summarise or
 * explain it.
 *
 * `<main>` only — that is the article or the page body, without the header, the
 * footer, or the chat panel itself. Read fresh on every send so it follows
 * client-side navigation between blog posts. Returns null when there is nothing
 * substantial, and the request then omits the field.
 */
function readPageContext() {
  if (typeof document === "undefined") return null;
  const main = document.querySelector("main");
  const text = (main?.innerText ?? "").replace(/\n{3,}/g, "\n\n").trim();
  if (text.length < 200) return null;
  return {
    title: document.title,
    url: window.location.href,
    text: text.slice(0, MAX_PAGE_CHARS),
  };
}

export function useOrbitChat() {
  const [messages, setMessages] = useState<OrbitMessage[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(FALLBACK_SUGGESTIONS);
  const [available, setAvailable] = useState(true);

  /**
   * The transcript in the shape the server wants, kept in a ref so `send` can
   * read it without being rebuilt on every keystroke — it appends the user's
   * turn before awaiting, so reading state there would miss it.
   */
  const historyRef = useRef<OrbitMessage[]>([]);

  // The server owns the opening prompts and knows whether Cloudflare is
  // configured. A failed status check leaves the fallbacks and assumes
  // available — the first real send will report the truth either way.
  useEffect(() => {
    let live = true;
    fetch(`${site.api}/api/public/orbit/status`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { available?: boolean; suggestions?: string[] } | null) => {
        if (!live || !data) return;
        if (typeof data.available === "boolean") setAvailable(data.available);
        if (Array.isArray(data.suggestions) && data.suggestions.length) {
          setSuggestions(data.suggestions);
        }
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const send = useCallback(
    async (raw?: string) => {
      const question = (raw ?? input).trim();
      if (!question || thinking) return;

      const history = historyRef.current
        .filter((m) => !m.failed)
        .map((m) => ({ role: m.role, content: m.content }));

      const userTurn: OrbitMessage = { id: nextId(), role: "user", content: question };
      setMessages((prev) => {
        const next = [...prev, userTurn];
        historyRef.current = next;
        return next;
      });
      setInput("");
      setThinking(true);

      try {
        const res = await fetch(`${site.api}/api/public/orbit/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // The current page's text rides along so "summarise this" works on
          // any blog post or page. The server ignores it unless the question
          // needs it.
          body: JSON.stringify({ question, history, pageContext: readPageContext() }),
        });

        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as { error?: string } | null;
          throw new Error(body?.error || "Orbit could not answer that.");
        }

        const answered = (await res.json()) as AskResponse;
        setMessages((prev) => {
          const next: OrbitMessage[] = [
            ...prev,
            {
              id: nextId(),
              role: "assistant",
              content: answered.reply,
              suggestions: answered.suggestions,
            },
          ];
          historyRef.current = next;
          return next;
        });
        setSuggestions(answered.suggestions ?? []);
      } catch (e) {
        setMessages((prev) => {
          const next: OrbitMessage[] = [
            ...prev,
            {
              id: nextId(),
              role: "assistant",
              content:
                e instanceof Error
                  ? e.message
                  : "Orbit could not answer that. Try again, or email daorbit2k25@gmail.com.",
              failed: true,
            },
          ];
          historyRef.current = next;
          return next;
        });
      } finally {
        setThinking(false);
      }
    },
    [input, thinking],
  );

  const reset = useCallback(() => {
    setMessages([]);
    setInput("");
    historyRef.current = [];
  }, []);

  return {
    messages,
    input,
    setInput,
    send,
    reset,
    thinking,
    available,
    started: messages.length > 0,
    /** The follow-ups to show under the thread — server's opener before the first turn, last turn's after. */
    suggestions,
  };
}
