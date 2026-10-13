"use client";

import { getSmoothStepPath, type EdgeProps } from "@xyflow/react";
import { useReducedMotion } from "../use-reduced-motion";

export const PACKET_START = 1.8;

const STAGES = {
  0: {
    points: "0;1;1",
    times: "0;0.32;1",
    opacity: "0;1;1;0;0",
    opacityTimes: "0;0.03;0.3;0.33;1",
  },
  1: {
    points: "0;0;1;1",
    times: "0;0.34;0.64;1",
    opacity: "0;0;1;1;0;0",
    opacityTimes: "0;0.33;0.36;0.62;0.66;1",
  },
} as const;

function Packet({ path, stage, radius, opacity }: { path: string; stage: (typeof STAGES)[0 | 1]; radius: number; opacity: number }) {
  return (
    <circle r={radius} fill="var(--accent)" opacity="0">
      <animateMotion
        dur="3s"
        begin={`${PACKET_START}s`}
        repeatCount="indefinite"
        path={path}
        calcMode="spline"
        keyPoints={stage.points}
        keyTimes={stage.times}
        keySplines={stage.points.split(";").slice(1).map(() => "0.45 0 0.25 1").join(";")}
      />
      <animate
        attributeName="opacity"
        dur="3s"
        begin={`${PACKET_START}s`}
        repeatCount="indefinite"
        values={stage.opacity.split(";").map((v) => String(Number(v) * opacity)).join(";")}
        keyTimes={stage.opacityTimes}
      />
    </circle>
  );
}

export function FlowEdge({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) {
  const reduced = useReducedMotion();
  const [path] = getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, borderRadius: 12 });
  const stage = STAGES[data?.stage === 1 ? 1 : 0];

  return (
    <>
      <path d={path} pathLength={1} className="hero-edge__base" style={{ ["--i" as string]: Number(data?.order ?? 0) }} />
      {!reduced && (
        <>
          <Packet path={path} stage={stage} radius={7} opacity={0.18} />
          <Packet path={path} stage={stage} radius={3.5} opacity={1} />
        </>
      )}
    </>
  );
}
