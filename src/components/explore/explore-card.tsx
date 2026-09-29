import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ExploreItem } from "./explore-items";

export function ExploreCard({ item, focusable = true }: { item: ExploreItem; focusable?: boolean }) {
  return (
    <Link
      href={item.href}
      tabIndex={focusable ? undefined : -1}
      className="tile group flex h-[26rem] w-[78vw] max-w-[22rem] flex-col p-7 sm:h-[30rem] sm:w-[22rem] sm:p-8"
    >
      <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-fg-muted">
        <item.icon className="h-[18px] w-[18px] text-accent" />
        {item.label}
      </span>

      <span className="mt-3 block text-balance text-[1.625rem] font-semibold leading-[1.15] tracking-tight text-fg sm:text-[1.75rem]">
        {item.title}
      </span>

      <span className="mt-auto flex items-end justify-between gap-4">
        <span className="min-w-0">
          <span className="block text-[3rem] font-semibold leading-none tracking-[-0.04em] text-fg sm:text-[3.5rem]">
            {item.stat}
          </span>
          <span className="mt-2 block text-[14px] leading-snug text-fg-muted">
            {item.statLabel}
          </span>
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cta text-cta-fg transition-transform duration-300 group-hover:scale-110">
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}
