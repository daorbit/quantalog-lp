import { ArrowUpRight } from "lucide-react";
import { PreviewFrame } from "../preview-frame";
import { Meter } from "./meter";
import { areaUnder, smoothLine, toPoints } from "./chart-path";

const hourly = [
  180, 150, 120, 110, 105, 130, 210, 340, 480, 560, 610, 640,
  700, 690, 720, 760, 820, 870, 910, 860, 780, 690, 640, 700,
];

const stats = [
  { label: "Visitors", value: "12,847", change: "18%" },
  { label: "Pageviews", value: "38,210", change: "11%" },
  { label: "Avg. time", value: "2m 14s", change: "6%" },
];

const pages = [
  { name: "/pricing", count: "3,412", share: 100 },
  { name: "/blog/cookieless", count: "2,108", share: 62 },
  { name: "/docs/install", count: "1,264", share: 37 },
];

const sources = [
  { name: "Google", count: "41%", share: 100 },
  { name: "Direct", count: "23%", share: 56 },
  { name: "reddit.com", count: "14%", share: 34 },
];

const axis = [
  { label: "00:00", hour: 0 },
  { label: "06:00", hour: 6 },
  { label: "12:00", hour: 12 },
  { label: "18:00", hour: 18 },
  { label: "Now", hour: 23 },
];

const W = 560;
const H = 150;
const PAD_TOP = 34;

const points = toPoints(hourly, W, H - PAD_TOP, Math.max(...hourly)).map(
  ([x, y]) => [x, y + PAD_TOP] as [number, number]
);
const line = smoothLine(points);
const area = areaUnder(line, W, H);
const peakIndex = hourly.indexOf(Math.max(...hourly));
const [peakX, peakY] = points[peakIndex];
const [nowX, nowY] = points[points.length - 1];

function Ranked({ title, rows }: { title: string; rows: typeof pages }) {
  return (
    <div>
      <p className="text-[13px] font-medium text-fg">{title}</p>
      <ul className="mt-3 space-y-3">
        {rows.map((r) => (
          <li key={r.name}>
            <div className="mb-1.5 flex items-center justify-between gap-3 text-[13px]">
              <span className="truncate text-fg">{r.name}</span>
              <span className="shrink-0 tabular-nums text-fg-muted">{r.count}</span>
            </div>
            <Meter value={r.share} label={`${r.name}: ${r.count}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AnalyticsPreview() {
  return (
    <PreviewFrame
      title="acme.com"
      context="Overview"
      meta={
        <span className="inline-flex items-center gap-1.5">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          47 online now
        </span>
      }
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-medium text-fg">Today</p>
        <div className="flex rounded-full bg-bg-subtle p-0.5 text-[12px]" aria-hidden="true">
          <span className="rounded-full bg-surface px-2.5 py-1 font-medium text-fg shadow-soft ring-1 ring-border">24h</span>
          <span className="px-2.5 py-1 text-fg-muted">7d</span>
          <span className="px-2.5 py-1 text-fg-muted">30d</span>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-3 divide-x divide-border rounded-xl border border-border">
        {stats.map((s) => (
          <div key={s.label} className="px-3 py-3 sm:px-4">
            <dt className="text-[12px] text-fg-muted">{s.label}</dt>
            <dd className="mt-1 text-[1.25rem] font-semibold leading-none tracking-tight tabular-nums text-fg sm:text-[1.5rem]">
              {s.value}
            </dd>
            <dd className="mt-1.5 inline-flex items-center gap-0.5 text-[12px] font-medium text-fg-muted">
              <ArrowUpRight className="h-3 w-3 text-accent" aria-hidden="true" />
              {s.change}
            </dd>
          </div>
        ))}
      </dl>

      <figure className="mt-5">
        <svg
          viewBox={`0 0 ${W} ${H + 18}`}
          className="block h-auto w-full overflow-visible"
          role="img"
          aria-label="Visitors per hour today, rising from about 100 overnight to a peak of 910 at 18:00"
        >
          <defs>
            <linearGradient id="visitors-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0.33, 0.66, 1].map((f) => (
            <line
              key={f}
              x1="0"
              x2={W}
              y1={PAD_TOP + (H - PAD_TOP) * f}
              y2={PAD_TOP + (H - PAD_TOP) * f}
              stroke="var(--border)"
              strokeDasharray={f === 1 ? undefined : "3 4"}
            />
          ))}

          <path d={area} fill="url(#visitors-fill)" />
          <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />

          <line x1={peakX} x2={peakX} y1={peakY} y2={H} stroke="var(--border-strong)" strokeDasharray="2 3" />
          <g transform={`translate(${peakX - 46} ${peakY - 34})`}>
            <rect width="92" height="24" rx="12" fill="var(--cta)" />
            <text x="46" y="16" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--cta-fg)">
              910 · 18:00
            </text>
          </g>
          <circle cx={peakX} cy={peakY} r="4.5" fill="var(--accent)" stroke="var(--surface-raised)" strokeWidth="2" />
          <circle cx={nowX} cy={nowY} r="4" fill="var(--accent)" stroke="var(--surface-raised)" strokeWidth="2" />

          {axis.map(({ label, hour }) => (
            <text
              key={label}
              x={(hour / (hourly.length - 1)) * W}
              y={H + 16}
              fontSize="11"
              fill="var(--fg-faint)"
              textAnchor={hour === 0 ? "start" : hour === hourly.length - 1 ? "end" : "middle"}
            >
              {label}
            </text>
          ))}
        </svg>
      </figure>

      <div className="mt-6 grid gap-6 border-t border-border pt-5 sm:grid-cols-2">
        <Ranked title="Top pages" rows={pages} />
        <Ranked title="Top sources" rows={sources} />
      </div>
    </PreviewFrame>
  );
}
