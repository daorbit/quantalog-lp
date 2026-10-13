"use client";

import { Mail, Paperclip } from "lucide-react";
import { useCycle } from "../../use-cycle";
import { VisualPill } from "./visual-pill";

const schedules = ["Every Monday · 09:00", "1st of the month · 08:00", "Every Friday · 17:00"];

const rows = [
  { label: "Visitors", value: "12,847", delta: "+18%" },
  { label: "Signups", value: "342", delta: "+42%" },
  { label: "SEO health", value: "92", delta: "+4" },
];

export function ReportVisual() {
  const { ref, index, inView } = useCycle<HTMLDivElement>(schedules.length, 2600);

  return (
    <div ref={ref} className="flex w-full max-w-xs flex-col items-center gap-4">
      <VisualPill swapKey={schedules[index]}>{schedules[index]}</VisualPill>
      <div className="w-full rounded-2xl bg-surface p-4 text-left shadow-soft ring-1 ring-border dark:bg-bg-subtle">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-fg">
          <Mail className="h-4 w-4 text-accent" />
          Weekly report · acme.com
        </p>
        <ul className="stagger-in mt-3 space-y-2" data-active={inView || undefined}>
          {rows.map((row) => (
            <li key={row.label} className="flex items-center justify-between text-[13px]">
              <span className="text-fg-muted">{row.label}</span>
              <span className="flex items-baseline gap-2">
                <span className="font-semibold tabular-nums text-fg">{row.value}</span>
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">{row.delta}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-[12px] text-fg-faint">
          <Paperclip className="h-3.5 w-3.5" />
          report.xlsx attached · 6 recipients
        </p>
      </div>
    </div>
  );
}
