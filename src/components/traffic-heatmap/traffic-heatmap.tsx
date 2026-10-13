import { grouped } from "@/lib/format";
import { DAYS, HEAT, heatPeak } from "./heatmap-data";

const W = 1200;
const LABEL = 48;
const TOP = 70;
const GAP = 4;
const CELL_H = 34;
const CELL_W = (W - LABEL - GAP * 23) / 24;
const AXIS = 22;
const H = TOP + DAYS.length * (CELL_H + GAP) + AXIS;
const BOX = { w: 132, h: 40 };

export function TrafficHeatmap() {
  const peak = heatPeak();
  const max = peak.views;
  const px = LABEL + peak.hour * (CELL_W + GAP);
  const py = TOP + peak.day * (CELL_H + GAP);
  const boxX = Math.min(px + CELL_W / 2 - BOX.w / 2, W - BOX.w);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="heatmap min-w-160" role="img" aria-label="Example heatmap of visits by weekday and hour, peaking on Tuesday mornings">
      {DAYS.map((day, d) => (
        <g key={day}>
          <text x={0} y={TOP + d * (CELL_H + GAP) + CELL_H / 2 + 4} className="heatmap-label">
            {day.slice(0, 3)}
          </text>
          {HEAT[d].map((views, h) => (
            <rect
              key={h}
              x={LABEL + h * (CELL_W + GAP)}
              y={TOP + d * (CELL_H + GAP)}
              width={CELL_W}
              height={CELL_H}
              rx={6}
              className="heatmap-cell stage-item"
              fillOpacity={0.06 + 0.94 * (views / max) ** 1.2}
              style={{ ["--i" as string]: d + h, ["--from-scale" as string]: 0.6 }}
            />
          ))}
        </g>
      ))}

      {Array.from({ length: 24 }, (_, h) =>
        h % 3 === 0 ? (
          <text key={h} x={LABEL + h * (CELL_W + GAP) + CELL_W / 2} y={H - 4} textAnchor="middle" className="heatmap-label">
            {String(h).padStart(2, "0")}:00
          </text>
        ) : null,
      )}

      <g className="map-callout" style={{ ["--i" as string]: 0 }}>
        <rect x={px} y={py} width={CELL_W} height={CELL_H} rx={6} className="heatmap-peak" />
        <path d={`M${px + CELL_W / 2},${py} L${px + CELL_W / 2},${BOX.h + 8}`} className="map-callout-line" stroke="var(--accent)" />
        <g transform={`translate(${boxX} 4)`}>
          <rect width={BOX.w} height={BOX.h} rx={7} className="map-callout-box" stroke="var(--accent)" />
          <circle cx={12} cy={14} r={3.6} fill="var(--accent)" />
          <text x={22} y={17.5} className="map-callout-name">
            {DAYS[peak.day]} {String(peak.hour).padStart(2, "0")}:00
          </text>
          <text x={22} y={33} className="map-callout-value">
            {grouped(peak.views)} views
          </text>
        </g>
      </g>
    </svg>
  );
}
