"use client";

import { useState } from "react";
import { grouped } from "@/lib/format";
import { DAY_NAMES, LEVELS, hourRange, type Cell } from "./heatmap-data";
import { HeatmapGrid } from "./heatmap-grid";

export function HeatmapView({ peak }: { peak: Cell }) {
  const [hovered, setHovered] = useState<Cell | null>(null);
  const cell = hovered ?? peak;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="text-[15px] text-fg-muted">
          <span className="font-semibold text-fg">{DAY_NAMES[cell.day]}</span> · {hourRange(cell.hour)}
          <span className="ml-3 font-semibold tabular-nums text-fg">{grouped(cell.visitors)}</span> visitors
        </p>
        <div className="flex items-center gap-2 text-[12px] text-fg-faint">
          Less
          <span className="flex gap-1">
            {Array.from({ length: LEVELS }, (_, l) => (
              <span key={l} className={`hm-swatch hm-l${l}`} />
            ))}
          </span>
          More
        </div>
      </div>

      <div className="mt-5">
        <HeatmapGrid active={cell} onHover={setHovered} onLeave={() => setHovered(null)} />
      </div>
    </div>
  );
}
