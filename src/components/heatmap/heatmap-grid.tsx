import { DAYS, GRID, HOUR_TICKS, HOURS, levelOf, type Cell } from "./heatmap-data";

type Props = { active: Cell; onHover: (cell: Cell) => void; onLeave: () => void };

export function HeatmapGrid({ active, onHover, onLeave }: Props) {
  return (
    <div className="overflow-x-auto">
      <div className="hm-grid" role="img" aria-label="Example heatmap of visitors by weekday and hour" onPointerLeave={onLeave}>
        {GRID.map((row, day) => (
          <div key={DAYS[day]} className="contents">
            <span className="hm-day">{DAYS[day]}</span>
            {row.map((visitors, hour) => (
              <span
                key={hour}
                className={`hm-cell hm-l${levelOf(visitors)}`}
                data-active={(active.day === day && active.hour === hour) || undefined}
                onPointerEnter={() => onHover({ day, hour, visitors })}
              />
            ))}
          </div>
        ))}
        <span />
        {HOURS.map((h) => (
          <span key={h} className="hm-hour">
            {HOUR_TICKS.includes(h) ? `${String(h).padStart(2, "0")}:00` : ""}
          </span>
        ))}
      </div>
    </div>
  );
}
