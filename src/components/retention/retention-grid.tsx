import { grouped } from "@/lib/format";
import { COHORTS, WEEKS } from "./retention-data";

const W = 1200;
const LABEL = 220;
const HEAD = 34;
const GAP = 5;
const CELL_H = 46;
const CELL_W = (W - LABEL - GAP * (WEEKS - 1)) / WEEKS;
const H = HEAD + COHORTS.length * (CELL_H + GAP);

export function RetentionGrid() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="retention min-w-160" role="img" aria-label="Example weekly retention cohorts">
      <text x={0} y={18} className="retention-head">Cohort</text>
      <text x={LABEL - 24} y={18} textAnchor="end" className="retention-head">Visitors</text>
      {Array.from({ length: WEEKS }, (_, w) => (
        <text key={w} x={LABEL + w * (CELL_W + GAP) + CELL_W / 2} y={18} textAnchor="middle" className="retention-head">
          W{w}
        </text>
      ))}

      {COHORTS.map((cohort, c) => {
        const y = HEAD + c * (CELL_H + GAP);
        return (
          <g key={cohort.label}>
            <text x={0} y={y + CELL_H / 2 + 5} className="retention-label">
              {cohort.label}
            </text>
            <text x={LABEL - 24} y={y + CELL_H / 2 + 5} textAnchor="end" className="retention-size">
              {grouped(cohort.size)}
            </text>
            {cohort.retention.map((pct, w) => {
              const x = LABEL + w * (CELL_W + GAP);
              return (
                <g key={w} className="stage-item" style={{ ["--i" as string]: c + w, ["--stagger" as string]: "45ms", ["--from-scale" as string]: 0.7 }}>
                  <rect x={x} y={y} width={CELL_W} height={CELL_H} rx={8} className="retention-cell" fillOpacity={0.1 + 0.8 * (pct / 100)} />
                  <text x={x + CELL_W / 2} y={y + CELL_H / 2 + 5} textAnchor="middle" className={pct >= 55 ? "retention-pct retention-pct--strong" : "retention-pct"}>
                    {pct}%
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
