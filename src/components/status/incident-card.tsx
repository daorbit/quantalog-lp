import Link from "next/link";
import { COMPONENT_NAME, IMPACT_LABEL, type Incident } from "@/lib/status";
import { IMPACT_BG, IMPACT_BORDER } from "./state-style";
import { IncidentTimeline } from "./incident-timeline";

export function IncidentCard({ incident }: { incident: Incident }) {
  return (
    <article className={`overflow-hidden rounded-[8px] border bg-surface ${IMPACT_BORDER[incident.impact]}`}>
      <header className={`flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-white ${IMPACT_BG[incident.impact]}`}>
        <h3 className="text-[17px] font-semibold leading-snug">
          <Link href={`/status/incidents/${incident.id}`} className="hover:underline">
            {incident.title}
          </Link>
        </h3>
        <span className="text-[13px] font-medium opacity-90">{IMPACT_LABEL[incident.impact]}</span>
      </header>
      <div className="px-5 py-5">
        <IncidentTimeline updates={incident.updates} />
        <p className="mt-4 border-t border-border pt-3 text-[13px] text-fg-muted">
          Affects {incident.components.map((c) => COMPONENT_NAME[c] ?? c).join(", ")}
        </p>
      </div>
    </article>
  );
}
