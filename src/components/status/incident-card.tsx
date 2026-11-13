import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { COMPONENT_NAME, IMPACT_LABEL, type Incident } from "@/lib/status";
import { IMPACT_BG, IMPACT_BORDER, IMPACT_TEXT } from "./state-style";
import { IncidentTimeline } from "./incident-timeline";

export function IncidentCard({ incident }: { incident: Incident }) {
  return (
    <article className={`rounded-[8px] border bg-surface ${IMPACT_BORDER[incident.impact]}`}>
      <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <p className={`inline-flex items-center gap-1.5 text-[13px] font-semibold ${IMPACT_TEXT[incident.impact]}`}>
            <span className={`h-2 w-2 rounded-full ${IMPACT_BG[incident.impact]}`} aria-hidden="true" />
            {IMPACT_LABEL[incident.impact]} · {incident.statusLabel}
          </p>
          <h3 className="mt-1 text-[17px] font-semibold leading-snug text-fg">{incident.title}</h3>
          <p className="mt-1 text-[13px] text-fg-muted">Affects {incident.components.map((c) => COMPONENT_NAME[c] ?? c).join(", ")}</p>
        </div>
        <Link
          href={`/status/incidents/${incident.id}`}
          className="mt-1 inline-flex shrink-0 items-center gap-0.5 text-[14px] font-medium text-accent hover:underline"
        >
          Details
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </header>
      <div className="px-5 py-4 sm:px-6">
        <IncidentTimeline updates={incident.updates} />
      </div>
    </article>
  );
}
