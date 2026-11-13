import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { dayOf, recentDays, utcDay, utcTime, type Incident } from "@/lib/status";
import { IMPACT_BG } from "./state-style";

export function PastIncidents({ incidents, updatedAt, days }: { incidents: Incident[]; updatedAt: string; days: number }) {
  const inRange = new Set(recentDays(updatedAt, days));
  const shown = incidents.filter((i) => i.resolvedAt && inRange.has(dayOf(i.startedAt)));

  if (!shown.length) {
    return (
      <div className="rounded-[8px] border border-border bg-surface px-5 py-4 text-[14px] text-fg-muted sm:px-6">
        No incidents in the last {days} days.
      </div>
    );
  }

  return (
    <div className="rounded-[8px] border border-border bg-surface">
      {shown.map((incident) => {
        const last = incident.updates[0];
        return (
          <Link
            key={incident.id}
            href={`/status/incidents/${incident.id}`}
            className="flex items-start gap-3 border-t border-border px-5 py-4 transition-colors first:border-t-0 hover:bg-bg-subtle sm:px-6"
          >
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${IMPACT_BG[incident.impact]}`} aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-medium text-fg">{incident.title}</span>
              {last && <span className="mt-0.5 line-clamp-2 block text-[14px] leading-relaxed text-fg-muted">{last.body}</span>}
              <span className="mt-1 block text-[12.5px] text-fg-faint">
                {utcDay(incident.startedAt)} · {utcTime(incident.startedAt)}
              </span>
            </span>
            <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-fg-faint" aria-hidden="true" />
          </Link>
        );
      })}
    </div>
  );
}
