"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * The copy control on a code block.
 *
 * Its own client component so `Pre` — used by both the blog and the docs — can
 * stay a server component. Falls back silently when the clipboard API is
 * unavailable (an insecure origin, a locked-down browser): the button still
 * renders, it just does nothing rather than throwing.
 */
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // No clipboard access — nothing sensible to do here.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="doc-code__copy"
      data-copied={copied}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? (
        <Check className="h-3 w-3" aria-hidden="true" />
      ) : (
        <Copy className="h-3 w-3" aria-hidden="true" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
