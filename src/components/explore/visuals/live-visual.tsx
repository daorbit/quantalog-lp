"use client";

import { useLiveNumber } from "../../use-live-number";
import { RollingNumber } from "../../rolling-number";

export function LiveVisual() {
  const { value } = useLiveNumber(47, { every: 2400, drift: 2, band: 0.08 });

  return (
    <div className="text-center">
      <p className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-[13px] font-medium text-fg shadow-soft ring-1 ring-border dark:bg-bg-subtle">
        <span className="live-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        Live
      </p>
      <p className="mt-4 text-[5rem] font-semibold leading-none tracking-[-0.06em] tabular-nums text-fg sm:text-[8.5rem]">
        <RollingNumber value={value} />
      </p>
      <p className="mt-3 text-[15px] text-fg-muted">people on acme.com right now</p>
    </div>
  );
}
