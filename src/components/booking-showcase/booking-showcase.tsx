"use client";

import { BookingWindow } from "./booking-window";
import { BookingSteps } from "./booking-steps";
import { useBookingDemo } from "./use-booking-demo";

export function BookingShowcase() {
  const demo = useBookingDemo();

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
      <BookingWindow demo={demo} />
      <div className="lg:pt-6">
        <p className="mb-6 text-[12px] font-semibold uppercase tracking-wide text-fg-faint">Try it, this is the real flow</p>
        <BookingSteps demo={demo} />
      </div>
    </div>
  );
}
