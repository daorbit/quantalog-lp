"use client";

import { useCountTo } from "../use-count-to";
import { formatMetric } from "./format-metric";
import type { Kpi } from "./dashboard-templates";

export function KpiCard({ kpi, active }: { kpi: Kpi; active: boolean }) {
  const value = useCountTo(active ? kpi.value : 0, 1100);

  return (
    <span className="block rounded-xl border border-border p-3">
      <span className="block truncate text-[11px] text-fg-muted">{kpi.label}</span>
      <span className="mt-1 flex items-baseline gap-1.5">
        <span className="text-[18px] font-semibold tracking-tight tabular-nums text-fg">
          {formatMetric(value, kpi)}
        </span>
        <span className="text-[11px] font-semibold text-accent">{kpi.delta}</span>
      </span>
    </span>
  );
}
