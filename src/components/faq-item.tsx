import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/faqs";

export function FaqItem({
  item,
  id,
  open,
  onToggle,
}: {
  item: Faq;
  id: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <li
      className={`faq-item rounded-(--radius-card) border bg-surface transition-colors duration-200 ${
        open ? "border-accent" : "border-border hover:border-border-strong"
      }`}
    >
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6 sm:py-6"
        >
          <span className="text-[16px] font-medium text-fg sm:text-[17px]">{item.q}</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-fg-muted transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        data-open={open || undefined}
        className="faq-answer"
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-6 text-pretty text-[15px] leading-relaxed text-fg-muted sm:px-6">
            {item.a}
          </p>
        </div>
      </div>
    </li>
  );
}
