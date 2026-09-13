"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

export type OrbitMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;

  failed?: boolean;

  suggestions?: string[];
};

const FALLBACK_SUGGESTIONS = [
  "Do I need a cookie banner?",
  "How is this different from Google Analytics?",
  "Is there a free plan?",
];

let counter = 0;
const nextId = () => `orbit-${Date.now()}-${counter++}`;

type AskResponse = { reply: string; suggestions: string[] };

const MAX_PAGE_CHARS = 12_000;

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

  const historyRef = useRef<OrbitMessage[]>([]);

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

    suggestions,
  };
}
