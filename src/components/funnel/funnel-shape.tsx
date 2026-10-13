import { grouped } from "@/lib/format";
import { funnelRows } from "./funnel-data";

const W = 1200;
const ROW_H = 84;
const GUTTER = 300;
const MIN_WIDTH = 0.05;
const SHAPE_W = W - GUTTER * 2;
const CX = W / 2;

function stepColor(i: number, drop: number) {
  if (i === 0) return "var(--accent)";
  if (drop < 30) return "#10b981";
  if (drop < 60) return "#f59e0b";
  return "#f43f5e";
}

export function FunnelShape() {
  const rows = funnelRows();
  const top = rows[0].count;
  const width = (count: number) => Math.max(MIN_WIDTH, count / top) * SHAPE_W;

  return (
    <svg viewBox={`0 0 ${W} ${rows.length * ROW_H}`} className="funnel min-w-160" role="img" aria-label="Example signup funnel from the pricing page to the first dashboard">
      {rows.map((row, i) => {
        const next = rows[i + 1];
        const topHalf = width(row.count) / 2;
        const botHalf = width(next ? next.count : row.count) / 2;
        const y0 = i * ROW_H;
        const y1 = y0 + ROW_H - 4;
        const mid = (y0 + y1) / 2;
        const color = stepColor(i, row.drop);
        const points = [
          [CX - topHalf, y0],
          [CX + topHalf, y0],
          [CX + botHalf, y1],
          [CX - botHalf, y1],
        ]
          .map((p) => p.join(","))
          .join(" ");

        return (
          <g key={row.label}>
            <polygon
              points={points}
              fill={color}
              fillOpacity={0.2}
              stroke={color}
              strokeWidth={1}
              className="stage-item"
              style={{ ["--i" as string]: i, ["--stagger" as string]: "160ms", ["--from-scale" as string]: "0.1, 1" }}
            />
            <g className="stage-item" style={{ ["--i" as string]: i, ["--stagger" as string]: "160ms", ["--delay" as string]: "0.3s" }}>
              <text x={GUTTER - 20} y={mid - 3} textAnchor="end" className="funnel-step">
                {i + 1}. {row.label}
              </text>
              <text x={GUTTER - 20} y={mid + 15} textAnchor="end" className="funnel-meta">
                {row.rate}% of visitors
              </text>
              <text x={CX} y={mid + 6} textAnchor="middle" className="funnel-count">
                {grouped(row.count)}
              </text>
              {i > 0 && (
                <text x={W - GUTTER + 20} y={mid + 5} className="funnel-drop" fill={color}>
                  −{row.drop}%
                </text>
              )}
            </g>
          </g>
        );
      })}
    </svg>
  );
}
