"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
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

/* The hero graph is the product's own pipeline: one script tag, cookieless
   events, and the three surfaces that read from them. It is draggable because
   a visitor who moves a node has touched the product's central metaphor before
   reading a word of copy. */

type CardData = {
  title: string;
  icon: "code" | "shield" | "gauge" | "search" | "mail" | "activity";
  /** Rendered inside the card body — a small proof, not a paragraph. */
  rows?: { label: string; value: string }[];
  note?: string;
  accent?: boolean;
  /** Which sides carry edges, so unused handles are not rendered at all. */
  target?: boolean;
  source?: boolean;
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
      className={`w-[212px] overflow-hidden rounded-xl border bg-bg-subtle/95 backdrop-blur transition-shadow duration-200 hover:shadow-lg ${
        data.accent ? "border-accent/50" : "border-border"
      }`}
    >
      {data.target && (
        <Handle type="target" position={Position.Left} className="h-1.5! w-1.5! border-0! bg-border-strong!" />
      )}

      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Icon className={`h-3.5 w-3.5 ${data.accent ? "text-accent" : "text-fg-faint"}`} />
        <span className="text-[11px] font-medium tracking-wide text-fg">{data.title}</span>
      </div>

      <div className="px-3 py-2.5">
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
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 12,
  });

  const delay = typeof data?.delay === "number" ? data.delay : 0;

  return (
    <>
      <BaseEdge
        path={path}
        markerEnd={markerEnd}
        style={{
          stroke: "var(--border-strong)",
          strokeWidth: 1.5,
          strokeDasharray: "4 5",
        }}
        className="hero-edge__base"
      />
      <path
        d={path}
        fill="none"
        pathLength={1}
        className="hero-edge__pulse"
        style={{ animationDelay: `${delay}s` }}
      />
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
    position: { x: 280, y: 40 },
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
    } satisfies CardData,
  },
  {
    id: "live",
    type: "card",
    position: { x: 580, y: 0 },
    data: {
      title: "Live dashboard",
      icon: "activity",
      rows: [
        { label: "Online now", value: "48" },
        { label: "Views today", value: "12.4k" },
      ],
      target: true,
    } satisfies CardData,
  },
  {
    id: "seo",
    type: "card",
    position: { x: 580, y: 150 },
    data: {
      title: "SEO audits",
      icon: "search",
      rows: [
        { label: "Health score", value: "92" },
        { label: "Issues open", value: "3" },
      ],
      target: true,
    } satisfies CardData,
  },
  {
    id: "reports",
    type: "card",
    position: { x: 580, y: 290 },
    data: {
      title: "Email reports",
      icon: "mail",
      rows: [
        { label: "Schedule", value: "Weekly" },
        { label: "Recipients", value: "6" },
      ],
      target: true,
    } satisfies CardData,
  },
];

 
const initialEdges: Edge[] = [
  { id: "e1", type: "pulse", source: "script", target: "events", data: { delay: 0 } },
  { id: "e2", type: "pulse", source: "events", target: "live", data: { delay: 0.5 } },
  { id: "e3", type: "pulse", source: "events", target: "seo", data: { delay: 1 } },
  { id: "e4", type: "pulse", source: "events", target: "reports", data: { delay: 1.5 } },
];

 
const NODE_EXTENT: [[number, number], [number, number]] = [
  [-160, -140],
  [960, 480],
];
 
export function HeroFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const edges = useMemo(() => initialEdges, []);
  const noop = useCallback(() => {}, []);

  return (
    <div className="h-[380px] w-full lg:h-[520px]" aria-hidden>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onConnect={noop}
        fitView
        fitViewOptions={{ padding: 0.08 }}
        nodeExtent={NODE_EXTENT}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        edgesFocusable={false}
        minZoom={0.4}
        maxZoom={1.6}
        panOnDrag={false}
        panOnScroll={false}
        /* Wheel and double-click stay off — the canvas sits inside a scrolling
           page, and a wheel that zooms the graph instead of moving the page is
           the fastest way to make a marketing page feel broken. The buttons
           are the deliberate way in, and pinch is unambiguous on a trackpad. */
        zoomOnScroll={false}
        zoomOnPinch
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="var(--border)" />
        {/* Zoom and fit only. The interactivity lock is left out: dragging a
            node is the point of the graph, so a control that disables it has
            nothing to offer here. */}
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>
    </div>
  );
}
