"use client";

import { useEffect, useRef } from "react";
import { ArrowUp, Loader2, RotateCcw } from "lucide-react";
import { OrbitMarkdown } from "./orbit-markdown";
import { useOrbitChat } from "./use-orbit-chat";

/**
 * The Orbit conversation surface. Rendered inside the popover the bubble owns.
 *
 * Deliberately spare: a thread, an input, and the follow-up chips. No model
 * picker, no quota line, no account state — none of that exists on the public
 * endpoint, and showing controls that do nothing is how a widget reads as
 * half-built.
 */
export function OrbitPanel({ onClose }: { onClose: () => void }) {
  const { messages, input, setInput, send, reset, thinking, started, suggestions } =
    useOrbitChat();

  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Pin to the newest turn as the thread grows, and while a reply streams in.
  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-black/10 px-4 py-3 dark:border-white/10">
        <div>
          <p className="text-sm font-semibold">Ask Orbit</p>
          <p className="text-xs text-black/55 dark:text-white/55">
            Answers from the Quantalog docs
          </p>
        </div>
        {started && (
          <button
            onClick={reset}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-black/55 hover:bg-black/[0.04] dark:text-white/55 dark:hover:bg-white/10"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            New
          </button>
        )}
      </header>

      <div ref={threadRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {!started && (
          <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
            Hi — I can answer questions about Quantalog: how the tracking works,
            what the plans include, how it compares to other tools. What would
            you like to know?
          </p>
        )}

        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-[var(--accent)] px-3 py-2 text-sm text-[var(--accent-fg)]">
                {m.content}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-start">
              <div
                className={`max-w-[90%] rounded-2xl rounded-bl-sm px-3 py-2 ${
                  m.failed
                    ? "bg-red-500/10 text-red-700 dark:text-red-300"
                    : "bg-black/[0.05] text-black/85 dark:bg-white/10 dark:text-white/85"
                }`}
              >
                {m.failed ? (
                  <p className="text-sm leading-relaxed">{m.content}</p>
                ) : (
                  <OrbitMarkdown text={m.content} />
                )}
              </div>
            </div>
          ),
        )}

        {thinking && (
          <div className="flex items-center gap-2 text-sm text-black/55 dark:text-white/55">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Thinking…
          </div>
        )}

        {!thinking && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-black/15 px-3 py-1 text-xs text-black/70 transition hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-white/20 dark:text-white/70"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="border-t border-black/10 p-3 dark:border-white/10"
      >
        <div className="flex items-end gap-2 rounded-xl border border-black/15 bg-white px-3 py-2 focus-within:border-[var(--accent)] dark:border-white/20 dark:bg-white/[0.03]">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
              if (e.key === "Escape") onClose();
            }}
            rows={1}
            placeholder="Ask about Quantalog…"
            className="max-h-28 flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-black/40 dark:placeholder:text-white/40"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            aria-label="Send"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] transition disabled:opacity-40"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-1.5 px-1 text-[11px] text-black/40 dark:text-white/40">
          Orbit can be wrong. Check anything important against the docs.
        </p>
      </form>
    </div>
  );
}
