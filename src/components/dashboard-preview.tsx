"use client";

// A mock of the real dashboard. Not a chart library and not real data: every
// figure below is a constant, so the server and the first client render agree
// and the page stays statically exported.
//
// It does move, though. The product sells "real-time", and a frozen screenshot
// captioned "polling 3s" argues against the pitch — so the counters drift and
// the chart draws itself once the page is interactive. The drift starts after
// mount, never on the server.

import { useState } from "react";
import { useLiveNumber } from "./use-live-number";

/**
 * Three ranges the visitor can switch between. Still all constants — the mock
 * stays statically exportable — but the toggle in the window chrome is real, so
 * the shot reads as a thing you operate rather than a screenshot. `24h` is what
 * the server renders and the only range whose headline numbers drift live; the
 * longer ranges are settled totals, which is how a real dashboard behaves too.
 */
type RangeKey = "24h" | "7d" | "30d";

const RANGES: Record<
  RangeKey,
  {
    series: number[];
    axis: string[];
    chartLabel: string;
    live: boolean;
    stats: { visitors: number; pageviews: number; bounce: number; session: number };
    topPages: { label: string; views: number; pct: number }[];
    sources: { label: string; views: number; pct: number }[];
  }
> = {
  "24h": {
    series: [
      18, 24, 21, 30, 27, 36, 33, 44, 39, 52, 47, 61, 55, 72, 66, 84, 78, 96, 88,
      74, 81, 92, 86, 99,
    ],
    axis: ["00:00", "06:00", "12:00", "18:00", "now"],
    chartLabel: "Visitors · last 24 hours",
    live: true,
    stats: { visitors: 12847, pageviews: 41203, bounce: 34, session: 161 },
    topPages: [
      { label: "/pricing", views: 4128, pct: 100 },
      { label: "/", views: 3271, pct: 79 },
      { label: "/blog/introducing-quantalog", views: 1904, pct: 46 },
      { label: "/docs/quickstart", views: 1140, pct: 28 },
    ],
    sources: [
      { label: "Direct", views: 3902, pct: 100 },
      { label: "google.com", views: 2410, pct: 62 },
      { label: "news.ycombinator.com", views: 1288, pct: 33 },
      { label: "x.com", views: 640, pct: 16 },
    ],
  },
  "7d": {
    series: [
      210, 264, 248, 305, 331, 420, 468, 402, 455, 512, 498, 540, 588, 611, 574,
      629, 665, 703, 741, 688, 720,
    ],
    axis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    chartLabel: "Visitors · last 7 days",
    live: false,
    stats: { visitors: 78420, pageviews: 254877, bounce: 31, session: 174 },
    topPages: [
      { label: "/pricing", views: 21840, pct: 100 },
      { label: "/", views: 18022, pct: 83 },
      { label: "/blog/introducing-quantalog", views: 9611, pct: 44 },
      { label: "/seo-audits", views: 6740, pct: 31 },
    ],
    sources: [
      { label: "Direct", views: 19204, pct: 100 },
      { label: "google.com", views: 15880, pct: 83 },
      { label: "news.ycombinator.com", views: 6120, pct: 32 },
      { label: "linkedin.com", views: 3410, pct: 18 },
    ],
  },
  "30d": {
    series: [
      620, 705, 812, 903, 988, 1074, 1130, 1088, 1204, 1310, 1288, 1402, 1477,
      1533, 1590, 1622, 1701, 1688, 1774, 1846, 1902, 1958, 2010, 2087, 2140,
      2205, 2260, 2318, 2377, 2431,
    ],
    axis: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    chartLabel: "Visitors · last 30 days",
    live: false,
    stats: { visitors: 341902, pageviews: 1128440, bounce: 29, session: 188 },
    topPages: [
      { label: "/pricing", views: 94210, pct: 100 },
      { label: "/", views: 81007, pct: 86 },
      { label: "/blog/introducing-quantalog", views: 40118, pct: 43 },
      { label: "/platform-api", views: 28640, pct: 30 },
    ],
    sources: [
      { label: "google.com", views: 88420, pct: 100 },
      { label: "Direct", views: 79950, pct: 90 },
      { label: "news.ycombinator.com", views: 24110, pct: 27 },
      { label: "linkedin.com", views: 15980, pct: 18 },
    ],
  },
};

const RANGE_KEYS: RangeKey[] = ["24h", "7d", "30d"];

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

/**
 * One headline number.
 *
 * `seed` is what renders on the server. If `live` is set the digits drift after
 * mount and flash on change; the rest (bounce rate, session length) hold still,
 * because a metric that jitters every three seconds reads as noise rather than
 * as traffic arriving.
 */
