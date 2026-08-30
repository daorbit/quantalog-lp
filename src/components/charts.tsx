const SPARK_W = 120;
const SPARK_H = 32;

function sparkPath(values: number[]) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const step = SPARK_W / (values.length - 1);
  return values
    .map((v, i) => {
      const y = SPARK_H - 3 - ((v - min) / span) * (SPARK_H - 6);
      return `${i === 0 ? "M" : "L"} ${(i * step).toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function SparkStat({
  label,
  value,
  delta,
  up = true,
  series,
  delay = 0,
}: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
  series: number[];
  delay?: number;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 p-5">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-fg-faint">
          {label}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-[1.5rem] font-semibold leading-none tracking-[-0.02em] tabular-nums">
            {value}
          </p>
          <span
            className={`rounded px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${
              up
                ? "bg-accent/10 text-accent"
                : "bg-fg-faint/10 text-fg-muted"
            }`}
          >
            {delta}
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
        className="h-8 w-full overflow-visible"
        preserveAspectRatio="none"
        role="presentation"
        aria-hidden="true"
      >
        <path
          className="chart-line"
          style={{ "--line-len": "400", animationDelay: `${0.3 + delay}s` } as React.CSSProperties}
          d={sparkPath(series)}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={up ? 0.9 : 0.45}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export type FunnelStep = { label: string; count: number };

export function Funnel({ steps }: { steps: FunnelStep[] }) {
  const top = steps[0].count;

  return (
    <ol className="space-y-2.5">
      {steps.map((step, i) => {
        const pct = (step.count / top) * 100;
        const prev = i === 0 ? null : steps[i - 1].count;
        const drop = prev ? ((prev - step.count) / prev) * 100 : 0;

        return (
          <li key={step.label}>
            <div className="flex items-baseline justify-between gap-3 text-xs">
              <span className="font-medium text-fg">{step.label}</span>
              <span className="shrink-0 tabular-nums text-fg-muted">
                {step.count.toLocaleString("en-US")}
                <span className="ml-2 text-fg-faint">{pct.toFixed(0)}%</span>
              </span>
            </div>

            <div className="mt-1.5 h-7 overflow-hidden rounded bg-fg-faint/[0.07]">
              <div
                className="bar-fill h-full rounded bg-accent/[0.22] ring-1 ring-inset ring-accent/25"
                style={{ width: `${pct}%`, animationDelay: `${0.35 + i * 0.12}s` }}
                aria-hidden="true"
              />
            </div>

            {prev !== null && (
              <p className="mt-1 text-[11px] tabular-nums text-fg-faint">
                −{drop.toFixed(1)}% from {steps[i - 1].label.toLowerCase()}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function HeadToHead({
  label,
  ours,
  theirs,
  ourName,
  rivalName,
  format,
  lowerIsBetter,
  source,
  delay = 0,
}: {
  label: string;
  ours: number;
  theirs: number;
  ourName: string;
  rivalName: string;
  format: (n: number) => string;
  lowerIsBetter: boolean;
  source: string;
  delay?: number;
}) {
  const scale = Math.max(ours, theirs) || 1;
  const weWin = lowerIsBetter ? ours <= theirs : ours >= theirs;

  const width = (n: number) => `${Math.max((n / scale) * 100, 2)}%`;

  const bars = [
    { name: ourName, value: ours, win: weWin },
    { name: rivalName, value: theirs, win: !weWin },
  ];

  return (
    <div>
      <p className="text-xs font-medium text-fg">{label}</p>

      <div className="mt-3 space-y-2">
        {bars.map((bar, i) => (
          <div key={bar.name} className="flex items-center gap-3">
            <span className="w-24 shrink-0 truncate text-[11px] text-fg-muted">
              {bar.name}
            </span>
            <div className="h-6 flex-1 overflow-hidden rounded bg-fg-faint/[0.07]">
              <div
                className={`bar-fill h-full rounded ${
                  bar.win
                    ? "bg-accent/[0.22] ring-1 ring-inset ring-accent/25"
                    : "bg-fg-faint/[0.14] ring-1 ring-inset ring-fg-faint/15"
                }`}
                style={{ width: width(bar.value), animationDelay: `${delay + i * 0.12}s` }}
                aria-hidden="true"
              />
            </div>
            <span className="w-16 shrink-0 text-right text-[11px] font-semibold tabular-nums text-fg">
              {format(bar.value)}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-2.5 text-[11px] leading-relaxed text-fg-faint">
        {lowerIsBetter ? "Lower is better." : "Higher is better."} {source}
      </p>
    </div>
  );
}

export function VerdictBar({
  ours,
  tied,
  theirs,
  rival,
  ourName,
}: {
  ours: number;
  tied: number;
  theirs: number;
  rival: string;
  ourName: string;
}) {
  const total = ours + tied + theirs || 1;
  const segments = [
    { n: ours, cls: "bg-accent/70", label: `${ours} favour ${ourName}` },
    { n: tied, cls: "bg-fg-faint/25", label: `${tied} tied` },
    { n: theirs, cls: "bg-fg-faint/45", label: `${theirs} favour ${rival}` },
  ].filter((s) => s.n > 0);

  return (
    <div>
      <div
        className="flex h-1.5 gap-0.5 overflow-hidden rounded-full"
        role="img"
        aria-label={segments.map((s) => s.label).join(", ")}
      >
        {segments.map((s) => (
          <div
            key={s.cls}
            className={`${s.cls} first:rounded-l-full last:rounded-r-full`}
            style={{ width: `${(s.n / total) * 100}%` }}
          />
        ))}
      </div>
      <p className="mt-2 text-[11px] tabular-nums text-fg-faint">
        {ours} favour {ourName} · {tied} tied · {theirs} favour {rival}
      </p>
    </div>
  );
}

export function FieldDropOff({
  rows,
}: {
  rows: { label: string; reached: number; abandoned: number }[];
}) {
  const top = rows[0]?.reached || 1;

  const rate = (r: { reached: number; abandoned: number }) =>
    r.reached === 0 ? 0 : r.abandoned / r.reached;
  const worst = rows.reduce(
    (acc, r, i) => (rate(r) > rate(rows[acc]) ? i : acc),
    0
  );

  return (
    <ol className="space-y-2.5">
      {rows.map((row, i) => {
        const continued = row.reached - row.abandoned;
        const continuedPct = (continued / top) * 100;
        const lostPct = (row.abandoned / top) * 100;
        const dropRate = rate(row) * 100;
        const isWorst = i === worst;

        return (
          <li key={row.label} className="flex items-center gap-3">
            <span className="w-28 shrink-0 truncate text-xs font-medium text-fg sm:w-32">
              {row.label}
            </span>

            <div className="flex h-7 flex-1 items-stretch gap-0.5 overflow-hidden rounded bg-fg-faint/[0.06]">
              <div
                className="bar-fill rounded-l bg-accent/25 ring-1 ring-inset ring-accent/30"
                style={{
                  width: `${continuedPct}%`,
                  animationDelay: `${0.25 + i * 0.09}s`,
                }}
                aria-hidden="true"
              />

              <div
                className={`bar-fill rounded-r ${
                  isWorst
                    ? "bg-fg-muted/55 ring-1 ring-inset ring-fg-muted/40"
                    : "bg-fg-faint/25"
                }`}
                style={{
                  width: `${Math.max(lostPct, 0.8)}%`,
                  animationDelay: `${0.32 + i * 0.09}s`,
                }}
                aria-hidden="true"
              />
            </div>

            <span
              className={`w-20 shrink-0 text-right text-xs tabular-nums ${
                isWorst ? "font-semibold text-fg" : "text-fg-muted"
              }`}
            >
              {dropRate.toFixed(0)}% left
            </span>
          </li>
        );
      })}

      <li className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1.5 text-[11px] text-fg-faint">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-accent/40" aria-hidden="true" />
          Continued
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-fg-muted/50" aria-hidden="true" />
          Stopped here
        </span>
        <span>Bar width is the share of everyone who opened the form.</span>
      </li>
    </ol>
  );
}

export function CohortGrid({
  rows,
  weeks,
}: {
  rows: { label: string; size: number; values: number[] }[];
  weeks: string[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[26rem] border-separate border-spacing-[3px] text-[11px]">
        <thead>
          <tr>
            <th className="text-left font-medium uppercase tracking-[0.1em] text-fg-faint">
              Cohort
            </th>
            {weeks.map((w) => (
              <th
                key={w}
                className="px-1 text-center font-medium uppercase tracking-[0.1em] text-fg-faint"
              >
                {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={row.label}>
              <th scope="row" className="whitespace-nowrap py-1 pr-3 text-left font-normal">
                <span className="font-mono text-fg-muted">{row.label}</span>
                <span className="ml-2 tabular-nums text-fg-faint">
                  {row.size.toLocaleString("en-US")}
                </span>
              </th>
              {row.values.map((v, c) => (
                <td
                  key={c}
                  className="cohort-cell h-8 rounded text-center tabular-nums"
                  style={{

                    background: `color-mix(in srgb, var(--accent) ${Math.max(6, v * 0.9).toFixed(0)}%, transparent)`,
                    animationDelay: `${0.3 + (r + c) * 0.05}s`,
                  }}
                >
                  <span className={v >= 55 ? "font-medium text-fg" : "text-fg-muted"}>
                    {v}%
                  </span>
                </td>
              ))}

              {Array.from({ length: weeks.length - row.values.length }).map((_, i) => (
                <td key={`e${i}`} className="h-8 rounded bg-fg-faint/[0.04]" />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type Slice = { label: string; value: number };

export function Donut({
  slices,
  centerLabel,
  centerValue,
}: {
  slices: Slice[];
  centerLabel: string;
  centerValue: string;
}) {
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  const R = 52;
  const CIRC = 2 * Math.PI * R;

  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0">
        <svg viewBox="0 0 130 130" className="h-[7.5rem] w-[7.5rem] -rotate-90" role="presentation">
          <circle
            cx="65"
            cy="65"
            r={R}
            fill="none"
            stroke="var(--border)"
            strokeWidth="14"
          />
          {slices.map((s, i) => {
            const len = (s.value / total) * CIRC;
            const dash = `${len} ${CIRC - len}`;
            const strokeOffset = -offset;
            offset += len;

            return (
              <circle
                key={s.label}
                className="donut-arc"
                cx="65"
                cy="65"
                r={R}
                fill="none"
                stroke="var(--accent)"

                strokeOpacity={1 - i * 0.22}
                strokeWidth="14"
                strokeDasharray={dash}
                strokeDashoffset={strokeOffset}
                style={{ animationDelay: `${0.3 + i * 0.12}s` }}
              />
            );
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold leading-none tabular-nums">
            {centerValue}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.1em] text-fg-faint">
            {centerLabel}
          </span>
        </div>
      </div>

      <ul className="min-w-0 flex-1 space-y-2">
        {slices.map((s, i) => (
          <li key={s.label} className="flex items-center gap-2.5 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm bg-accent"
              style={{ opacity: 1 - i * 0.22 }}
              aria-hidden="true"
            />
            <span className="truncate text-fg-muted">{s.label}</span>
            <span className="ml-auto shrink-0 tabular-nums font-medium">
              {((s.value / total) * 100).toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HourBars({
  values,
  peakHour,
}: {
  values: number[];
  peakHour: number;
}) {
  const max = Math.max(...values);

  return (
    <div>
      <div className="flex h-28 items-end gap-[3px]">
        {values.map((v, i) => (
          <div
            key={i}
            className="col-grow flex-1 rounded-sm"
            style={{
              height: `${Math.max(4, (v / max) * 100)}%`,
              background:
                i === peakHour ? "var(--accent)" : "color-mix(in srgb, var(--accent) 22%, transparent)",
              animationDelay: `${0.3 + i * 0.02}s`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
      <div
        className="mt-2 flex justify-between font-mono text-[10px] text-fg-faint"
        aria-hidden="true"
      >
        {["00", "06", "12", "18", "23"].map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>
    </div>
  );
}

export function GeoBars({
  rows,
}: {
  rows: { flag: string; label: string; views: number; pct: number }[];
}) {
  return (
    <ul className="space-y-1.5">
      {rows.map((row, i) => (
        <li key={row.label} className="relative overflow-hidden rounded">
          <div
            className="bar-fill absolute inset-y-0 left-0 bg-accent/[0.13]"
            style={{ width: `${row.pct}%`, animationDelay: `${0.4 + i * 0.08}s` }}
            aria-hidden="true"
          />
          <div className="relative flex items-center gap-2.5 py-2 pl-2.5 pr-2">
            <span aria-hidden="true">{row.flag}</span>
            <span className="truncate text-xs text-fg">{row.label}</span>
            <span className="ml-auto shrink-0 text-xs font-medium tabular-nums text-fg-muted">
              {row.views.toLocaleString("en-US")}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Gauge({
  pct,
  label,
  caption,
}: {
  pct: number;
  label: string;
  caption: string;
}) {
  const R = 56;
  const ARC = Math.PI * R;
  const filled = (Math.min(pct, 100) / 100) * ARC;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 140 78" className="w-full max-w-[10rem]" role="presentation">
        <path
          d={`M 14,70 A ${R},${R} 0 0 1 126,70`}
          fill="none"
          stroke="var(--border)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          className="chart-line"
          style={{ "--line-len": `${ARC.toFixed(0)}` } as React.CSSProperties}
          d={`M 14,70 A ${R},${R} 0 0 1 126,70`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${filled.toFixed(1)} ${ARC.toFixed(1)}`}
        />
      </svg>
      <p className="-mt-4 text-xl font-semibold tabular-nums">{pct}%</p>
      <p className="mt-1 text-xs font-medium text-fg">{label}</p>
      <p className="mt-0.5 text-[11px] text-fg-faint">{caption}</p>
    </div>
  );
}
