import { CalendarCheck, Check, Video } from "lucide-react";
import { BOOKING } from "./booking-data";

export function BookingConfirmed() {
  return (
    <div className="bm-panel flex flex-col items-center px-6 py-8 text-center">
      <span className="bm-check stage-item grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-fg" style={{ ["--delay" as string]: "2.6s", ["--from-scale" as string]: 0.4 }}>
        <Check className="h-6 w-6" strokeWidth={2.6} />
      </span>
      <p className="mt-4 text-[17px] font-semibold tracking-[-0.01em]">You&rsquo;re booked</p>
      <p className="mt-1 text-[13px] text-fg-muted">{BOOKING.title} with Quantalog</p>

      <div className="mt-5 w-full space-y-2 text-left">
        <p className="flex items-center gap-2.5 rounded-xl border border-border px-3 py-2.5 text-[13px]">
          <CalendarCheck className="h-4 w-4 shrink-0 text-accent" />
          <span>
            <span className="block font-medium">{BOOKING.when}</span>
            <span className="text-fg-faint">{BOOKING.range}</span>
          </span>
        </p>
        <p className="flex items-center gap-2.5 rounded-xl border border-border px-3 py-2.5 text-[13px]">
          <Video className="h-4 w-4 shrink-0 text-accent" />
          <span className="truncate text-fg-muted">{BOOKING.meet}</span>
        </p>
      </div>
      <p className="mt-4 text-[12px] text-fg-faint">A calendar invite is on its way.</p>
    </div>
  );
}
