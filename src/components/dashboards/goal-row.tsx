"use client";

import { useCountTo } from "../use-count-to";
import { formatMetric } from "./format-metric";
import { GOAL_TONES, STATUS_PILLS, type Goal } from "./goal-periods";

export function GoalRow({ goal, pace, active }: { goal: Goal; pace: string; active: boolean }) {
  const current = useCountTo(active ? goal.current.value : 0, 1100);
  const flag = active || undefined;

  return (
    <span className="block">
      <span className="flex items-center gap-2 text-[13px]">
        <span className="truncate font-medium text-fg">{goal.name}</span>
        <span
          className={`goal-status shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_PILLS[goal.status]}`}
          data-active={flag}
        >
          {goal.status}
        </span>
        <span className="ml-auto shrink-0 text-[12px] tabular-nums text-fg-muted">
          {formatMetric(current, goal.current)} / {goal.target}
        </span>
      </span>
      <span className="relative mt-1.5 block h-1.5 overflow-hidden rounded-full bg-bg-subtle dark:bg-surface-raised">
        <span className={`goal-bar block h-full rounded-full ${goal.bar} ${GOAL_TONES[goal.tone].bar}`} data-active={flag} />
        <span className={`goal-pace absolute inset-y-0 w-px bg-fg-faint ${pace}`} data-active={flag} aria-hidden="true" />
      </span>
    </span>
  );
}
