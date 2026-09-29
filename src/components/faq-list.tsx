"use client";

import { useState } from "react";
import { FaqItem } from "./faq-item";
import type { Faq } from "@/lib/faqs";

export function FaqList({ faqs, idPrefix }: { faqs: readonly Faq[]; idPrefix: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="space-y-3">
      {faqs.map((f, i) => (
        <FaqItem
          key={f.q}
          id={`${idPrefix}-${i}`}
          item={f}
          open={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </ul>
  );
}
