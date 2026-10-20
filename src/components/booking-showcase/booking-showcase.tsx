"use client";

import { useRef } from "react";
import { BookingWindow } from "./booking-window";
import { BookingSteps } from "./booking-steps";
import { useBookingDemo } from "./use-booking-demo";
import { useBookingAutoplay } from "./use-booking-autoplay";

export function BookingShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { demo, cue, playing } = useBookingAutoplay(useBookingDemo(), ref);

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
      <div ref={ref} className="min-w-0">
        <BookingWindow demo={demo} cue={cue} />
      </div>
      <div className="lg:pt-6">
        <p className="mb-6 text-[12px] font-semibold uppercase tracking-wide text-fg-faint">Try it, this is the real flow</p>
        <BookingSteps demo={demo} announce={!playing} />
      </div>
    </div>
  );
}
