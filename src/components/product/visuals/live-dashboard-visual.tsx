"use client";

import { useLiveNumber } from "../../use-live-number";
import { RollingNumber } from "../../rolling-number";

const BARS = [
  "h-[30%]", "h-[42%]", "h-[36%]", "h-[48%]", "h-[40%]", "h-[55%]", "h-[46%]", "h-[52%]",
  "h-[44%]", "h-[60%]", "h-[54%]", "h-[66%]", "h-[58%]", "h-[62%]", "h-[50%]", "h-[68%]",
  "h-[64%]", "h-[72%]", "h-[61%]", "h-[70%]", "h-[76%]", "h-[67%]", "h-[80%]", "h-[74%]",
  "h-[84%]", "h-[78%]", "h-[88%]", "h-[82%]", "h-[92%]", "h-full",
];

const PAGES = [
  { path: "/pricing", count: 14, width: "w-full" },
  { path: "/blog/cookieless-analytics", count: 11, width: "w-[78%]" },
  { path: "/", count: 9, width: "w-[64%]" },
  { path: "/docs/tracking", count: 6, width: "w-[43%]" },
];

const SOURCES = [
  { label: "Google", value: "38%" },
  { label: "Direct", value: "27%" },
  { label: "Newsletter", value: "14%" },
];

const card = "rounded-3xl bg-surface p-6 text-left shadow-soft ring-1 ring-border sm:p-7 dark:bg-bg-subtle";

export function LiveDashboardVisual() {
  const { value } = useLiveNumber(47, { every: 4200, drift: 2, band: 0.08 });

  return (
    <div className="grid w-full max-w-4xl gap-3 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <div className={card}>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-2.5 py-1 text-[12px] font-semibold text-accent">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Live
          </span>
          <span className="text-[12px] text-fg-faint">acme.com</span>
        </div>

        <p className="mt-6 text-[4rem] font-semibold leading-none tracking-[-0.05em] tabular-nums text-fg sm:text-[5rem]">
          <RollingNumber value={value} />
        </p>
        <p className="mt-2 text-[14px] text-fg-muted">visitors on the site right now</p>

        <div className="mt-7 flex h-20 items-end gap-[3px]" aria-hidden="true">
          {BARS.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-sm ${h} ${i === BARS.length - 1 ? "bg-accent" : "bg-accent/25"}`}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-fg-faint">
          <span>30 min ago</span>
          <span>now</span>
        </div>
      </div>

      <div className={card}>
        <p className="text-[13px] font-semibold text-fg">Top pages</p>
        <ul className="mt-4 space-y-3.5">
          {PAGES.map((p) => (
            <li key={p.path}>
              <div className="flex items-baseline justify-between gap-3 text-[13px]">
                <span className="truncate font-mono text-fg-muted">{p.path}</span>
                <span className="font-semibold tabular-nums text-fg">{p.count}</span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-fg-faint/10">
                <div className={`h-full rounded-full bg-accent/60 ${p.width}`} />
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 border-t border-border pt-5 text-[13px] font-semibold text-fg">Sources</p>
        <ul className="mt-3 grid grid-cols-3 gap-2">
          {SOURCES.map((s) => (
            <li key={s.label} className="rounded-xl bg-bg-subtle px-3 py-2.5 dark:bg-surface">
              <span className="block text-[11px] text-fg-faint">{s.label}</span>
              <span className="mt-0.5 block text-[15px] font-semibold tabular-nums text-fg">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
