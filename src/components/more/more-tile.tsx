import Link from "next/link";
import type { MoreItem } from "./more-items";

export function MoreTile({ item }: { item: MoreItem }) {
  return (
    <Link href={item.href} className="tile group flex h-full flex-col p-6 sm:p-7">
      <item.icon className="h-7 w-7 text-accent" strokeWidth={1.6} aria-hidden="true" />
      <span className="mt-auto block pt-6 text-[1.0625rem] sm:pt-10 sm:text-[1.125rem] font-semibold tracking-tight text-fg">
        {item.title}
      </span>
      <span className="mt-1.5 block text-pretty text-[14px] leading-relaxed text-fg-muted">
        {item.body}
      </span>
    </Link>
  );
}
