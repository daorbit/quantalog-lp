"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The animated illustration in each feature page's hero — one per page.
 *
 * Everything runs on CSS keyframes or a lightweight rAF counter, so the pages
 * stay statically exportable and nothing is fetched. Each visual loops so the
 * hero has continuous motion the way the homepage's flow diagram does. The
 * shared keyframes live in globals.css under "Feature hero visuals".
 */

/* --- a number that counts up to its target on a loop --------------------- */
function Counter({
  to,
  suffix = "",
  format = (n: number) => Math.round(n).toLocaleString("en-US"),
  duration = 1600,
}: {
  to: number;
  suffix?: string;
  format?: (n: number) => string;
  duration?: number;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let start = 0;
    const loop = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      // easeOutCubic
      setN(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(loop);
      else {
        // hold, then run again
        window.setTimeout(() => {
          start = 0;
          setN(0);
          raf = requestAnimationFrame(loop);
        }, 2600);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(n)}
      {suffix}
    </span>
  );
}

/* --- a sparkline that redraws itself on a loop -------------------------- */
function Spark({ points, className = "" }: { points: number[]; className?: string }) {
  const w = 120;
  const h = 32;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min || 1)) * h;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={`h-8 w-full overflow-visible ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className="fhv-spark"
      />
    </svg>
  );
}

function StatCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-bg-subtle p-4">
      <p className="text-[10.5px] font-medium uppercase tracking-widest text-fg-faint">
        {label}
      </p>
      {children}
    </div>
  );
}

/* --- Analytics -------------------------------------------------------------- */
export function AnalyticsHeroVisual() {
  const funnel = [
    { label: "Landing", pct: 100 },
    { label: "Pricing", pct: 45 },
    { label: "Signup", pct: 18 },
    { label: "Installed", pct: 5 },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <StatCard label="Visitors">
          <p className="mt-1.5 text-[1.35rem] font-semibold leading-none">
            <Counter to={128470} />
          </p>
          <Spark points={[42, 48, 45, 53, 61, 58, 66, 72, 69, 78, 84, 92, 99]} className="mt-2.5" />
        </StatCard>
        <StatCard label="Live now">
          <p className="mt-1.5 flex items-center gap-1.5 text-[1.35rem] font-semibold leading-none">
            <span className="fhv-dot h-2 w-2 rounded-full bg-accent" />
            <Counter to={47} duration={1000} />
          </p>
          <Spark points={[10, 14, 12, 18, 22, 19, 26, 24, 30, 28, 34, 31, 38]} className="mt-2.5" />
        </StatCard>
      </div>

      <div className="rounded-lg border border-border bg-bg-subtle p-4">
        <p className="mb-3 text-[10.5px] font-medium uppercase tracking-widest text-fg-faint">
          Signup funnel
        </p>
        <div className="space-y-2">
          {funnel.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2.5">
              <span className="w-16 shrink-0 text-[11px] text-fg-muted">{s.label}</span>
              <div className="h-5 flex-1 overflow-hidden rounded bg-fg-faint/[0.06]">
                <div
                  className="fhv-bar h-full rounded bg-accent/25 ring-1 ring-inset ring-accent/30"
                  style={{ ["--w" as string]: `${s.pct}%`, animationDelay: `${i * 0.12}s` }}
                />
              </div>
              <span className="w-9 shrink-0 text-right text-[11px] tabular-nums text-fg-muted">
                {s.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- SEO audits ---------------------------------------------------------- */
export function SeoHeroVisual() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center rounded-lg border border-border bg-bg-subtle p-5">
        <svg viewBox="0 0 140 78" className="w-full max-w-[10rem]" aria-hidden="true">
          <path
            d="M 14,70 A 56,56 0 0 1 126,70"
            fill="none"
            stroke="var(--border)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 14,70 A 56,56 0 0 1 126,70"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="12"
            strokeLinecap="round"
            pathLength={1}
            className="fhv-gauge"
            style={{ ["--fill" as string]: 0.92 }}
          />
        </svg>
        <p className="-mt-4 text-xl font-semibold tabular-nums">
          <Counter to={92} duration={1400} />
        </p>
        <p className="mt-1 text-xs font-medium text-fg">Health score</p>
        <p className="mt-0.5 text-[11px] text-fg-faint">mobile Lighthouse</p>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { to: 0, l: "Broken links" },
          { to: 3, l: "Issues open" },
          { to: 14, l: "Since last run", prefix: "+" },
        ].map((s, i) => (
          <div
            key={s.l}
            className="fhv-rise rounded-lg border border-border bg-bg-subtle p-3"
            style={{ animationDelay: `${0.15 + i * 0.1}s` }}
          >
            <p className="text-lg font-semibold tabular-nums">
              {s.prefix ?? ""}
              <Counter to={s.to} duration={1200} />
            </p>
            <p className="mt-0.5 text-[10.5px] text-fg-faint">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Reports ----------------------------------------------------------- */
export function ReportsHeroVisual() {
  const line =
    "Traffic up 22%, mostly from a Reddit thread that didn't stick. Signups flat.";
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-bg-subtle p-4">
        <p className="text-[10.5px] font-medium uppercase tracking-widest text-fg-faint">
          This week&apos;s read
        </p>
        <p className="fhv-type mt-2 text-sm leading-relaxed text-fg-muted">{line}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <StatCard label="Sessions">
          <p className="mt-1.5 text-[1.35rem] font-semibold leading-none">
            <Counter to={9204} />
          </p>
          <Spark points={[30, 33, 32, 38, 44, 47, 52, 56, 61, 58, 66, 72, 80]} className="mt-2.5" />
        </StatCard>
        <StatCard label="Top country">
          <div className="mt-2 space-y-1.5">
            {[
              { f: "🇺🇸", n: "United States", w: 100 },
              { f: "🇩🇪", n: "Germany", w: 45 },
              { f: "🇮🇳", n: "India", w: 29 },
            ].map((r, i) => (
              <div key={r.n} className="relative overflow-hidden rounded">
                <div
                  className="fhv-bar absolute inset-y-0 left-0 bg-accent/[0.14]"
                  style={{ ["--w" as string]: `${r.w}%`, animationDelay: `${0.3 + i * 0.1}s` }}
                />
                <div className="relative flex items-center gap-2 py-1 pl-1.5 text-[11px]">
                  <span aria-hidden>{r.f}</span>
                  <span className="truncate text-fg">{r.n}</span>
                </div>
              </div>
            ))}
          </div>
        </StatCard>
      </div>
    </div>
  );
}

/* --- Forms ----------------------------------------------------------- */
export function FormsHeroVisual() {
  const rows = [
    { label: "Email", drop: 4, worst: false },
    { label: "Company", drop: 9, worst: false },
    { label: "Phone", drop: 36, worst: true },
    { label: "Message", drop: 13, worst: false },
  ];
  return (
    <div className="rounded-lg border border-border bg-bg-subtle p-4">
      <p className="mb-3 text-[10.5px] font-medium uppercase tracking-widest text-fg-faint">
        Where people drop
      </p>
      <div className="space-y-2.5">
        {rows.map((r, i) => (
          <div key={r.label} className="flex items-center gap-2.5">
            <span className="w-16 shrink-0 text-[11px] font-medium text-fg">
              {r.label}
            </span>
            <div className="h-6 flex-1 overflow-hidden rounded bg-fg-faint/[0.06]">
              <div
                className={`fhv-bar h-full rounded ${
                  r.worst
                    ? "bg-fg-muted/55 ring-1 ring-inset ring-fg-muted/40"
                    : "bg-accent/25 ring-1 ring-inset ring-accent/25"
                }`}
                style={{ ["--w" as string]: `${100 - r.drop}%`, animationDelay: `${i * 0.1}s` }}
              />
            </div>
            <span
              className={`w-14 shrink-0 text-right text-[11px] tabular-nums ${
                r.worst ? "font-semibold text-fg" : "text-fg-muted"
              }`}
            >
              {r.drop}% left
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Platform API ------------------------------------------------------- */
export function PlatformHeroVisual() {
  const lines = [
    { t: "POST /v1/projects", c: "text-fg" },
    { t: '  { "name": "Jane\'s Store" }', c: "text-fg-muted" },
    { t: "→ 201  prj_31f", c: "text-accent" },
    { t: "", c: "" },
    { t: "GET /v1/sites/site_9a/stats", c: "text-fg" },
    { t: "→ { visitors: 1284, live: 7 }", c: "text-accent" },
  ];
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-bg-subtle">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-fg-faint/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg-faint/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg-faint/40" />
        <span className="ml-2 text-[10.5px] text-fg-faint">platform-api</span>
      </div>
      <div className="p-4 font-mono text-[11.5px] leading-relaxed">
        {lines.map((l, i) => (
          <div
            key={i}
            className={`fhv-line ${l.c} ${l.t === "" ? "h-3" : ""}`}
            style={{ animationDelay: `${i * 0.35}s` }}
          >
            {l.t || " "}
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Orbit AI & social ------------------------------------------------- */
export function SocialHeroVisual() {
  const msg =
    "Your Tuesday post is drafted from last week's numbers — the 22% traffic jump and where it came from.";
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-bg-subtle p-4">
        <div className="flex items-center gap-2">
          <span className="fhv-dot h-6 w-6 rounded-full bg-accent/25" aria-hidden />
          <p className="text-xs font-medium text-fg">Orbit</p>
        </div>
        <p className="fhv-type mt-2.5 text-sm leading-relaxed text-fg-muted">{msg}</p>
      </div>
      <div
        className="fhv-rise rounded-lg border border-border bg-bg-subtle p-3 text-[11px]"
        style={{ animationDelay: "1.4s" }}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium text-fg">Scheduled</span>
          <span className="text-fg-faint">LinkedIn · Tue 09:00</span>
        </div>
      </div>
    </div>
  );
}
