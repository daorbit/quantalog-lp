import { Check } from "lucide-react";

export function ProductChecklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-x-12 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 border-b border-border py-4 text-[15px] leading-relaxed text-fg">
          <Check className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}
