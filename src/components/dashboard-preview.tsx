// A static mock of the real dashboard. Deliberately not interactive and not a
// chart library: it renders identically on the server, so SSG output is stable.

const SERIES = [
  18, 24, 21, 30, 27, 36, 33, 44, 39, 52, 47, 61, 55, 72, 66, 84, 78, 96, 88, 74,
  81, 92, 86, 99,
];

const TOP_PAGES = [
  { path: "/pricing", views: 4128, pct: 100 },
  { path: "/", views: 3271, pct: 79 },
  { path: "/blog/introducing-quantalog", views: 1904, pct: 46 },
  { path: "/docs/quickstart", views: 1140, pct: 28 },
];

const SOURCES = [
  { name: "Direct", views: 3902, pct: 100 },
  { name: "google.com", views: 2410, pct: 62 },
  { name: "news.ycombinator.com", views: 1288, pct: 33 },
  { name: "x.com", views: 640, pct: 16 },
];

function areaPath(values: number[], w: number, h: number) {
  const max = Math.max(...values);
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => [i * step, h - (v / max) * (h - 6) - 3] as const);

  // Smooth the polyline with midpoint quadratic curves.
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [x, y] = pts[i];
    d += ` Q ${px},${py} ${(px + x) / 2},${(py + y) / 2}`;
  }
  d += ` L ${w},${h} L 0,${h} Z`;
  return d;
}

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="border-border px-5 py-4 not-last:border-b sm:not-last:border-b-0 sm:not-last:border-r">
      <p className="text-xs uppercase tracking-wider text-fg-muted">{label}</p>
      <p className="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight">{value}</p>
      <p className="mt-0.5 text-xs font-medium text-accent">{delta}</p>
    </div>
  );
}

function BarList({
  title,
  rows,
}: {
  title: string;
  rows: { path?: string; name?: string; views: number; pct: number }[];
}) {
  return (
    <div className="p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {rows.map((row) => {
          const label = row.path ?? row.name ?? "";
          return (
            <li key={label} className="relative">
              <div
                className="absolute inset-y-0 left-0 rounded-sm bg-accent/12"
                style={{ width: `${row.pct}%` }}
                aria-hidden="true"
              />
              <div className="relative flex items-center justify-between px-2 py-1.5">
                <span className="truncate pr-3 font-mono text-xs text-fg">{label}</span>
                <span className="shrink-0 text-xs tabular-nums text-fg-muted">
                  {row.views.toLocaleString()}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/10">
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-border bg-bg-subtle px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[11px] text-fg-muted">
            acme.com · 42 visitors online
          </span>
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
          <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
            Last 24 hours
          </h3>
          <span className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-fg-muted">
            live · 3s
          </span>
        </div>
        <svg
          viewBox="0 0 600 130"
          className="mt-4 h-32 w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="Visitor traffic over the last 24 hours, trending upward"
        >
          <defs>
            <linearGradient id="q-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath(SERIES, 600, 130)} fill="url(#q-fill)" />
          <path
            d={areaPath(SERIES, 600, 130).replace(/ L 600,130 L 0,130 Z$/, "")}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <BarList title="Top pages" rows={TOP_PAGES} />
        <BarList title="Top sources" rows={SOURCES} />
      </div>
    </div>
  );
}
