"use client";

import { useRef } from "react";
import { FlowCard } from "./hero-flow/flow-card";
import { FlowLinks } from "./hero-flow/flow-links";
import { useFlowPaths, type FlowEdge } from "./hero-flow/use-flow-paths";
import { FLOW_EVENTS, FLOW_OUTPUTS, FLOW_SOURCE } from "./hero-flow/flow-data";

const EDGES: FlowEdge[] = [
  { id: "in", from: FLOW_SOURCE.id, to: FLOW_EVENTS.id },
  ...FLOW_OUTPUTS.map((o) => ({ id: `out-${o.id}`, from: FLOW_EVENTS.id, to: o.id })),
];

const TONES = Object.fromEntries([FLOW_SOURCE, FLOW_EVENTS, ...FLOW_OUTPUTS].map((c) => [c.id, c.tone]));

export function HeroFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { paths, size } = useFlowPaths(ref, EDGES);

  return (
    <div ref={ref} className="hf" aria-hidden>
      <FlowLinks paths={paths} width={size.width} height={size.height} tones={TONES} />
      <div className="hf__col hf__col--center">
        <FlowCard card={FLOW_SOURCE} order={0} />
      </div>
      <div className="hf__col hf__col--center">
        <FlowCard card={FLOW_EVENTS} order={1} emphasis />
      </div>
      <div className="hf__col hf__outputs">
        {FLOW_OUTPUTS.map((card, i) => (
          <FlowCard key={card.id} card={card} order={i + 2} />
        ))}
      </div>
    </div>
  );
}
