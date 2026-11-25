"use client";

import { Check, Copy } from "lucide-react";
import { christmas } from "@/lib/christmas";
import { track } from "@/lib/track";
import { useCopyText } from "../use-copy-text";
import styles from "./christmas-banner.module.css";

export function ChristmasCode() {
  const { copied, copy } = useCopyText();
  const Icon = copied ? Check : Copy;

  const onCopy = async () => {
    if (await copy(christmas.code)) track("christmas_code_copied", { code: christmas.code });
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className={styles.code}
      aria-label={copied ? "Coupon code copied" : `Copy coupon code ${christmas.code}`}
    >
      <span translate="no">{christmas.code}</span>
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
