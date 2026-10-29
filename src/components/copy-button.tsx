"use client";

import { Check, Copy } from "lucide-react";
import { track } from "@/lib/track";
import { useCopyText } from "./use-copy-text";

export function CopyButton({ text }: { text: string }) {
  const { copied, copy } = useCopyText();

  const onCopy = async () => {
    if (await copy(text)) track("docs_code_copied");
  };

  return (
    <button
      type="button"
      onClick={onCopy}
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
