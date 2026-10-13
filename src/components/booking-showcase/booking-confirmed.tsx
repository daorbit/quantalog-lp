import { CalendarCheck, Check, RotateCcw, Video } from "lucide-react";
import { BOOKING, longDay, slotRange } from "./booking-data";

type Props = { day: number; slot: string; onReset: () => void };

export function BookingConfirmed({ day, slot, onReset }: Props) {
  return (
    <div className="bm-confirmed">
      <span className="bm-confirmed-check">
        <Check className="h-7 w-7" strokeWidth={2.6} />
      </span>
      <p className="mt-5 text-[22px] font-semibold tracking-[-0.02em]">You&rsquo;re booked</p>
      <p className="mt-1 text-[14px] text-fg-muted">A calendar invite is on its way to your inbox.</p>

      <div className="mt-6 w-full max-w-xs space-y-2 text-left">
        <p className="bm-confirmed-row">
          <CalendarCheck className="h-4 w-4 shrink-0 text-accent" />
          <span>
            <span className="block font-semibold">{longDay(day)}</span>
            <span className="text-fg-faint">
              {slotRange(slot)} · {BOOKING.zone}
            </span>
          </span>
        </p>
        <p className="bm-confirmed-row">
          <Video className="h-4 w-4 shrink-0 text-accent" />
          <span className="font-medium">Google Meet link added</span>
        </p>
      </div>

      <button type="button" className="bm-reset" onClick={onReset}>
        <RotateCcw className="h-3.5 w-3.5" />
        Pick another time
      </button>
    </div>
  );
}
