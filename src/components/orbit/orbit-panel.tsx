"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Check,
  ChevronRight,
  Copy,
  CornerDownRight,
  MessageSquareText,
  TriangleAlert,
} from "lucide-react";
import { site } from "@/lib/site";
import { OrbitMark } from "./orbit-mark";
import { OrbitMarkdown } from "./orbit-markdown";
import { SUMMARISE_PROMPT } from "./orbit-open";
import type { OrbitMessage } from "./use-orbit-chat";
import { useOrbitChat } from "./use-orbit-chat";

function Suggestion({
  question,
  onPick,
  variant = "starter",
}: {
  question: string;
  onPick: (q: string) => void;
  variant?: "starter" | "follow-up";
}) {
  const Icon = variant === "starter" ? MessageSquareText : CornerDownRight;
  return (
    <button type="button" className="orbit-suggestion" onClick={() => onPick(question)}>
      <Icon size={14} className="orbit-suggestion__icon" aria-hidden="true" />
      <span className="orbit-suggestion__text">{question}</span>
      <ChevronRight size={16} className="orbit-suggestion__arrow" aria-hidden="true" />
    </button>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      className="orbit-copy-btn"
      onClick={() => {
        void navigator.clipboard.writeText(text).then(() => setCopied(true));
      }}
      aria-label={copied ? "Copied" : "Copy answer"}
    >
      {copied ? (
        <Check size={13} aria-hidden="true" />
      ) : (
        <Copy size={13} aria-hidden="true" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function Bubble({ message }: { message: OrbitMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="orbit-bubble-user max-w-[85%] rounded-[1.25rem] rounded-br-md px-4 py-2.5">
          <p className="whitespace-pre-wrap text-[15px] leading-normal">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orbit-answer flex items-start gap-[7px]">
      {message.failed && (
        <TriangleAlert
          className="mt-[3px] h-3.5 w-3.5 shrink-0 text-amber-500"
          aria-hidden="true"
        />
      )}
      <div className="min-w-0">
        {message.failed ? (
          <p className="text-[15px] leading-relaxed text-fg-muted">{message.content}</p>
        ) : (
          <>
            <div className="text-[15px] leading-relaxed text-fg">
              <OrbitMarkdown text={message.content} />
            </div>
            <div className="orbit-turn-actions">
              <CopyButton text={message.content} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function hasSummarisablePage(): boolean {
  if (typeof document === "undefined") return false;
  const main = document.querySelector("main");
  return (main?.innerText ?? "").trim().length >= 400;
}

function EmptyState({ onPick, prompts }: { onPick: (q: string) => void; prompts: string[] }) {

  const canSummarise = hasSummarisablePage();
  const chips = canSummarise ? [SUMMARISE_PROMPT, ...prompts] : prompts;

  return (
    <div className="space-y-8 px-1">
      <div className="flex flex-col items-center text-center">
        <OrbitMark size={80} />
        <p className="mt-5 text-[1.75rem] font-semibold leading-tight tracking-tight text-fg">
          Hi, I&apos;m Orbit.
        </p>
        <p className="mt-2 max-w-[20rem] text-pretty text-[15px] leading-relaxed text-fg-muted">
          Ask about tracking, plans or how Quantalog compares to another tool —
          or have me summarise the page you&apos;re on.
        </p>
      </div>

      <div className="space-y-2">
        <p className="px-1 text-[13px] font-medium text-fg-muted">Try asking</p>
        {chips.map((q) => (
          <Suggestion key={q} question={q} onPick={onPick} />
        ))}
      </div>
    </div>
  );
}

export function OrbitPanel({ ask }: { ask?: string }) {
  const { messages, input, setInput, send, thinking, started, suggestions, available } =
    useOrbitChat();

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const asked = useRef(false);

  useEffect(() => {
    if (!ask || !available || asked.current) return;
    asked.current = true;
    void send(ask);
  }, [ask, available, send]);

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
            href={`mailto:${site.email}`}
            className="font-medium text-fg underline underline-offset-2"
          >
            {site.email}
          </a>{" "}
          and a person will answer.
        </p>
      </div>
    );
  }

  return (
    <>

      <div
        className={`min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-5 ${
          !started ? "flex flex-col justify-center" : ""
        }`}
      >
        {!started ? (
          <EmptyState onPick={(q) => send(q)} prompts={suggestions} />
        ) : (
          <div className="space-y-6">
            {messages.map((m) => (
              <Bubble key={m.id} message={m} />
            ))}

            {thinking && (
              <div className="flex items-center gap-3">
                <span className="typing-dots flex gap-1 rounded-full bg-bg-subtle px-3.5 py-3" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-fg-faint" />
                  <span className="h-1.5 w-1.5 rounded-full bg-fg-faint" />
                  <span className="h-1.5 w-1.5 rounded-full bg-fg-faint" />
                </span>
                <span className="orbit-thinking text-[13px] text-fg-muted">Thinking…</span>
              </div>
            )}

            {!thinking && followUps.length > 0 && (
              <div className="space-y-2">
                <p className="px-1 text-[13px] font-medium text-fg-muted">Related</p>
                {followUps.map((q) => (
                  <Suggestion
                    key={q}
                    question={q}
                    onPick={(v) => send(v)}
                    variant="follow-up"
                  />
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="orbit-composer-wrap px-4 pb-4 pt-2 sm:px-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="orbit-composer flex items-end gap-2 py-1.5 pl-4 pr-1.5"
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
            className="max-h-28 flex-1 resize-none bg-transparent py-1.5 text-[15px] outline-none placeholder:text-fg-faint"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            aria-label="Send"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cta text-cta-fg transition-colors disabled:bg-border disabled:text-fg-faint"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>

        <p className="mt-2 text-center text-[11px] leading-tight text-fg-faint">
          Orbit can&apos;t see your data and can be wrong.
        </p>
      </div>
    </>
  );
}
