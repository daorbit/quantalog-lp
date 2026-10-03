"use client";

import { useCycle } from "../use-cycle";
import { KpiCard } from "./kpi-card";
import { DASHBOARD_TEMPLATES } from "./dashboard-templates";

export function DashboardVisual() {
  const { ref, index, inView } = useCycle<HTMLSpanElement>(DASHBOARD_TEMPLATES.length, 4200);
  const template = DASHBOARD_TEMPLATES[index];
  const active = inView || undefined;

  return (
    <span ref={ref} className="block">
      <span className="block overflow-hidden rounded-2xl border border-border bg-surface shadow-soft dark:bg-bg-subtle">
        <span className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          </span>
          <span className="relative ml-2 block h-4 min-w-0 flex-1 overflow-hidden">
            <span
              key={template.name}
              className="word-flip absolute inset-x-0 truncate text-[12px] font-medium leading-4 text-fg-muted"
            >
              {template.name}
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-bg-subtle px-2.5 py-0.5 text-[11px] text-fg-muted dark:bg-surface-raised">
            Last 30 days
          </span>
        </span>

        <span key={template.name} className="dash-kpis grid grid-cols-2 gap-2 p-3 sm:grid-cols-4" data-active={active}>
          {template.kpis.map((k) => (
            <KpiCard key={k.label} kpi={k} active={inView} />
          ))}
        </span>

        <span className="mx-3 mb-3 block rounded-xl border border-border p-3">
          <span className="flex items-center justify-between gap-3 text-[11px] text-fg-muted">
            <span className="font-medium text-fg">Traffic</span>
            <span className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-full bg-accent" />
                {template.series[0]}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-full bg-[#3b82f6]" />
                {template.series[1]}
              </span>
            </span>
          </span>
          <svg
            key={template.name}
            viewBox="0 0 300 80"
            preserveAspectRatio="none"
            className="dash-chart mt-2 block h-24 w-full text-accent"
            data-active={active}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="lp-dash-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${template.primary} L300,80 L0,80 Z`} fill="url(#lp-dash-area)" />
            <path d={template.primary} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path
              d={template.secondary}
              fill="none"
              className="stroke-[#3b82f6]"
              strokeWidth="2"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </span>
      </span>

      <span className="mt-3 flex flex-wrap gap-2">
        {DASHBOARD_TEMPLATES.map((t, i) => (
          <span
            key={t.name}
            className={`rounded-full border px-2.5 py-1 text-[12px] transition-colors duration-300 ${
              i === index ? "border-accent bg-accent/10 font-medium text-fg" : "border-border text-fg-muted"
            }`}
          >
            {t.name}
          </span>
        ))}
        <span className="rounded-full px-2.5 py-1 text-[12px] font-medium text-accent">+16 more templates</span>
      </span>
    </span>
  );
}
