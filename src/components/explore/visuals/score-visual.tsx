"use client";

import { useCycle } from "../../use-cycle";
import { useCountTo } from "../../use-count-to";

const states = [
  { label: "Before fix", score: 72 },
  { label: "After fix", score: 96 },
];

export function ScoreVisual() {
  const { ref, index, inView } = useCycle<HTMLDivElement>(states.length, 3600);
  const state = states[index];
  const score = useCountTo(inView ? state.score : 0, 1200);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative h-44 w-44 sm:h-60 sm:w-60">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="9" />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="9"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="100"
            className="score-ring"
            data-state={inView ? (index === 0 ? "before" : "after") : undefined}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[3.25rem] font-semibold leading-none tracking-[-0.05em] tabular-nums text-fg sm:text-[4rem]">
            {score}
          </span>
          <span className="mt-1 text-[14px] text-fg-muted">Lighthouse score</span>
        </div>
      </div>
      <p
        key={state.label}
        className="chat-in mt-5 rounded-full bg-surface px-4 py-1.5 text-[13px] font-medium text-fg shadow-soft ring-1 ring-border dark:bg-bg-subtle"
      >
        {state.label}
      </p>
    </div>
  );
}
