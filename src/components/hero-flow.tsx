import { FlowCard } from "./hero-flow/flow-card";
import { FanLinks, StraightLink } from "./hero-flow/flow-links";
import { FLOW_EVENTS, FLOW_OUTPUTS, FLOW_SOURCE } from "./hero-flow/flow-data";

export function HeroFlow() {
  return (
    <div className="hf" aria-hidden>
      <div className="hf__source">
        <FlowCard card={FLOW_SOURCE} order={0} />
      </div>
      <div className="hf__gap">
        <StraightLink />
      </div>
      <div className="hf__events">
        <FlowCard card={FLOW_EVENTS} order={1} emphasis />
      </div>
      <div className="hf__fan">
        <FanLinks tones={FLOW_OUTPUTS.map((o) => o.tone)} />
      </div>
      <div className="hf__outputs">
        {FLOW_OUTPUTS.map((card, i) => (
          <div key={card.id} className="hf__slot">
            <FlowCard card={card} order={i + 2} />
          </div>
        ))}
      </div>
    </div>
  );
}
