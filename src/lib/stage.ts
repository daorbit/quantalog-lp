import type { CSSProperties } from "react";

type StageOptions = {
  delay?: number;
  i?: number;
  stagger?: number;
  fromX?: string;
  fromY?: string;
  fromScale?: number | string;
};

export function stageStyle({ delay = 0, i = 0, stagger = 0, fromX, fromY, fromScale }: StageOptions = {}): CSSProperties {
  return {
    ["--delay" as string]: `${delay}s`,
    ["--i" as string]: i,
    ["--stagger" as string]: `${stagger}ms`,
    ...(fromX ? { ["--from-x" as string]: fromX } : {}),
    ...(fromY ? { ["--from-y" as string]: fromY } : {}),
    ...(fromScale !== undefined ? { ["--from-scale" as string]: fromScale } : {}),
  };
}
