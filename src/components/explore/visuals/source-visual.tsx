"use client";

import type { CSSProperties } from "react";
import { useCycle } from "../../use-cycle";
import { useCountTo } from "../../use-count-to";

const sources = [
  { name: "Instagram Ads", leads: 42, won: 9 },
  { name: "Google", leads: 31, won: 11 },
  { name: "Newsletter", leads: 18, won: 6 },
  { name: "Direct", leads: 12, won: 2 },
];

const top = Math.max(...sources.map((s) => s.leads));

function SourceRow({
  source,
  focused,
  shown,
}: {
  source: (typeof sources)[number];
  focused: boolean;
  shown: boolean;
}) {
  const leads = useCountTo(shown ? source.leads : 0, 1200);
  const won = useCountTo(shown ? source.won : 0, 1200);
  const rate = Math.round((source.won / source.leads) * 100);

  return (
    <div
      className={`rounded-2xl bg-surface px-4 py-3 shadow-soft transition-shadow duration-300 dark:bg-bg-subtle ${
        focused ? "ring-2 ring-accent" : "ring-1 ring-border"
      }`}
    >
      <div className="flex items-center justify-between gap-2 text-[13px]">
        <span className="font-medium text-fg">{source.name}</span>
        <span className="shrink-0 tabular-nums text-fg-muted">
          {leads} leads · <span className={focused ? "font-semibold text-accent" : "text-fg"}>{won} won</span>
        </span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-subtle dark:bg-surface-raised">
          <span
            className="block h-full w-[var(--w)] rounded-full bg-accent transition-[width] duration-1000 ease-out"
            style={{ "--w": `${shown ? (source.leads / top) * 100 : 0}%` } as CSSProperties}
          />
        </span>
        <span className={`w-16 text-right text-[12px] tabular-nums ${focused ? "font-semibold text-accent" : "text-fg-muted"}`}>
          {rate}% win
        </span>
      </div>
    </div>
  );
}

export function SourceVisual() {
  const { ref, index, inView } = useCycle<HTMLDivElement>(sources.length, 2400);

  return (
    <div ref={ref} className="stagger-in w-full max-w-xs space-y-3" data-active={inView || undefined}>
      {sources.map((s, i) => (
        <SourceRow key={s.name} source={s} focused={inView && i === index} shown={inView} />
      ))}
    </div>
  );
}
