import { ChevronLeft, ChevronRight } from "lucide-react";
import { BOOKING_MONTH, OPEN_DAYS, TODAY, WEEKDAYS, longDay, monthCells } from "./booking-data";

type Props = { day: number; cueDay?: number; onPick: (day: number) => void };

export function BookingCalendar({ day: selected, cueDay, onPick }: Props) {
  const cells = monthCells();

  return (
    <div className="p-6">
      <p className="text-[15px] font-semibold tracking-[-0.01em]">Select a date &amp; time</p>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-[13px] font-semibold">{BOOKING_MONTH.label}</p>
        <div className="flex gap-1 text-fg-faint" aria-hidden="true">
          <span className="bm-nav">
            <ChevronLeft className="h-4 w-4" />
          </span>
          <span className="bm-nav">
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-7 justify-items-center gap-y-1.5">
        {WEEKDAYS.map((d) => (
          <span key={d} className="pb-1 text-[10.5px] font-semibold uppercase tracking-wide text-fg-faint">
            {d}
          </span>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <span key={`e${i}`} />;
          const today = day === TODAY || undefined;
          return OPEN_DAYS.has(day) ? (
            <button
              key={day}
              type="button"
              className="bm-day bm-day--open"
              data-today={today}
              data-cue={day === cueDay || undefined}
              aria-pressed={day === selected}
              aria-label={longDay(day)}
              onClick={() => onPick(day)}
            >
              {day}
            </button>
          ) : (
            <span key={day} className="bm-day" data-today={today}>
              {day}
            </span>
          );
        })}
      </div>
    </div>
  );
}
