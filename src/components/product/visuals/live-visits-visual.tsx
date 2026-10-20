"use client";

import { Flag } from "../../language/flag";
import { RollingNumber } from "../../rolling-number";
import { useInView } from "../../use-in-view";
import { useReducedMotion } from "../../use-reduced-motion";
import { formatAge } from "./live-visits-data";
import { useLiveVisits } from "./use-live-visits";

export function LiveVisitsVisual() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3, false);
  const reduced = useReducedMotion();
  const { visits, live } = useLiveVisits(inView && !reduced);

  return (
    <div ref={ref} className="visits-card">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-2.5 py-1 text-[12px] font-semibold text-accent">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          Live
        </span>
        <span className="text-[12px] text-fg-faint">acme.com</span>
      </div>

      <p className="mt-6 text-[4rem] font-semibold leading-none tracking-[-0.05em] tabular-nums text-fg sm:text-[4.75rem]">
        <RollingNumber value={live} />
      </p>
      <p className="mt-2 text-[14px] text-fg-muted">people on the site right now</p>

      <p className="mt-7 border-t border-border pt-5 text-[12px] font-semibold uppercase tracking-wide text-fg-faint">
        Latest visits
      </p>
      <ul className="mt-2">
        {visits.map((visit) => (
          <li key={visit.id} className="visits-row">
            <Flag code={visit.code} />
            <span className="sr-only">{visit.country}</span>
            <span className="min-w-0 truncate font-mono text-[12.5px] text-fg">{visit.page}</span>
            <span className="text-[12.5px] text-fg-muted">{visit.source}</span>
            <span className="visits-age" data-new={visit.age < 2 || undefined}>
              {formatAge(visit.age)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
