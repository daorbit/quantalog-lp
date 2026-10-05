"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Handle,
  Position,
  BaseEdge,
  getSmoothStepPath,
  useNodesState,
  type Node,
  type NodeProps,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Activity, Code2, Gauge, Mail, Search, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "./use-reduced-motion";

type CardData = {
  title: string;
  icon: "code" | "shield" | "gauge" | "search" | "mail" | "activity";

  rows?: { label: string; value: string }[];
  note?: string;
  accent?: boolean;

  target?: boolean;
  source?: boolean;

  flare?: "events" | "output";
};

const ICONS = {
  code: Code2,
  shield: ShieldCheck,
  gauge: Gauge,
  search: Search,
  mail: Mail,
  activity: Activity,
};

function FlowCard({ data }: NodeProps & { data: CardData }) {
  const Icon = ICONS[data.icon];

  return (
    <div
      className={`hero-card relative w-55 overflow-hidden rounded-[14px] border ${
        data.accent ? "border-accent/45" : "border-border"
      }`}
    >
      {data.flare && (
        <span aria-hidden className={`hero-card__flare hero-card__flare--${data.flare}`} />
      )}
      {data.target && (
        <Handle type="target" position={Position.Left} className="h-1.5! w-1.5! border-0! bg-border-strong!" />
      )}

      <div className="flex items-center gap-2 border-b border-hairline px-3.5 py-2.5">
        <span
          className={`grid h-5 w-5 place-items-center rounded-md ${
            data.accent ? "bg-accent/12 text-accent" : "bg-bg-subtle text-fg-muted"
          }`}
        >
          <Icon className="h-3 w-3" />
        </span>
        <span className="text-[11.5px] font-semibold tracking-[-0.005em] text-fg">{data.title}</span>
      </div>

      <div className="px-3.5 py-2.5">
        {data.rows?.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-3 py-[3px]">
            <span className="text-[10.5px] text-fg-faint">{row.label}</span>
            <span className="text-[11px] font-medium tabular-nums text-fg">{row.value}</span>
          </div>
        ))}
        {data.note && (
          <p className="font-mono text-[10.5px] leading-relaxed text-fg-muted">{data.note}</p>
        )}
      </div>

      {data.source && (
        <Handle type="source" position={Position.Right} className="h-1.5! w-1.5! border-0! bg-border-strong!" />
      )}
    </div>
  );
}

const nodeTypes = { card: FlowCard };

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

function PulseEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
}: EdgeProps) {
  const reduced = useReducedMotion();
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 12,
  });

  const stage = STAGES[data?.stage === 1 ? 1 : 0];

  return (
    <>
      <BaseEdge path={path} markerEnd={markerEnd} className="hero-edge__base" />
      {!reduced && (
        <circle r="3.5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="1.5" opacity="0">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={path}
            calcMode="linear"
            keyPoints={stage.points}
            keyTimes={stage.times}
          />
          <animate
            attributeName="opacity"
            dur="3s"
            repeatCount="indefinite"
            values={stage.opacity}
            keyTimes={stage.opacityTimes}
          />
        </circle>
      )}
    </>
  );
}

const edgeTypes = { pulse: PulseEdge };

const initialNodes: Node[] = [
  {
    id: "script",
    type: "card",
    position: { x: 0, y: 120 },
    data: {
      title: "One script tag",
      icon: "code",
      note: '<script src="quantalog.js" defer />',
      source: true,
    } satisfies CardData,
  },
  {
    id: "events",
    type: "card",
    position: { x: 270, y: 40 },
    data: {
      title: "Cookieless events",
      icon: "shield",
      rows: [
        { label: "Cookies set", value: "0" },
        { label: "Consent banner", value: "none" },
        { label: "Visitors counted", value: "100%" },
      ],
      accent: true,
      target: true,
      source: true,
      flare: "events",
    } satisfies CardData,
  },
  {
    id: "live",
    type: "card",
    position: { x: 540, y: 0 },
    data: {
      title: "Live dashboard",
      icon: "activity",
      rows: [
        { label: "Online now", value: "48" },
        { label: "Views today", value: "12.4k" },
      ],
      target: true,
      flare: "output",
    } satisfies CardData,
  },
  {
    id: "seo",
    type: "card",
    position: { x: 540, y: 150 },
    data: {
      title: "SEO audits",
      icon: "search",
      rows: [
        { label: "Health score", value: "92" },
        { label: "Issues open", value: "3" },
      ],
      target: true,
      flare: "output",
    } satisfies CardData,
  },
  {
    id: "reports",
    type: "card",
    position: { x: 540, y: 290 },
    data: {
      title: "Email reports",
      icon: "mail",
      rows: [
        { label: "Schedule", value: "Weekly" },
        { label: "Recipients", value: "6" },
      ],
      target: true,
      flare: "output",
    } satisfies CardData,
  },
];

const initialEdges: Edge[] = [
  { id: "e1", type: "pulse", source: "script", target: "events", data: { stage: 0 } },
  { id: "e2", type: "pulse", source: "events", target: "live", data: { stage: 1 } },
  { id: "e3", type: "pulse", source: "events", target: "seo", data: { stage: 1 } },
  { id: "e4", type: "pulse", source: "events", target: "reports", data: { stage: 1 } },
];

const FIT_VIEW = { padding: 0.06, maxZoom: 1.1 };

const NODE_EXTENT: [[number, number], [number, number]] = [
  [-160, -140],
  [960, 480],
];

export function HeroFlow({ compact = false }: { compact?: boolean }) {
  return (
    <ReactFlowProvider>
      <HeroFlowInner compact={compact} />
    </ReactFlowProvider>
  );
}

function HeroFlowInner({ compact }: { compact: boolean }) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const edges = useMemo(() => initialEdges, []);
  const noop = useCallback(() => {}, []);

  return (
    <div className="h-full w-full" aria-hidden={compact || undefined}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onConnect={noop}
        fitView
        fitViewOptions={FIT_VIEW}
        nodeExtent={NODE_EXTENT}
        nodesDraggable={!compact}
        nodesConnectable={false}
        elementsSelectable={false}

        nodesFocusable={false}
        edgesFocusable={false}
        disableKeyboardA11y
        minZoom={0.4}
        maxZoom={1.6}
        panOnDrag={false}
        panOnScroll={false}

        zoomOnScroll={false}
        zoomOnPinch
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
      </ReactFlow>
    </div>
  );
}
