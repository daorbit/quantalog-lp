"use client";

import { useState } from "react";
import {
  BarChart3,
  FileSearch,
  Globe,
  LayoutGrid,
  Mail,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { useLiveNumber } from "./use-live-number";

type RangeKey = "24h" | "7d" | "30d";

const RANGES: Record<
  RangeKey,
  {
    series: number[];
    prev: number[];
    axis: string[];
    chartLabel: string;
    live: boolean;
    stats: { visitors: number; pageviews: number; bounce: number; session: number };
    topPages: { label: string; views: number; pct: number }[];
    sources: { label: string; views: number; pct: number }[];
    countries: { label: string; flag: string; views: number; pct: number }[];
  }
> = {
  "24h": {
    series: [
      18, 24, 21, 30, 27, 36, 33, 44, 39, 52, 47, 61, 55, 72, 66, 84, 78, 96, 88,
      74, 81, 92, 86, 99,
    ],
    prev: [
      15, 19, 18, 24, 22, 28, 27, 34, 31, 39, 37, 45, 42, 52, 49, 58, 56, 64, 61,
      55, 58, 63, 60, 66,
    ],
    axis: ["00:00", "06:00", "12:00", "18:00", "now"],
    chartLabel: "Visitors",
    live: true,
    stats: { visitors: 12847, pageviews: 41203, bounce: 34, session: 161 },
    topPages: [
      { label: "/pricing", views: 4128, pct: 100 },
      { label: "/", views: 3271, pct: 79 },
      { label: "/blog/introducing-quantalog", views: 1904, pct: 46 },
      { label: "/docs/quickstart", views: 1140, pct: 28 },
      { label: "/seo-audits", views: 892, pct: 22 },
    ],
    sources: [
      { label: "Direct", views: 3902, pct: 100 },
      { label: "google.com", views: 2410, pct: 62 },
      { label: "news.ycombinator.com", views: 1288, pct: 33 },
      { label: "x.com", views: 640, pct: 16 },
      { label: "linkedin.com", views: 412, pct: 11 },
    ],
    countries: [
      { label: "United States", flag: "🇺🇸", views: 4820, pct: 100 },
      { label: "India", flag: "🇮🇳", views: 2140, pct: 44 },
      { label: "Germany", flag: "🇩🇪", views: 1388, pct: 29 },
      { label: "United Kingdom", flag: "🇬🇧", views: 1002, pct: 21 },
      { label: "Canada", flag: "🇨🇦", views: 744, pct: 15 },
    ],
  },
  "7d": {
    series: [
      210, 264, 248, 305, 331, 420, 468, 402, 455, 512, 498, 540, 588, 611, 574,
      629, 665, 703, 741, 688, 720,
    ],
    prev: [
      180, 214, 205, 249, 268, 330, 361, 322, 358, 396, 388, 412, 447, 462, 441,
      475, 498, 521, 544, 512, 530,
    ],
    axis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    chartLabel: "Visitors",
    live: false,
    stats: { visitors: 78420, pageviews: 254877, bounce: 31, session: 174 },
    topPages: [
      { label: "/pricing", views: 21840, pct: 100 },
      { label: "/", views: 18022, pct: 83 },
      { label: "/blog/introducing-quantalog", views: 9611, pct: 44 },
      { label: "/seo-audits", views: 6740, pct: 31 },
      { label: "/docs/quickstart", views: 4980, pct: 23 },
    ],
    sources: [
      { label: "Direct", views: 19204, pct: 100 },
      { label: "google.com", views: 15880, pct: 83 },
      { label: "news.ycombinator.com", views: 6120, pct: 32 },
      { label: "linkedin.com", views: 3410, pct: 18 },
      { label: "x.com", views: 2180, pct: 12 },
    ],
    countries: [
      { label: "United States", flag: "🇺🇸", views: 29410, pct: 100 },
      { label: "India", flag: "🇮🇳", views: 13220, pct: 45 },
      { label: "Germany", flag: "🇩🇪", views: 8140, pct: 28 },
      { label: "United Kingdom", flag: "🇬🇧", views: 6280, pct: 22 },
      { label: "Netherlands", flag: "🇳🇱", views: 4110, pct: 14 },
    ],
  },
  "30d": {
    series: [
      620, 705, 812, 903, 988, 1074, 1130, 1088, 1204, 1310, 1288, 1402, 1477,
      1533, 1590, 1622, 1701, 1688, 1774, 1846, 1902, 1958, 2010, 2087, 2140,
      2205, 2260, 2318, 2377, 2431,
    ],
    prev: [
      540, 602, 688, 754, 812, 878, 918, 890, 972, 1044, 1030, 1108, 1160, 1198,
      1240, 1262, 1318, 1305, 1366, 1414, 1452, 1490, 1526, 1578, 1614, 1660,
      1698, 1740, 1782, 1820,
    ],
    axis: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    chartLabel: "Visitors",
    live: false,
    stats: { visitors: 341902, pageviews: 1128440, bounce: 29, session: 188 },
    topPages: [
      { label: "/pricing", views: 94210, pct: 100 },
      { label: "/", views: 81007, pct: 86 },
      { label: "/blog/introducing-quantalog", views: 40118, pct: 43 },
      { label: "/platform-api", views: 28640, pct: 30 },
      { label: "/seo-audits", views: 21400, pct: 23 },
    ],
    sources: [
      { label: "google.com", views: 88420, pct: 100 },
      { label: "Direct", views: 79950, pct: 90 },
      { label: "news.ycombinator.com", views: 24110, pct: 27 },
      { label: "linkedin.com", views: 15980, pct: 18 },
      { label: "x.com", views: 9240, pct: 11 },
    ],
    countries: [
      { label: "United States", flag: "🇺🇸", views: 128400, pct: 100 },
      { label: "India", flag: "🇮🇳", views: 57200, pct: 45 },
      { label: "Germany", flag: "🇩🇪", views: 35100, pct: 27 },
      { label: "United Kingdom", flag: "🇬🇧", views: 27400, pct: 21 },
      { label: "Brazil", flag: "🇧🇷", views: 18900, pct: 15 },
    ],
  },
};

const RANGE_KEYS: RangeKey[] = ["24h", "7d", "30d"];

type ViewKey = "overview" | "audience" | "sources";

/**
 * Sidebar entries.
 *
 * The three that carry their own data are real buttons — the panel is the
 * product's main sales argument, and a sidebar that does nothing when clicked
 * undercuts it. `soon` marks the two with no mock data behind them; they stay
 * visible for the shape of the product but do not pretend to be clickable.
 */
const NAV: {
  key: ViewKey | string;
  icon: typeof LayoutGrid;
  label: string;
  soon?: boolean;
}[] = [
  { key: "overview", icon: LayoutGrid, label: "Overview" },
  { key: "audience", icon: Users, label: "Audience" },
  { key: "sources", icon: Globe, label: "Sources" },
  { key: "seo", icon: FileSearch, label: "SEO", soon: true },
  { key: "reports", icon: Mail, label: "Reports", soon: true },
];

/** Which tables each view shows, and what the chart is plotting. */
const VIEWS: Record<
  ViewKey,
  { metric: "visitors" | "pageviews"; tables: ("pages" | "sources" | "countries")[] }
> = {
  overview: { metric: "visitors", tables: ["pages", "sources", "countries"] },
  audience: { metric: "visitors", tables: ["countries", "pages"] },
  sources: { metric: "pageviews", tables: ["sources", "pages"] },
};

/** Site filter. Selecting one scales the numbers so the change is visible. */
const SITES = [
  { label: "All sites", factor: 1 },
  { label: "quantalog.daorbit.in", factor: 0.62 },
  { label: "docs.quantalog.io", factor: 0.38 },
];

const W = 640;
const H = 190;
/** Room for the y-axis labels drawn inside the same viewBox. */
const PAD_L = 34;
const PAD_B = 22;
const PAD_T = 8;

function scale(values: number[], max: number) {
  const step = (W - PAD_L) / (values.length - 1);
  const plotH = H - PAD_B - PAD_T;
  return values.map(
    (v, i) => [PAD_L + i * step, PAD_T + plotH - (v / max) * plotH] as const
  );
}

function linePath(pts: readonly (readonly [number, number])[]) {
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [x, y] = pts[i];
    d += ` Q ${px},${py} ${(px + x) / 2},${(py + y) / 2}`;
  }
  return d;
}

