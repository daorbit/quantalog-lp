import { Check } from "lucide-react";
import type { LegalHighlight } from "./legal-data";

export function LegalHighlights({ items }: { items: readonly LegalHighlight[] }) {
  return (
    <section aria-labelledby="at-a-glance" className="tile tile--static p-6 sm:p-8">
      <p id="at-a-glance" className="text-[14px] font-semibold text-accent">
        At a glance
      </p>
      <ul className="mt-5 grid gap-5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
              <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[15px] font-semibold text-fg">{item.title}</span>
              <span className="mt-1 block text-pretty text-[14px] leading-relaxed text-fg-muted">
                {item.body}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-border pt-4 text-[12.5px] leading-relaxed text-fg-faint">
        This summary is for convenience only. The full text below is what applies.
      </p>
    </section>
  );
}
