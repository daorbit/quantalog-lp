import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type MarkRowItem = { key: string; name: string; href?: string; mark: ReactNode; body: string };

export function MarkRow({ item }: { item: MarkRowItem }) {
  const body = (
    <>
      <span className="shrink-0">{item.mark}</span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[16px] font-semibold tracking-tight text-fg">
          {item.name}
          {item.href && (
            <ArrowUpRight
              className="h-3.5 w-3.5 text-fg-faint transition-colors duration-200 group-hover:text-accent"
              aria-hidden="true"
            />
          )}
        </span>
        <span className="mt-1.5 block text-pretty text-[14.5px] leading-relaxed text-fg-muted">{item.body}</span>
      </span>
    </>
  );
  return item.href ? (
    <Link href={item.href} className="group flex items-start gap-5">
      {body}
    </Link>
  ) : (
    <div className="flex items-start gap-5">{body}</div>
  );
}

export function MarkRowList({ items }: { items: readonly MarkRowItem[] }) {
  return (
    <ul className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.key} className="border-t border-border pt-6">
          <MarkRow item={item} />
        </li>
      ))}
    </ul>
  );
}
