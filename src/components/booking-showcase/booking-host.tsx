import { Clock3, Globe, Video } from "lucide-react";
import { BOOKING, HOST } from "./booking-data";

const META = [
  { icon: Clock3, label: BOOKING.duration },
  { icon: Video, label: "Google Meet" },
  { icon: Globe, label: BOOKING.zone },
];

export function BookingHost() {
  return (
    <div className="border-b border-border p-6 lg:border-b-0 lg:border-r">
      <span className="bm-avatar">{HOST.initials}</span>
      <p className="mt-4 text-[13px] font-medium text-fg-muted">{HOST.name}</p>
      <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{BOOKING.title}</p>
      <ul className="mt-5 space-y-2.5">
        {META.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2.5 text-[13px] font-medium text-fg-muted">
            <Icon className="h-4 w-4 shrink-0 text-fg-faint" />
            {label}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[13px] leading-relaxed text-fg-faint">{BOOKING.summary}</p>
    </div>
  );
}