/** Axis ticks as round-ish numbers rather than raw maxima. */
function ticks(max: number): number[] {
  const step = max / 3;
  const mag = 10 ** Math.floor(Math.log10(step));
  const nice = Math.ceil(step / mag) * mag;
  return [0, nice, nice * 2, nice * 3];
}

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}k`;
  return String(n);
}

function Stat({
  label,
  seed,
  delta,
  good = true,
  live = false,
  active = false,
  format = (n: number) => n.toLocaleString("en-US"),
  every,
}: {
  label: string;
  seed: number;
  delta: string;
  /** Whether the movement is an improvement. Bounce rate falling is good. */
  good?: boolean;
  live?: boolean;
  /** The metric the chart below is plotting. Gets the accent underline. */
  active?: boolean;
  format?: (n: number) => string;
  every?: number;
}) {
  const { value, bumped } = useLiveNumber(seed, { every, drift: Math.max(2, seed * 0.0006) });
  const shown = live ? value : seed;

  return (
    <div
      className={`relative border-border px-4 py-3.5 not-last:border-b sm:not-last:border-b-0 sm:not-last:border-r ${
        active ? "bg-fg/[0.015]" : ""
      }`}
    >
      {/* Real dashboards make the plotted metric obvious in the stat row.
          A 2px accent rule on the active tile does that in one element. */}
      {active && (
        <span
          className="absolute inset-x-0 top-0 h-0.5 bg-accent"
          aria-hidden="true"
        />
      )}
      <p className="text-[10.5px] font-medium uppercase tracking-[0.09em] text-fg-faint">
        {label}
      </p>
      <div className="mt-1.5 flex items-baseline gap-2">
        <p
          className="tick-num text-[1.4rem] font-semibold leading-none tracking-[-0.03em] tabular-nums sm:text-[1.55rem]"
          data-bumped={live && bumped}
        >
          {format(shown)}
        </p>
        <span
          className={`text-[11px] font-medium tabular-nums ${
            good ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
          }`}
        >
          {delta}
        </span>
      </div>
    </div>
  );
}

function BarList({
  title,
  rows,
  flags = false,
}: {
  title: string;
  rows: { label: string; flag?: string; views: number; pct: number }[];
  flags?: boolean;
}) {
  const total = rows.reduce((sum, r) => sum + r.views, 0);

  return (
    <div className="min-w-0 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-fg-faint">
          {title}
        </p>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.08em] text-fg-faint">
          <span>Views</span>
          <span className="hidden w-9 text-right sm:inline">Share</span>
        </div>
      </div>

      <ul className="mt-3">
        {rows.map((row, i) => (
          <li
            key={row.label}
            className="group relative overflow-hidden border-b border-hairline last:border-b-0"
          >
            {/* The fill is the row's magnitude, kept low-contrast so the label
                stays readable across it — this is a ranked table with a bar in
                the background, not a bar chart with labels on top. */}
            <div
              className="bar-fill absolute inset-y-px left-0 rounded-sm bg-accent/[0.09] transition-colors duration-200 group-hover:bg-accent/[0.16]"
              style={{ width: `${row.pct}%`, animationDelay: `${0.45 + i * 0.07}s` }}
              aria-hidden="true"
            />
            <div className="relative flex items-center justify-between py-[7px] pl-2 pr-2">
              <span className="flex min-w-0 items-center gap-2">
                {flags && (
                  <span className="shrink-0 text-[13px] leading-none" aria-hidden="true">
                    {row.flag}
                  </span>
                )}
                <span
                  className={`truncate text-[12px] text-fg ${
                    flags ? "" : "font-mono"
                  }`}
                >
                  {row.label}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="text-[12px] font-medium tabular-nums text-fg">
                  {row.views.toLocaleString()}
                </span>
                <span className="hidden w-9 text-right text-[11px] tabular-nums text-fg-faint sm:inline">
                  {Math.round((row.views / total) * 100)}%
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DashboardPreview() {
  const [range, setRange] = useState<RangeKey>("24h");
  const [view, setView] = useState<ViewKey>("overview");
  const [siteIdx, setSiteIdx] = useState(0);

  const base = RANGES[range];
  const conf = VIEWS[view];
  const site = SITES[siteIdx];
  const f = site.factor;

  /** Scale a mock number by the active site filter. */
  const s = (n: number) => Math.round(n * f);
  const scaleRows = <T extends { views: number }>(rows: T[]): T[] =>
    rows.map((row) => ({ ...row, views: s(row.views) }));

  // Sources plots pageviews, which run ~3.2x visitors in this data — without
  // the multiplier the chart would not move when the view changes, and the
  // y-axis would contradict the stat tile above it.
  const seriesMul = conf.metric === "pageviews" ? 3.2 : 1;
  const series = base.series.map((v) => v * seriesMul * f);
  const prev = base.prev.map((v) => v * seriesMul * f);

  // Both series share one scale, or the comparison line would lie.
  const max = Math.max(...series, ...prev);
  const axisTicks = ticks(max);
  const top = axisTicks[axisTicks.length - 1];

  const pts = scale(series, top);
  const prevPts = scale(prev, top);
  const last = pts[pts.length - 1];

  const { value: online, bumped: onlineBumped } = useLiveNumber(42, {
    every: 2400,
    drift: 3,
    band: 0.22,
  });

  const plotH = H - PAD_B - PAD_T;

  const tables = {
    pages: { title: "Top pages", rows: scaleRows(base.topPages), flags: false },
    sources: { title: "Top sources", rows: scaleRows(base.sources), flags: false },
    countries: { title: "Countries", rows: scaleRows(base.countries), flags: true },
  } as const;

  // Re-keys the animated children so switching view or filter replays the
  // bar and line draw-in rather than snapping to the new values.
  const dataKey = `${range}-${view}-${siteIdx}`;

  return (
    <div className="card overflow-hidden shadow-float">
      {/* ---- Window chrome ---- */}
      <div className="flex items-center gap-3 border-b border-border bg-bg-subtle px-3.5 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1 shadow-soft">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[11px] text-fg-muted">
            quantalog.daorbit.in ·{" "}
            <span className="tick-num text-fg" data-bumped={onlineBumped}>
              {online}
            </span>{" "}
            online
          </span>
        </div>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      {/* ---- App body: sidebar + main ---- */}
      <div className="flex">
        {/* The sidebar is what separates "a chart in a box" from "a product",
            and it only earns that if it works — the three data-backed entries
            switch the view below. Icon-only below lg so it never crowds the
            data. */}
        <nav
          className="hidden shrink-0 flex-col gap-0.5 border-r border-border bg-bg-subtle/60 p-2 sm:flex lg:w-[148px] lg:p-2.5"
          aria-label="Dashboard sections"
        >
          <div className="mb-2 flex items-center gap-2 px-1.5 pt-1">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-accent/15">
              <BarChart3 className="h-3 w-3 text-accent" />
            </span>
            <span className="hidden text-[12px] font-semibold tracking-tight lg:inline">
              Quantalog
            </span>
          </div>

          {NAV.map(({ key, icon: Icon, label, soon }) =>
            soon ? (
              <span
                key={key}
                className="flex cursor-default items-center gap-2 rounded-md px-1.5 py-1.5 text-[12px] text-fg-faint/60 lg:px-2"
                title={`${label} — not in this preview`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden lg:inline">{label}</span>
              </span>
            ) : (
              <button
                key={key}
                type="button"
                onClick={() => setView(key as ViewKey)}
                aria-current={view === key ? "page" : undefined}
                className={`flex items-center gap-2 rounded-md px-1.5 py-1.5 text-left text-[12px] transition-colors lg:px-2 ${
                  view === key
                    ? "bg-fg/[0.07] font-medium text-fg"
                    : "text-fg-faint hover:bg-fg/[0.04] hover:text-fg-muted"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden lg:inline">{label}</span>
              </button>
            )
          )}
        </nav>

        <div className="min-w-0 flex-1">
          {/* ---- Filter bar ---- */}
          <div className="flex items-center gap-2 border-b border-border px-3.5 py-2">
            {/* Cycles through the mock sites. A dropdown would be the real
                control, but it would open a menu nobody can act on — the
                click still has to change the numbers, and this does. */}
            <button
              type="button"
              onClick={() => setSiteIdx((i) => (i + 1) % SITES.length)}
              className="flex min-w-0 items-center gap-1.5 rounded-md border border-border bg-bg-subtle px-2 py-1 text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
              title="Switch site"
            >
              <SlidersHorizontal className="h-3 w-3 shrink-0" />
              <span className="max-w-[9rem] truncate text-[11px]">{site.label}</span>
            </button>

            <span className="hidden min-w-0 items-center gap-1.5 rounded-md border border-border px-2 py-1 text-fg-faint md:inline-flex">
              <Search className="h-3 w-3 shrink-0" />
              <span className="truncate text-[11px]">Filter…</span>
            </span>

            <div className="ml-auto flex shrink-0 items-center gap-1 rounded-md border border-border bg-bg-subtle p-0.5">
              {RANGE_KEYS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setRange(k)}
                  aria-pressed={range === k}
                  className={`rounded px-2 py-[3px] text-[11px] transition-colors ${
                    range === k
                      ? "bg-surface font-medium text-fg shadow-soft"
                      : "text-fg-faint hover:text-fg-muted"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {/* ---- Stat row ---- */}
          <div className="stat-sweep relative grid overflow-hidden border-b border-border sm:grid-cols-4">
            <Stat
              key={`v-${dataKey}`}
              label="Visitors"
              seed={s(base.stats.visitors)}
              delta="+18.2%"
              live={base.live}
              every={3000}
              active={conf.metric === "visitors"}
            />
            <Stat
              key={`p-${dataKey}`}
              label="Pageviews"
              seed={s(base.stats.pageviews)}
              delta="+11.4%"
              live={base.live}
              every={2100}
              active={conf.metric === "pageviews"}
            />
            <Stat
              key={`b-${dataKey}`}
              label="Bounce rate"
              seed={base.stats.bounce}
              delta="−6.1%"
              format={(n) => `${n}%`}
              good
            />
            <Stat
              key={`s-${dataKey}`}
              label="Avg. session"
              seed={base.stats.session}
              delta="+9.8%"
              format={(n) => `${Math.floor(n / 60)}m ${n % 60}s`}
            />
          </div>

          {/* ---- Chart ---- */}
          <div className="border-b border-border px-4 pb-3 pt-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-fg-faint">
                  {conf.metric === "pageviews" ? "Pageviews" : "Visitors"}
                </p>
                {/* A legend, because there are now two series. Without it the
                    dashed line is unexplained decoration. */}
                <span className="flex items-center gap-1.5 text-[10.5px] text-fg-faint">
                  <span className="h-[2px] w-3 rounded-full bg-accent" />
                  Current
                </span>
                <span className="hidden items-center gap-1.5 text-[10.5px] text-fg-faint sm:flex">
                  <span className="h-0 w-3 border-t border-dashed border-fg-faint" />
                  Previous
                </span>
              </div>
              <span className="flex items-center gap-1.5 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-fg-muted">
                <span className="live-dot h-1 w-1 rounded-full bg-accent" />
                {base.live ? "live" : "settled"}
              </span>
            </div>

            <svg
              key={dataKey}
              viewBox={`0 0 ${W} ${H}`}
              className="mt-2 h-44 w-full sm:h-48"
              /* Not "none": the axis labels live inside this viewBox now, and
                 non-uniform scaling would stretch the glyphs. */
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label={`${conf.metric === "pageviews" ? "Pageviews" : "Visitors"}, trending upward against the previous period`}
            >
              <defs>
                <linearGradient id="q-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Gridlines with real value labels. An unlabelled axis is the
                  clearest tell that a dashboard screenshot is fake. */}
              {axisTicks.map((t) => {
                const y = PAD_T + plotH - (t / top) * plotH;
                return (
                  <g key={t}>
                    <line
                      x1={PAD_L}
                      x2={W}
                      y1={y}
                      y2={y}
                      stroke="var(--border)"
                      strokeWidth="1"
                      strokeOpacity={t === 0 ? 1 : 0.5}
                      vectorEffect="non-scaling-stroke"
                    />
                    <text
                      x={PAD_L - 7}
                      y={y + 3}
                      textAnchor="end"
                      className="fill-fg-faint"
                      style={{ fontSize: 9, fontVariantNumeric: "tabular-nums" }}
                    >
                      {compact(t)}
                    </text>
                  </g>
                );
              })}

              <path
                className="chart-area"
                d={`${linePath(pts)} L ${W},${PAD_T + plotH} L ${PAD_L},${PAD_T + plotH} Z`}
                fill="url(#q-fill)"
              />

              {/* Previous period, dashed and unfilled — the comparison every
                  real analytics view carries, and the thing that makes the
                  "+18.2%" above it verifiable rather than asserted. */}
              <path
                d={linePath(prevPts)}
                fill="none"
                stroke="var(--fg-faint)"
                strokeWidth="1.25"
                strokeDasharray="4 4"
                strokeOpacity="0.5"
                vectorEffect="non-scaling-stroke"
              />

              <path
                className="chart-line"
                style={{ "--line-len": "1600" } as React.CSSProperties}
                d={linePath(pts)}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />

              <circle
                className="chart-edge"
                cx={last[0]}
                cy={last[1]}
                r="7"
                fill="var(--accent)"
                opacity="0.18"
              />
              <circle
                cx={last[0]}
                cy={last[1]}
                r="3.5"
                fill="var(--accent)"
                stroke="var(--surface)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />

              {base.axis.map((t, i) => {
                const x =
                  PAD_L + (i / (base.axis.length - 1)) * (W - PAD_L);
                return (
                  <text
                    key={t}
                    x={Math.min(Math.max(x, PAD_L), W - 2)}
                    y={H - 6}
                    textAnchor={i === 0 ? "start" : i === base.axis.length - 1 ? "end" : "middle"}
                    className="fill-fg-faint"
                    style={{ fontSize: 9 }}
                  >
                    {t}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* ---- Breakdown tables ---- */}
          {/* Which tables appear is the view's decision: Overview shows all
              three, Audience leads with countries, Sources leads with
              referrers. Switching the sidebar has to change what is on screen
              or the nav is theatre. */}
          <div
            key={dataKey}
            className={`grid divide-y divide-border lg:divide-x lg:divide-y-0 ${
              conf.tables.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
            }`}
          >
            {conf.tables.map((t, i) => {
              const table = tables[t];
              return (
                // The third column is the first to become unreadable when the
                // panel narrows, so it is the one that drops.
                <div key={t} className={i === 2 ? "hidden lg:block" : undefined}>
                  <BarList title={table.title} rows={table.rows} flags={table.flags} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
