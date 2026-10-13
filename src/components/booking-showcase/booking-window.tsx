import { Lock } from "lucide-react";
import { HOST } from "./booking-data";
import { BookingHost } from "./booking-host";
import { BookingCalendar } from "./booking-calendar";
import { BookingSlots } from "./booking-slots";
import { BookingConfirmed } from "./booking-confirmed";
import type { BookingDemo } from "./use-booking-demo";

export function BookingWindow({ demo }: { demo: BookingDemo }) {
  const { day, slot, slots, confirmed, pickDay, pickSlot, confirm, reset } = demo;

  return (
    <div className="bm-window">
      <div className="bm-window-bar">
        <span className="bm-url">
          <Lock className="h-3 w-3" />
          {HOST.url}
        </span>
      </div>
      <div className="grid lg:grid-cols-[15rem_minmax(0,1fr)]">
        <BookingHost />
        <div className="bm-pane">
          {confirmed && slot ? (
            <BookingConfirmed day={day} slot={slot} onReset={reset} />
          ) : (
            <div className="grid sm:grid-cols-[minmax(0,1fr)_11rem]">
              <BookingCalendar day={day} onPick={pickDay} />
              <BookingSlots day={day} slots={slots} slot={slot} onPick={pickSlot} onConfirm={confirm} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
