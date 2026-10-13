import type { ReactNode } from "react";
import { BookingPage } from "./booking-page";
import { BookingConfirmed } from "./booking-confirmed";
import { BookingLead } from "./booking-lead";

const STEPS: { title: string; body: string; delay: number; panel: ReactNode }[] = [
  { title: "They pick a time", body: "Only your open hours, in their own timezone.", delay: 0, panel: <BookingPage /> },
  { title: "It's confirmed instantly", body: "With a Google Meet link and a calendar invite.", delay: 2.3, panel: <BookingConfirmed /> },
  { title: "It lands in your workspace", body: "As a lead, with every answer they gave.", delay: 2.9, panel: <BookingLead /> },
];

export function BookingShowcase() {
  return (
    <div className="data-stage mx-auto grid w-full max-w-400 gap-8 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr_1fr] lg:gap-6">
      {STEPS.map((step, i) => (
        <div key={step.title} className="stage-item flex flex-col" style={{ ["--delay" as string]: `${step.delay}s`, ["--from-scale" as string]: 0.97 }}>
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-[13px] font-semibold tabular-nums text-accent">0{i + 1}</span>
            <div>
              <p className="text-[16px] font-semibold tracking-[-0.01em]">{step.title}</p>
              <p className="mt-0.5 text-[13.5px] text-fg-muted">{step.body}</p>
            </div>
          </div>
          <div className="flex-1">{step.panel}</div>
        </div>
      ))}
    </div>
  );
}
