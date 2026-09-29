import { Check } from "lucide-react";

export function ProductChecklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="tile tile--static grid gap-x-10 gap-y-4 p-6 sm:grid-cols-2 sm:p-10">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-fg">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
            <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
