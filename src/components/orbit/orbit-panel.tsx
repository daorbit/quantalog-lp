"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import { OrbitComposer } from "./orbit-composer";
import { OrbitHome } from "./orbit-home";
import { OrbitMessageRow, OrbitTyping } from "./orbit-message";
import { OrbitSuggestion } from "./orbit-suggestion";
import { useOrbitChat } from "./use-orbit-chat";

export function OrbitPanel({ ask }: { ask?: string }) {
  const { messages, input, setInput, send, thinking, started, suggestions, available } =
    useOrbitChat();

  const bottomRef = useRef<HTMLDivElement>(null);
  const asked = useRef(false);

  useEffect(() => {
    if (!ask || !available || asked.current) return;
    asked.current = true;
    void send(ask);
  }, [ask, available, send]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

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
          !started ? "flex flex-col" : ""
        }`}
      >
        {!started ? (
          <OrbitHome onPick={(q) => send(q)} prompts={suggestions} />
        ) : (
          <div className="space-y-6">
            {messages.map((m) => (
              <OrbitMessageRow key={m.id} message={m} />
            ))}

            {thinking && <OrbitTyping />}

            {!thinking && followUps.length > 0 && (
              <div className="space-y-2">
                <p className="px-1 text-[13px] font-medium text-fg-muted">Related</p>
                {followUps.map((q) => (
                  <OrbitSuggestion key={q} question={q} onPick={(v) => send(v)} variant="follow-up" />
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <OrbitComposer value={input} onChange={setInput} onSend={() => send()} disabled={thinking} />
    </>
  );
}
