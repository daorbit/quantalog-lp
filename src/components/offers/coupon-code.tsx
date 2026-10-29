"use client";

import { Check, Copy } from "lucide-react";
import { track } from "@/lib/track";
import { useCopyText } from "../use-copy-text";

export function CouponCode({
  code,
  location,
  tone = "festive",
}: {
  code: string;
  location: string;
  tone?: "festive" | "plain";
}) {
  const { copied, copy } = useCopyText();

  const onCopy = async () => {
    if (await copy(code)) track("coupon_copied", { code, location });
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      translate="no"
      aria-label={copied ? "Code copied" : `Copy code ${code}`}
      className={`offer-code ${tone === "plain" ? "offer-code--plain" : ""} inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-[12px] font-semibold tracking-[0.08em] transition-colors duration-200`}
    >
      {code}
      {copied ? (
        <Check className="h-3 w-3" aria-hidden="true" />
      ) : (
        <Copy className="h-3 w-3 opacity-80" aria-hidden="true" />
      )}
    </button>
  );
}
