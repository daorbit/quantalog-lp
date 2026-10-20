import type { ReactNode } from "react";
import { CalendarPlus, Check, Inbox } from "lucide-react";
import { BOOKING, LEAD, shortDay, slotRange } from "./booking-data";
import { BookingNote } from "./booking-note";
import type { BookingDemo } from "./use-booking-demo";

type StepState = "done" | "active" | "todo";

type Step = { title: string; body: string; state: StepState; note?: ReactNode };

function stepsFor({ day, slot, confirmed }: BookingDemo): Step[] {
  const live = confirmed && slot !== null;
  const when = slot ? `${shortDay(day)}, ${slot}` : "";

  return [
    {
      title: "They pick a time",
      body: slot ? `${when} selected, in their own time zone.` : "Choose any open day and time in the calendar.",
      state: slot ? "done" : "active",
    },
    {
      title: "It's confirmed instantly",
      body: slot && !live ? "Press Confirm to book it." : "With a Google Meet link and a calendar invite.",
      state: live ? "done" : slot ? "active" : "todo",
      note: slot && (
        <BookingNote
          icon={CalendarPlus}
          tone="blue"
          app="Google Calendar"
          title="Added to your calendar"
          body={`${BOOKING.title} · ${shortDay(day)}, ${slotRange(slot)}. Meet link included.`}
        />
      ),
    },
    {
      title: "It lands in your workspace",
      body: "As a lead, with every answer they gave.",
      state: live ? "done" : "todo",
      note: (
        <BookingNote
          icon={Inbox}
          tone="violet"
          app="Quantalog"
          title={`New lead · ${LEAD.name}`}
          body={`${LEAD.company}, from the ${LEAD.source.toLowerCase()}. Booked ${when}.`}
        />
      ),
    },
  ];
}

export function BookingSteps({ demo, announce }: { demo: BookingDemo; announce: boolean }) {
  const live = demo.confirmed && demo.slot !== null;

  return (
    <ol aria-live={announce ? "polite" : "off"}>
      {stepsFor(demo).map(({ title, body, state, note }, i) => (
        <li key={title} className="bm-step" data-state={state}>
          <span className="bm-step-mark">{state === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}</span>
          <div className="min-w-0 flex-1 pb-8">
            <p className="text-[15px] font-semibold tracking-[-0.01em]">{title}</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-fg-muted">{body}</p>
            {note && (
              <div className={`bm-step-note bm-step-note-d${i}`} data-live={live || undefined}>
                <div className="min-h-0 overflow-hidden">
                  <div className="pt-3">{note}</div>
                </div>
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
