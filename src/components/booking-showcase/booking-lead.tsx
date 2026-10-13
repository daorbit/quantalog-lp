import { CalendarDays, Inbox, Video } from "lucide-react";
import { BOOKING, LEAD, PICKED_SLOT } from "./booking-data";

const ROWS = [
  { label: "Email", value: LEAD.email },
  { label: "Company", value: LEAD.company },
  { label: "Source", value: LEAD.source },
];

export function BookingLead() {
  return (
    <div className="bm-panel">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="flex items-center gap-2 text-[13px] font-semibold">
          <Inbox className="h-4 w-4 text-fg-muted" />
          Entries
        </span>
        <span className="bm-tone-soft stage-item rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ ["--delay" as string]: "3.2s" }}>
          1 new
        </span>
      </div>

      <div className="stage-item p-4" style={{ ["--delay" as string]: "3.1s", ["--from-scale" as string]: 0.96 }}>
        <div className="flex items-center gap-3">
          <span className="bm-tone-soft grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] font-semibold">PS</span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold">{LEAD.name}</p>
            <p className="text-[12px] text-fg-faint">Booked {BOOKING.title.toLowerCase()} · just now</p>
          </div>
          <span className="bm-stage-new ml-auto shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold">New lead</span>
        </div>

        <dl className="mt-4 space-y-2 text-[12.5px]">
          {ROWS.map((row) => (
            <div key={row.label} className="flex justify-between gap-3">
              <dt className="text-fg-faint">{row.label}</dt>
              <dd className="truncate font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 rounded-xl border border-border p-3">
          <p className="text-[12px] text-fg-faint">Booking</p>
          <p className="mt-0.5 text-[13px] font-semibold">Fri, Oct 16 · {PICKED_SLOT} – 11:00</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 rounded-lg border border-border px-2 py-1 text-[11.5px] font-medium">
              <Video className="bm-tone-text h-3.5 w-3.5" />
              Join Meet
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-border px-2 py-1 text-[11.5px] font-medium">
              <CalendarDays className="bm-tone-text h-3.5 w-3.5" />
              Calendar event
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
