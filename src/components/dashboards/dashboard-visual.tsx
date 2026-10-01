const KPIS = [
  { label: "Visitors", value: "12.4k", delta: "+8.2%" },
  { label: "Google clicks", value: "2,310", delta: "+14%" },
  { label: "Conversions", value: "386", delta: "+5.1%" },
  { label: "Bounce rate", value: "38%", delta: "−2.4%" },
];

const TEMPLATES = ["Executive summary", "SEO client report", "E-commerce", "Product launch"];

const VISITORS = "M0,62 C20,58 34,48 52,50 C72,52 84,38 104,36 C124,34 138,44 158,40 C180,36 194,22 216,24 C238,26 252,16 272,12 C284,10 292,8 300,6";
const CLICKS = "M0,72 C24,70 40,66 60,67 C82,68 96,60 118,58 C140,56 156,62 178,56 C200,50 218,48 240,42 C260,37 280,36 300,30";

export function DashboardVisual() {
  return (
    <span className="block">
      <span className="block overflow-hidden rounded-2xl border border-border bg-surface shadow-soft dark:bg-bg-subtle">
        <span className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          </span>
          <span className="ml-2 truncate text-[12px] font-medium text-fg-muted">Executive summary</span>
          <span className="ml-auto shrink-0 rounded-full bg-bg-subtle px-2.5 py-0.5 text-[11px] text-fg-muted dark:bg-surface-raised">
            Last 30 days
          </span>
        </span>

        <span className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
          {KPIS.map((k) => (
            <span key={k.label} className="block rounded-xl border border-border p-3">
              <span className="block truncate text-[11px] text-fg-muted">{k.label}</span>
              <span className="mt-1 flex items-baseline gap-1.5">
                <span className="text-[18px] font-semibold tracking-tight text-fg">{k.value}</span>
                <span className="text-[11px] font-semibold text-accent">{k.delta}</span>
              </span>
            </span>
          ))}
        </span>

        <span className="mx-3 mb-3 block rounded-xl border border-border p-3">
          <span className="flex items-center justify-between gap-3 text-[11px] text-fg-muted">
            <span className="font-medium text-fg">Traffic</span>
            <span className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-full bg-accent" />
                Visitors
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-full bg-[#3b82f6]" />
                Google clicks
              </span>
            </span>
          </span>
          <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="mt-2 block h-24 w-full text-accent" aria-hidden="true">
            <defs>
              <linearGradient id="lp-dash-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${VISITORS} L300,80 L0,80 Z`} fill="url(#lp-dash-area)" />
            <path d={VISITORS} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path d={CLICKS} fill="none" className="stroke-[#3b82f6]" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          </svg>
        </span>
      </span>

      <span className="mt-3 flex flex-wrap gap-2">
        {TEMPLATES.map((t) => (
          <span key={t} className="rounded-full border border-border px-2.5 py-1 text-[12px] text-fg-muted">
            {t}
          </span>
        ))}
        <span className="rounded-full px-2.5 py-1 text-[12px] font-medium text-accent">+16 more templates</span>
      </span>
    </span>
  );
}
