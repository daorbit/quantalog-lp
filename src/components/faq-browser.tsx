"use client";

import { useState } from "react";
import { faqCategories } from "@/lib/faqs";
import { FaqItem } from "./faq-item";

export function FaqBrowser({ intro }: { intro: React.ReactNode }) {
  const [active, setActive] = useState(faqCategories[0].id);
  const [open, setOpen] = useState<string | null>(`${faqCategories[0].id}-0`);

  const selectCategory = (id: string) => {
    setActive(id);
    setOpen(`${id}-0`);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
      <div>
        {intro}

        <div
          role="tablist"
          aria-label="FAQ categories"
          className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:mt-10 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
        >
          {faqCategories.map((c) => {
            const selected = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`faq-tab-${c.id}`}
                aria-selected={selected}
                aria-controls={`faq-panel-${c.id}`}
                onClick={() => selectCategory(c.id)}
                className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2.5 text-left text-[15px] transition-colors lg:py-3 lg:text-[16px] ${
                  selected
                    ? "bg-bg-subtle font-medium text-fg"
                    : "text-fg-muted hover:text-fg"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        {faqCategories.map((c) => (
          <ul
            key={c.id}
            id={`faq-panel-${c.id}`}
            role="tabpanel"
            aria-labelledby={`faq-tab-${c.id}`}
            hidden={c.id !== active}
            className="space-y-3"
          >
            {c.items.map((item, i) => {
              const id = `${c.id}-${i}`;
              return (
                <FaqItem
                  key={id}
                  id={`faq-${id}`}
                  item={item}
                  open={open === id}
                  onToggle={() => setOpen(open === id ? null : id)}
                />
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
