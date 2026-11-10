import type { FlowTone } from "./flow-data";
import type { FlowPath } from "./use-flow-paths";

export function FlowLinks({
  paths,
  width,
  height,
  tones,
}: {
  paths: FlowPath[];
  width: number;
  height: number;
  tones: Record<string, FlowTone>;
}) {
  if (!width || !height) return null;
  return (
    <svg className="hf-links" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      {paths.map((path, i) => (
        <g key={path.id} className="hf-link" data-tone={tones[path.target] ?? "accent"} data-index={i}>
          <path d={path.d} pathLength={1} className="hf-link__base" />
          <path d={path.d} pathLength={100} className="hf-link__packet" />
        </g>
      ))}
    </svg>
  );
}
