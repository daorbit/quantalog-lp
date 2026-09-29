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
    <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
      <div className="min-w-0">
        {intro}

        <div role="tablist" aria-label="FAQ categories" className="faq-tabs">
          {faqCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              id={`faq-tab-${c.id}`}
              aria-selected={c.id === active}
              aria-controls={`faq-panel-${c.id}`}
              onClick={() => selectCategory(c.id)}
              className="faq-tab"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-w-0">
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
