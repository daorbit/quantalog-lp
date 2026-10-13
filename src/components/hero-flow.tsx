"use client";

import { ReactFlow, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { FlowCard } from "./hero-flow/flow-card";
import { FlowEdge } from "./hero-flow/flow-edge";
import { FLOW_EDGES, FLOW_NODES } from "./hero-flow/flow-data";

const nodeTypes = { card: FlowCard };
const edgeTypes = { pulse: FlowEdge };

const FIT_VIEW = { padding: 0.04, maxZoom: 1.45 };

const NODE_EXTENT: [[number, number], [number, number]] = [
  [-160, -180],
  [960, 620],
];

export function HeroFlow({ compact = false }: { compact?: boolean }) {
  return (
    <ReactFlowProvider>
      <div className="hero-flow-static h-full w-full" aria-hidden={compact || undefined}>
        <ReactFlow
          nodes={FLOW_NODES}
          edges={FLOW_EDGES}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={FIT_VIEW}
          nodeExtent={NODE_EXTENT}
          nodesDraggable={false}
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
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
        />
      </div>
    </ReactFlowProvider>
  );
}
