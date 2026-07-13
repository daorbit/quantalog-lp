// A static mock of the real dashboard. Deliberately not interactive and not a
// chart library: it renders identically on the server, so SSG output is stable.

const SERIES = [
  18, 24, 21, 30, 27, 36, 33, 44, 39, 52, 47, 61, 55, 72, 66, 84, 78, 96, 88, 74,
  81, 92, 86, 99,
];

const TOP_PAGES = [
  { label: "/pricing", views: 4128, pct: 100 },
  { label: "/", views: 3271, pct: 79 },
  { label: "/blog/introducing-quantalog", views: 1904, pct: 46 },
  { label: "/docs/quickstart", views: 1140, pct: 28 },
];

const SOURCES = [
  { label: "Direct", views: 3902, pct: 100 },
  { label: "google.com", views: 2410, pct: 62 },
  { label: "news.ycombinator.com", views: 1288, pct: 33 },
  { label: "x.com", views: 640, pct: 16 },
];

const W = 600;
const H = 130;

function points(values: number[]) {
  const max = Math.max(...values);
  const step = W / (values.length - 1);
  return values.map((v, i) => [i * step, H - (v / max) * (H - 10) - 4] as const);
}

function linePath(values: number[]) {
  const pts = points(values);
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [x, y] = pts[i];
    d += ` Q ${px},${py} ${(px + x) / 2},${(py + y) / 2}`;
  }
  return d;
}

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="border-border px-5 py-4 not-last:border-b sm:not-last:border-b-0 sm:not-last:border-r">
      <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-fg-faint">
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-[1.75rem] font-semibold leading-none tabular-nums tracking-[-0.02em]">
          {value}
        </p>
        <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-accent">
          {delta}
        </span>
      </div>
    </div>
  );
}

function BarList({
  title,
  unit,
  rows,
}: {
  title: string;
  unit: string;
  rows: { label: string; views: number; pct: number }[];
}) {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-faint">
          {title}
        </h3>
        <span className="text-[11px] uppercase tracking-wide text-fg-faint">{unit}</span>
      </div>
      <ul className="mt-4 space-y-1.5">
        {rows.map((row) => (
          <li key={row.label} className="relative overflow-hidden rounded">
            <div
              className="absolute inset-y-0 left-0 bg-accent/[0.13]"
              style={{ width: `${row.pct}%` }}
              aria-hidden="true"
            />
            <div className="absolute inset-y-0 left-0 w-0.5 bg-accent/50" aria-hidden="true" />
            <div className="relative flex items-center justify-between py-2 pl-2.5 pr-2">
              <span className="truncate pr-3 font-mono text-xs text-fg">{row.label}</span>
              <span className="shrink-0 text-xs font-medium tabular-nums text-fg-muted">
                {row.views.toLocaleString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DashboardPreview() {
  const pts = points(SERIES);
  const last = pts[pts.length - 1];

  return (
    <div className="card overflow-hidden shadow-float">
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-border bg-bg-subtle px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1 shadow-soft">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[11px] text-fg-muted">
            acme.com · <span className="text-fg">42</span> visitors online
          </span>
        </div>
        <div className="hidden items-center gap-1 sm:flex" aria-hidden="true">
          {["24h", "7d", "30d"].map((r, i) => (
            <span
              key={r}
              className={`rounded px-1.5 py-0.5 text-[11px] ${
                i === 0
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-fg-faint"
              }`}
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      <div className="grid border-b border-border sm:grid-cols-4">
        <Stat label="Visitors" value="12,847" delta="+18.2%" />
        <Stat label="Pageviews" value="41,203" delta="+11.4%" />
        <Stat label="Bounce rate" value="34%" delta="−6.1%" />
        <Stat label="Avg. session" value="2m 41s" delta="+9.8%" />
      </div>

      {/* Traffic area chart */}
      <div className="border-b border-border p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-faint">
            Visitors · last 24 hours
          </h3>
          <span className="flex items-center gap-1.5 rounded border border-border px-2 py-0.5 font-mono text-[11px] text-fg-muted">
            <span className="live-dot h-1 w-1 rounded-full bg-accent" />
            polling 3s
          </span>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mt-5 h-32 w-full overflow-visible"
          preserveAspectRatio="none"
          role="img"
          aria-label="Visitor traffic over the last 24 hours, trending upward"
        >
          <defs>
            <linearGradient id="q-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal guides */}
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1="0"
              x2={W}
              y1={H * f}
              y2={H * f}
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="3 5"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <path d={`${linePath(SERIES)} L ${W},${H} L 0,${H} Z`} fill="url(#q-fill)" />
          <path
            d={linePath(SERIES)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Leading edge marker — the "this is happening now" cue. */}
          <circle cx={last[0]} cy={last[1]} r="7" fill="var(--accent)" opacity="0.18" />
          <circle
            cx={last[0]}
            cy={last[1]}
            r="3"
            fill="var(--accent)"
            stroke="var(--surface)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div
          className="mt-2 flex justify-between font-mono text-[10px] text-fg-faint"
          aria-hidden="true"
        >
          {["00:00", "06:00", "12:00", "18:00", "now"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <BarList title="Top pages" unit="Views" rows={TOP_PAGES} />
        <BarList title="Top sources" unit="Views" rows={SOURCES} />
      </div>
    </div>
  );
}
