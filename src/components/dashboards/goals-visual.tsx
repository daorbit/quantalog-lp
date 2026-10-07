"use client";

import { useCycle } from "../use-cycle";
import { VisualPill } from "../explore/visuals/visual-pill";
import { GoalRing } from "./goal-ring";
import { GOAL_PERIODS, GOAL_TONES, RING_RADII } from "./goal-periods";

export function GoalsVisual() {
  const { ref, index, inView } = useCycle<HTMLDivElement>(GOAL_PERIODS.length, 4800);
  const period = GOAL_PERIODS[index];

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative h-44 w-44 sm:h-60 sm:w-60">
        <svg key={index} viewBox="0 0 120 120" className="goal-rings h-full w-full" aria-hidden="true">
          {period.goals.map((g, i) => (
            <GoalRing key={g.name} r={RING_RADII[i]} progress={g.progress} className={GOAL_TONES[g.tone].ring} active={inView} />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span key={period.summary} className="chat-in text-[15px] font-semibold leading-none tracking-tight tabular-nums text-fg sm:text-[20px]">
            {period.summary}
          </span>
          <span className="mt-1 text-[10px] leading-none text-fg-muted sm:text-[11px]">on track</span>
        </div>
      </div>
      <div className="mt-5">
        <VisualPill swapKey={period.label}>{period.label}</VisualPill>
      </div>
    </div>
  );
}
