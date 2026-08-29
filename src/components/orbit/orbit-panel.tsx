"use client";

import { useEffect, useRef } from "react";
import { ArrowUp, TriangleAlert } from "lucide-react";
import { OrbitMark } from "./orbit-mark";
import { OrbitMarkdown } from "./orbit-markdown";
import type { OrbitMessage } from "./use-orbit-chat";
import { useOrbitChat } from "./use-orbit-chat";

/**
 * The conversation — thread, composer, empty state.
 *
 * Ported from the dashboard's OrbitChat, minus the model picker and the
 * dictation button: the public endpoint has no model choice, and a marketing
 * page does not need speech input. The layout is otherwise the same, so the two
 * Orbits read as one.
 */

function Bubble({ message }: { message: OrbitMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="orbit-bubble-user max-w-[85%] rounded-2xl rounded-br-sm px-3 py-[7px]">
          <p className="whitespace-pre-wrap text-sm leading-[1.55]">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-[7px]">
      {message.failed && (
        <TriangleAlert
          className="mt-[3px] h-3.5 w-3.5 shrink-0 text-amber-500"
          aria-hidden="true"
        />
      )}
      <div className="min-w-0">
        {message.failed ? (
          <p className="text-sm leading-relaxed text-fg-muted">{message.content}</p>
        ) : (
          <div className="text-sm leading-relaxed text-fg">
            <OrbitMarkdown text={message.content} />
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ onPick, prompts }: { onPick: (q: string) => void; prompts: string[] }) {
  return (
    <div className="space-y-6 px-1 pt-1">
      <div className="flex flex-col items-center gap-1.5">
        <OrbitMark size={50} />
        <p className="text-center text-sm font-bold">Chat with Orbit</p>
        <p className="max-w-[280px] text-center text-xs leading-relaxed text-fg-muted">
          Ask about the tracking, the plans, or how Quantalog compares to another
          tool — and get a straight answer.
        </p>
      </div>

      <div className="space-y-[7px]">
        <p className="text-xs font-semibold uppercase tracking-[0.05em] text-fg-muted">
          Try asking
        </p>
        {prompts.map((q) => (
          <button key={q} type="button" className="orbit-suggestion" onClick={() => onPick(q)}>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export function OrbitPanel() {
  const { messages, input, setInput, send, thinking, started, suggestions, available } =
    useOrbitChat();

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const last = messages[messages.length - 1];
  const followUps =
    last?.role === "assistant" && !last.failed ? (last.suggestions ?? []) : [];

  if (!available) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <p className="text-center text-sm leading-relaxed text-fg-muted">
          The assistant isn&apos;t available right now. Email{" "}
          <a
            href="mailto:daorbit2k25@gmail.com"
            className="font-medium text-accent underline underline-offset-2"
          >
            daorbit2k25@gmail.com
          </a>{" "}
          and a person will answer.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {!started ? (
          <EmptyState onPick={(q) => send(q)} prompts={suggestions} />
        ) : (
          <div className="space-y-6">
            {messages.map((m) => (
              <Bubble key={m.id} message={m} />
            ))}

            {thinking && (
              <div className="flex items-center gap-2">
                <span className="flex gap-1">
                  <span className="h-1 w-1 animate-bounce rounded-full bg-accent [animation-delay:-0.2s]" />
                  <span className="h-1 w-1 animate-bounce rounded-full bg-accent [animation-delay:-0.1s]" />
                  <span className="h-1 w-1 animate-bounce rounded-full bg-accent" />
                </span>
                <span className="orbit-thinking text-xs font-medium text-accent">
                  Thinking
                </span>
              </div>
            )}

            {!thinking && followUps.length > 0 && (
              <div className="space-y-1.5">
                {followUps.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="orbit-suggestion"
                    onClick={() => send(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="px-4 pb-3 pt-1">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-end gap-1.5 rounded-xl border border-border bg-bg-subtle px-2.5 py-1.5 focus-within:border-accent"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="Ask a question"
            disabled={thinking}
            className="max-h-28 flex-1 resize-none bg-transparent py-1 text-sm outline-none placeholder:text-fg-faint"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            aria-label="Send"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg transition disabled:bg-transparent disabled:text-fg-faint"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </form>

        <p className="mt-1.5 text-center text-[10px] leading-tight text-fg-faint">
          Orbit can&apos;t see your data and can be wrong.
        </p>
      </div>
    </>
  );
}
