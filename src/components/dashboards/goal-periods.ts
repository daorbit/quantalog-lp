import type { Metric } from "./format-metric";

export type GoalTone = "accent" | "amber" | "blue";
export type GoalStatus = "On pace" | "Behind" | "Hit";

export type Goal = {
  name: string;
  current: Metric;
  target: string;
  progress: number;
  bar: string;
  status: GoalStatus;
  tone: GoalTone;
};

export type GoalPeriod = {
  label: string;
  summary: string;
  note: string;
  pace: string;
  goals: Goal[];
};

export const GOAL_TONES: Record<GoalTone, { ring: string; bar: string }> = {
  accent: { ring: "stroke-accent", bar: "bg-accent" },
  amber: { ring: "stroke-[#f59e0b]", bar: "bg-[#f59e0b]" },
  blue: { ring: "stroke-[#3b82f6]", bar: "bg-[#3b82f6]" },
};

export const RING_RADII = [52, 40, 28];

export const GOAL_PERIODS: GoalPeriod[] = [
  {
    label: "This month",
    summary: "2 of 3",
    note: "Day 21 of 30 · the line marks today's pace",
    pace: "left-[70%]",
    goals: [
      {
        name: "Monthly visitors",
        current: { value: 412, decimals: 1, suffix: "k" },
        target: "50k",
        progress: 82,
        bar: "w-[82%]",
        status: "On pace",
        tone: "accent",
      },
      {
        name: "Q4 signups",
        current: { value: 312 },
        target: "500",
        progress: 62,
        bar: "w-[62%]",
        status: "Behind",
        tone: "amber",
      },
      {
        name: "Demo requests",
        current: { value: 128 },
        target: "120",
        progress: 100,
        bar: "w-full",
        status: "Hit",
        tone: "blue",
      },
    ],
  },
  {
    label: "This quarter",
    summary: "3 of 3",
    note: "Week 9 of 13 · the line marks today's pace",
    pace: "left-[69%]",
    goals: [
      {
        name: "Quarterly visitors",
        current: { value: 1086, decimals: 1, suffix: "k" },
        target: "150k",
        progress: 72,
        bar: "w-[72%]",
        status: "On pace",
        tone: "accent",
      },
      {
        name: "Q4 signups",
        current: { value: 1080 },
        target: "1,500",
        progress: 72,
        bar: "w-[72%]",
        status: "On pace",
        tone: "amber",
      },
      {
        name: "Demo requests",
        current: { value: 362 },
        target: "360",
        progress: 100,
        bar: "w-full",
        status: "Hit",
        tone: "blue",
      },
    ],
  },
];
