"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { track } from "@/lib/track";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      track("docs_code_copied");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {

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
