import type { ReactNode } from "react";
import { BadgeCheck, CalendarClock, Inbox, type LucideIcon } from "lucide-react";
import { BookingPage } from "./booking-page";
import { BookingConfirmed } from "./booking-confirmed";
import { BookingLead } from "./booking-lead";

type Step = { title: string; body: string; delay: number; tone: string; icon: LucideIcon; panel: ReactNode; wide?: boolean };

const STEPS: Step[] = [
  { title: "They pick a time", body: "Only your open hours, in their own timezone.", delay: 0, tone: "#0a84ff", icon: CalendarClock, panel: <BookingPage />, wide: true },
  { title: "It's confirmed instantly", body: "With a Google Meet link and a calendar invite.", delay: 2.3, tone: "#10b981", icon: BadgeCheck, panel: <BookingConfirmed /> },
  { title: "It lands in your workspace", body: "As a lead, with every answer they gave.", delay: 2.9, tone: "#8b5cf6", icon: Inbox, panel: <BookingLead /> },
];

export function BookingShowcase() {
  return (
    <div className="data-stage mx-auto grid w-full max-w-400 gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-6 xl:grid-cols-[1.3fr_1fr_1fr]">
      {STEPS.map(({ title, body, delay, tone, icon: Icon, panel, wide }, i) => (
        <div
          key={title}
          className={`stage-item flex min-w-0 flex-col ${wide ? "md:col-span-2 xl:col-span-1" : ""}`}
          style={{ ["--delay" as string]: `${delay}s`, ["--from-scale" as string]: 0.97, ["--tone" as string]: tone }}
        >
          <div className="mb-4 flex items-start gap-3">
            <span className="bm-step-badge">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="flex items-baseline gap-2 text-[16px] font-semibold tracking-[-0.01em]">
                <span className="bm-step-num">0{i + 1}</span>
                {title}
              </p>
              <p className="mt-0.5 text-[13.5px] text-fg-muted">{body}</p>
            </div>
          </div>
          <div className="flex-1">{panel}</div>
        </div>
      ))}
    </div>
  );
}
