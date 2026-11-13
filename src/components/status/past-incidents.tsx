import Link from "next/link";
import { dayOf, recentDays, utcDay, utcStamp, type Incident } from "@/lib/status";
import { STATE_TEXT } from "./state-style";

const IMPACT_STATE = { minor: "degraded", major: "outage", maintenance: "maintenance" } as const;

export function PastIncidents({ incidents, updatedAt, days }: { incidents: Incident[]; updatedAt: string; days: number }) {
  return (
    <div className="divide-y divide-border">
      {recentDays(updatedAt, days).map((day) => {
        const onDay = incidents.filter((i) => dayOf(i.startedAt) === day);
        return (
          <section key={day} className="py-5 first:pt-0">
            <h3 className="text-[15px] font-semibold text-fg">{utcDay(`${day}T00:00:00.000Z`)}</h3>
            {onDay.length ? (
              <ul className="mt-3 space-y-4">
                {onDay.map((incident) => {
                  const last = incident.updates[0];
                  return (
                    <li key={incident.id}>
                      <Link
                        href={`/status/incidents/${incident.id}`}
                        className={`text-[15px] font-medium hover:underline ${STATE_TEXT[IMPACT_STATE[incident.impact]]}`}
                      >
                        {incident.title}
                      </Link>
                      {last && (
                        <p className="mt-1 text-[14px] leading-relaxed text-fg-muted">
                          <span className="font-semibold text-fg">{last.statusLabel}</span> · {last.body}
                        </p>
                      )}
                      <p className="mt-1 text-[12.5px] text-fg-faint">{utcStamp(incident.startedAt)}</p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-2 text-[14px] text-fg-muted">No incidents reported.</p>
            )}
          </section>
        );
      })}
    </div>
  );
}
