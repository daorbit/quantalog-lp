import { Check, Clock3, Globe, Video } from "lucide-react";
import { BOOKING, OPEN_DAYS, PICKED_SLOT, SELECTED_DAY, SLOTS, TODAY, WEEKDAYS, BOOKING_MONTH, monthCells } from "./booking-data";

const delay = (seconds: number, i = 0, stagger = 0) =>
  ({ ["--delay" as string]: `${seconds}s`, ["--i" as string]: i, ["--stagger" as string]: `${stagger}ms` }) as React.CSSProperties;

export function BookingPage() {
  const cells = monthCells();

  return (
    <div className="bm-panel">
      <div className="flex items-center gap-4 border-b border-border px-4 py-3 text-[12.5px] font-medium text-fg-muted">
        <span className="flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5" />
          {BOOKING.duration}
        </span>
        <span className="flex items-center gap-1.5">
          <Video className="h-3.5 w-3.5" />
          Google Meet
        </span>
        <span className="stage-item ml-auto flex items-center gap-1.5 font-semibold text-fg" style={delay(2.2)}>
          <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.6} />
          Fri 16 · {PICKED_SLOT}
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_7.5rem]">
        <div className="p-4">
          <p className="mb-3 text-[13px] font-semibold">Select a date &amp; time</p>
          <p className="mb-2 text-center text-[12px] font-semibold">{BOOKING_MONTH.label}</p>
          <div className="grid grid-cols-7 justify-items-center gap-y-1">
            {WEEKDAYS.map((d, i) => (
              <span key={i} className="pb-1 text-[10px] font-semibold uppercase text-fg-faint">
                {d}
              </span>
            ))}
            {cells.map((day, i) =>
              day === null ? (
                <span key={`e${i}`} />
              ) : (
                <span
                  key={day}
                  className="bm-day stage-item"
                  data-open={OPEN_DAYS.has(day) || undefined}
                  data-today={day === TODAY || undefined}
                  style={delay(0.25, i, 10)}
                >
                  {day}
                  {day === SELECTED_DAY && (
                    <span className="bm-day-pick stage-item" style={{ ...delay(0.95), ["--from-scale" as string]: 0.3 }}>
                      {day}
                    </span>
                  )}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="border-l border-border p-3">
          <p className="mb-3 text-[11.5px] font-semibold leading-tight">Fri, Oct 16</p>
          <div className="space-y-1.5">
            {SLOTS.map((slot, i) =>
              slot === PICKED_SLOT ? (
                <div key={slot} className="stage-item grid grid-cols-2 gap-1" style={delay(1.75)}>
                  <span className="bm-slot bm-slot--picked">{slot}</span>
                  <span className="bm-slot bm-slot--confirm">Confirm</span>
                </div>
              ) : (
                <span key={slot} className="bm-slot stage-item" style={delay(1.15, i, 70)}>
                  {slot}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 border-t border-border px-4 py-2.5 text-[11.5px] text-fg-faint">
        <Globe className="h-3.5 w-3.5" />
        {BOOKING.zone}
      </div>
    </div>
  );
}
