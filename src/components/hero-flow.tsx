"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  useNodesState,
  type Node,
  type NodeProps,
  type Edge,
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

const EDGE_BASE = {
  type: "smoothstep" as const,
  style: { stroke: "var(--border-strong)", strokeWidth: 1.5, strokeDasharray: "5 5" },
};

const initialEdges: Edge[] = [
  { id: "e1", source: "script", target: "events", animated: true, ...EDGE_BASE },
  { id: "e2", source: "events", target: "live", animated: true, ...EDGE_BASE },
  { id: "e3", source: "events", target: "seo", ...EDGE_BASE },
  { id: "e4", source: "events", target: "reports", ...EDGE_BASE },
];

/**
 * The hero's interactive diagram. Panning and zooming are off: the canvas sits
 * inside a scrolling page, and a wheel that zooms the graph instead of moving
 * the page is the fastest way to make a marketing page feel broken. Dragging a
 * node is the only interaction, which is the one worth having.
 */
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
        onNodesChange={onNodesChange}
        onConnect={noop}
        fitView
        fitViewOptions={{ padding: 0.04 }}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        edgesFocusable={false}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="var(--border)" />
      </ReactFlow>
    </div>
  );
}
