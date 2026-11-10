import type { FlowTone } from "./flow-data";

const FAN_TARGETS = [12.5, 37.5, 62.5, 87.5];

function Link({ d, tone, index }: { d: string; tone: FlowTone; index: number }) {
  return (
    <g className="hf-link" data-tone={tone} data-index={index}>
      <path d={d} pathLength={1} className="hf-link__base" vectorEffect="non-scaling-stroke" />
      <path d={d} pathLength={100} className="hf-link__packet" vectorEffect="non-scaling-stroke" />
    </g>
  );
}

export function StraightLink() {
  return (
    <svg className="hf-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <Link d="M0 50 L100 50" tone="accent" index={0} />
    </svg>
  );
}

export function FanLinks({ tones }: { tones: FlowTone[] }) {
  return (
    <svg className="hf-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      {FAN_TARGETS.map((y, i) => (
        <Link key={y} d={`M0 50 C 55 50, 45 ${y}, 100 ${y}`} tone={tones[i] ?? "accent"} index={i + 1} />
      ))}
    </svg>
  );
}
