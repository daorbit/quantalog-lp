import type { Ref } from "react";

export type MapHit = {
  name: string;
  tone?: string;
  rank: string;
  visitors: string;
  views: string;
  share: string;
};

type Props = { hit: MapHit | null; countries: number; ref?: Ref<HTMLDivElement> };

export function MapTooltip({ hit, countries, ref }: Props) {
  const rows = hit
    ? [
        { label: "Visitors", value: hit.visitors },
        { label: "Pageviews", value: hit.views },
        { label: "Share of traffic", value: hit.share },
      ]
    : [];

  return (
    <div
      ref={ref}
      className="map-tooltip"
      data-visible={hit ? "" : undefined}
      style={{ ["--dot" as string]: hit?.tone ?? "var(--accent)" }}
      role="status"
    >
      {hit && (
        <>
          <div className="flex items-center justify-between gap-6">
            <p className="flex min-w-0 items-center gap-2 text-[13.5px] font-semibold text-fg">
              <span className="map-tooltip-dot" />
              <span className="truncate">{hit.name}</span>
            </p>
            <span className="shrink-0 text-[11.5px] tabular-nums text-fg-faint">
              #{hit.rank} of {countries}
            </span>
          </div>
          <dl className="mt-2.5 space-y-1.5 border-t border-border pt-2.5">
            {rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-6 text-[12.5px]">
                <dt className="text-fg-muted">{row.label}</dt>
                <dd className="font-semibold tabular-nums text-fg">{row.value}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
    </div>
  );
}
