"use client";

import { useCycle } from "../use-cycle";
import { GoalRing } from "./goal-ring";
import { GoalRow } from "./goal-row";
import { GOAL_PERIODS, GOAL_TONES, RING_RADII } from "./goal-periods";

export function GoalsVisual() {
  const { ref, index, inView } = useCycle<HTMLSpanElement>(GOAL_PERIODS.length, 4800);
  const period = GOAL_PERIODS[index];

  return (
    <span ref={ref} className="block rounded-2xl border border-border bg-surface p-4 shadow-soft dark:bg-bg-subtle">
      <span className="flex items-center gap-4">
        <svg key={`r${index}`} viewBox="0 0 120 120" className="goal-rings h-24 w-24 shrink-0 sm:h-28 sm:w-28" aria-hidden="true">
          {period.goals.map((g, i) => (
            <GoalRing
              key={g.name}
              r={RING_RADII[i]}
              progress={g.progress}
              className={GOAL_TONES[g.tone].ring}
              active={inView}
            />
          ))}
        </svg>
        <span key={`t${index}`} className="chat-in block min-w-0">
          <span className="block text-[12px] text-fg-muted">{period.label}</span>
          <span className="mt-0.5 block text-[22px] font-semibold tracking-tight text-fg">{period.summary}</span>
          <span className="mt-1 block text-[12px] text-fg-muted">{period.note}</span>
        </span>
      </span>

      <span key={period.label} className="goal-list mt-4 flex flex-col gap-3 border-t border-border pt-4">
        {period.goals.map((g) => (
          <GoalRow key={g.name} goal={g} pace={period.pace} active={inView} />
        ))}
      </span>
    </span>
  );
}
