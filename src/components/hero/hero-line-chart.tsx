import { linePath, plot } from "@/lib/chart-path";
import { AXIS, PREVIOUS, SERIES } from "./hero-data";

const W = 600;
const H = 160;
const GRID = [0.25, 0.5, 0.75];

export function HeroLineChart() {
  const max = Math.max(...SERIES) * 1.1;
  const current = plot(SERIES, W, H, max, 4);
  const previous = plot(PREVIOUS, W, H, max, 4);
  const [lx, ly] = current[current.length - 1];

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible">
        {GRID.map((g) => (
          <line
            key={g}
            x1="0"
            x2={W}
            y1={H * g}
            y2={H * g}
            stroke="var(--border)"
            strokeDasharray="2 4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path
          className="hero-ghost"
          d={linePath(previous)}
          fill="none"
          stroke="var(--fg-faint)"
          strokeOpacity="0.45"
          strokeWidth="1.25"
          strokeDasharray="3 4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="hero-draw"
          d={linePath(current)}
          pathLength={1}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle className="hero-dot" cx={lx} cy={ly} r="4" fill="var(--accent)" stroke="var(--surface)" strokeWidth="2" />
      </svg>
      <div className="mt-2 flex justify-between text-[10.5px] text-fg-faint">
        {AXIS.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
    </div>
  );
}
