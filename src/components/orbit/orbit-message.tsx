"use client";

import { useEffect, useState } from "react";
import { Check, Copy, TriangleAlert } from "lucide-react";
import { OrbitMarkdown } from "./orbit-markdown";
import type { OrbitMessage } from "./use-orbit-chat";

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
      {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function OrbitMessageRow({ message }: { message: OrbitMessage }) {
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
        <TriangleAlert className="mt-[3px] h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden="true" />
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

export function OrbitTyping() {
  return (
    <div className="flex items-center gap-3">
      <span className="typing-dots flex gap-1 rounded-full bg-bg-subtle px-3.5 py-3" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-fg-faint" />
        <span className="h-1.5 w-1.5 rounded-full bg-fg-faint" />
        <span className="h-1.5 w-1.5 rounded-full bg-fg-faint" />
      </span>
      <span className="orbit-thinking text-[13px] text-fg-muted">Thinking…</span>
    </div>
  );
}
