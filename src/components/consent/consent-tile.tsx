"use client";

import type { ExploreTone } from "../explore/explore-items";
import { useInView } from "../use-in-view";
import { useCountTo } from "../use-count-to";
import { PeopleGrid } from "./people-grid";

const TOTAL = 20;

export function ConsentTile({
  tone,
  label,
  title,
  badge,
  lost,
  caption,
  legend,
}: {
  tone: ExploreTone;
  label: string;
  title: string;
  badge: React.ReactNode;
  lost: number[];
  caption: string;
  legend?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.45, false);
  const pct = Math.round(((TOTAL - lost.length) / TOTAL) * 100);
  const shown = useCountTo(inView ? pct : 0, 1800);

  return (
    <div ref={ref} className={`explore-tile tone-${tone} flex h-full flex-col items-center px-5 py-10 text-center sm:px-10 sm:py-14`}>
      <p className="text-[15px] font-semibold text-accent">{label}</p>
      <h3 className="mt-2 text-balance text-[1.625rem] font-semibold leading-tight tracking-tight sm:text-[2rem]">
        {title}
      </h3>

      <div className="mt-7">{badge}</div>

      <div className="mt-8 w-full">
        <PeopleGrid total={TOTAL} lost={lost} active={inView} />
      </div>

      {legend && (
        <div className="mt-5 flex items-center justify-center gap-5 text-[13px] text-fg-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
            Counted
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full ring-[1.5px] ring-inset ring-border-strong" aria-hidden="true" />
            Lost to the banner
          </span>
        </div>
      )}

      <p className="mt-10 text-[4.5rem] font-semibold leading-none tracking-[-0.05em] tabular-nums text-fg sm:text-[5.5rem]">
        {shown}%
      </p>
      <p className="mx-auto mt-3 max-w-xs text-pretty text-[15px] leading-relaxed text-fg-muted">{caption}</p>
    </div>
  );
}
