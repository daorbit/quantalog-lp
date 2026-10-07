"use client";

import { useCycle } from "../use-cycle";
import { VisualPill } from "../explore/visuals/visual-pill";
import { SAMPLE_CODE, shareChannels } from "./referral-data";

const states = ["Link copied", ...shareChannels.map((c) => `Shared on ${c}`)];

export function InviteVisual() {
  const { ref, index } = useCycle<HTMLDivElement>(states.length, 2200);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <VisualPill swapKey={states[index]} live>
        {states[index]}
      </VisualPill>
      <p className="mt-5 font-mono text-[2.75rem] font-semibold leading-none tracking-tight text-fg sm:text-[4.5rem]">
        {SAMPLE_CODE}
      </p>
      <p className="mt-4 text-[15px] text-fg-muted">
        …/signup?ref=<span className="text-fg">{SAMPLE_CODE}</span>
      </p>
    </div>
  );
}
