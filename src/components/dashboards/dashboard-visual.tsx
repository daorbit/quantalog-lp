"use client";

import { useCycle } from "../use-cycle";
import { useCountTo } from "../use-count-to";
import { VisualPill } from "../explore/visuals/visual-pill";
import { DASHBOARD_TEMPLATES } from "./dashboard-templates";
import { formatMetric } from "./format-metric";

export function DashboardVisual() {
  const { ref, index, inView } = useCycle<HTMLDivElement>(DASHBOARD_TEMPLATES.length, 4200);
  const template = DASHBOARD_TEMPLATES[index];
  const kpi = template.kpis[0];
  const value = useCountTo(inView ? kpi.value : 0, 1100);

  return (
    <div ref={ref} className="flex w-full flex-col items-center text-center">
      <VisualPill swapKey={template.name}>{template.name}</VisualPill>
      <p className="mt-4 text-[4rem] font-semibold leading-none tracking-[-0.06em] tabular-nums text-fg sm:text-[7rem]">
        {formatMetric(value, kpi)}
      </p>
      <p className="mt-3 text-[15px] text-fg-muted">
        {kpi.label} <span className="font-medium text-accent">{kpi.delta}</span>
      </p>
      <div className="mt-8 w-full max-w-md">
        <svg
          key={template.name}
          viewBox="0 0 300 80"
          preserveAspectRatio="none"
          className="dash-chart block h-16 w-full text-accent sm:h-20"
          data-active={inView || undefined}
          aria-hidden="true"
        >
          <path d={template.primary} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
}