function Stat({
  label,
  seed,
  delta,
  live = false,
  format = (n: number) => n.toLocaleString("en-US"),
  every,
}: {
  label: string;
  seed: number;
  delta: string;
  live?: boolean;
  format?: (n: number) => string;
  every?: number;
}) {
  const { value, bumped } = useLiveNumber(seed, { every, drift: Math.max(2, seed * 0.0006) });
  const shown = live ? value : seed;

  return (
    <div className="border-border px-5 py-4 not-last:border-b sm:not-last:border-b-0 sm:not-last:border-r">
      <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-fg-faint">
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-2">
        <p
          className="tick-num text-[1.75rem] font-semibold leading-none tracking-[-0.02em]"
          data-bumped={live && bumped}
        >
          {format(shown)}
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
        {/* A widget caption in a decorative preview, not document structure —
            a real <h3> here skips from the page <h1> with no <h2> between. */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-faint">
          {title}
        </p>
        <span className="text-[11px] uppercase tracking-wide text-fg-faint">{unit}</span>
      </div>
      <ul className="mt-4 space-y-1.5">
        {rows.map((row, i) => (
          <li key={row.label} className="relative overflow-hidden rounded">
            <div
              className="bar-fill absolute inset-y-0 left-0 bg-accent/[0.13]"
              // Staggered so the list fills top-down, the way a query returns.
              style={{ width: `${row.pct}%`, animationDelay: `${0.5 + i * 0.09}s` }}
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
  // `24h` is what the server renders — the only range whose numbers drift.
  const [range, setRange] = useState<RangeKey>("24h");
  const r = RANGES[range];

  const pts = points(r.series);
  const last = pts[pts.length - 1];

  // Concurrent visitors move faster and swing wider than the daily totals —
  // that contrast is what makes the number read as "right now".
  const { value: online, bumped: onlineBumped } = useLiveNumber(42, {
    every: 2400,
    drift: 3,
    band: 0.22,
  });

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
            quantalog.daorbit.in ·{" "}
            <span className="tick-num text-fg" data-bumped={onlineBumped}>
              {online}
            </span>{" "}
            visitors online
          </span>
        </div>
        {/* Real toggle now: switching the range redraws the chart, re-seeds the
            headline numbers and swaps both bar lists. Kept desktop-only — the
            chrome is decoration on a phone-width mock. */}
        <div className="hidden items-center gap-1 sm:flex">
          {RANGE_KEYS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setRange(k)}
              aria-pressed={range === k}
              className={`rounded px-1.5 py-0.5 text-[11px] transition-colors ${
                range === k
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-fg-faint hover:text-fg-muted"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* `key={range}` remounts each Stat when the range changes, so the live
          counter re-seeds from the new figure instead of drifting off the old. */}
      <div className="stat-sweep relative grid overflow-hidden border-b border-border sm:grid-cols-4">
        <Stat
          key={`v-${range}`}
          label="Visitors"
          seed={r.stats.visitors}
          delta="+18.2%"
          live={r.live}
          every={3000}
        />
        <Stat
          key={`p-${range}`}
          label="Pageviews"
          seed={r.stats.pageviews}
          delta="+11.4%"
          live={r.live}
          every={2100}
        />
        <Stat
          key={`b-${range}`}
          label="Bounce rate"
          seed={r.stats.bounce}
          delta="−6.1%"
          format={(n) => `${n}%`}
        />
        <Stat
          key={`s-${range}`}
          label="Avg. session"
          seed={r.stats.session}
          delta="+9.8%"
          format={(n) => `${Math.floor(n / 60)}m ${n % 60}s`}
        />
      </div>

      {/* Traffic area chart */}
      <div className="border-b border-border p-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-faint">
            {r.chartLabel}
          </p>
          <span className="flex items-center gap-1.5 rounded border border-border px-2 py-0.5 font-mono text-[11px] text-fg-muted">
            <span className="live-dot h-1 w-1 rounded-full bg-accent" />
            {r.live ? "polling 3s" : "settled"}
          </span>
        </div>

        <svg
          key={range}
          viewBox={`0 0 ${W} ${H}`}
          className="mt-5 h-32 w-full overflow-visible"
          preserveAspectRatio="none"
          role="img"
          aria-label={`${r.chartLabel}, trending upward`}
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

          <path
            className="chart-area"
            d={`${linePath(r.series)} L ${W},${H} L 0,${H} Z`}
            fill="url(#q-fill)"
          />
          {/* Drawn with a dash offset equal to its own length, so it paints in
              from the left instead of appearing all at once. The length is an
              over-estimate of the path — exact is unnecessary, too short is not. */}
          <path
            className="chart-line"
            style={{ "--line-len": "1400" } as React.CSSProperties}
            d={linePath(r.series)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Leading edge marker — the "this is happening now" cue. */}
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
          {r.axis.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* `key={range}` replays the bar-fill stagger on each switch. */}
      <div
        key={range}
        className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0"
      >
        <BarList title="Top pages" unit="Views" rows={r.topPages} />
        <BarList title="Top sources" unit="Views" rows={r.sources} />
      </div>
    </div>
  );
}
