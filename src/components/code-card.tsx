"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeCard({
  filename,
  code,
  language = "bash",
}: {
  filename: string;
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border bg-bg-subtle px-4 py-2.5">
        <span className="font-mono text-xs text-fg-muted">{filename}</span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="inline-flex items-center gap-1.5 rounded border border-border px-2 py-1 text-xs text-fg-muted transition hover:border-border-strong hover:text-fg"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-accent" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className={`language-${language} font-mono text-fg`}>{code}</code>
      </pre>
    </div>
  );
}
