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
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-bg-subtle px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/60" aria-hidden="true" />
          <span className="font-mono text-xs text-fg-muted">{filename}</span>
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2 py-1 text-[11px] font-medium text-fg-muted transition hover:border-border-strong hover:text-fg"
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
      <pre className="overflow-x-auto p-5 text-[12.5px] leading-[1.7]">
        <code className={`language-${language} font-mono text-fg-muted`}>{code}</code>
      </pre>
    </div>
  );
}
