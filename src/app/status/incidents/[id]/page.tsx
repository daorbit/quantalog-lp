import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPONENT_NAME, IMPACT_LABEL, getIncident, utcStamp } from "@/lib/status";
import { StatusHeader } from "@/components/status/status-header";
import { IncidentTimeline } from "@/components/status/incident-timeline";
import { IMPACT_BG } from "@/components/status/state-style";

export const revalidate = 20;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const incident = await getIncident((await params).id);
  return {
    title: incident ? `${incident.title} · Status` : "Incident · Status",
    description: incident?.updates[0]?.body.slice(0, 160) ?? "A Quantalog status incident.",
    robots: { index: false },
  };
}

export default async function IncidentPage({ params }: Props) {
  const incident = await getIncident((await params).id);
  if (!incident) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <StatusHeader title={incident.title} back />

      <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-fg-muted">
        <span className="inline-flex items-center gap-2 font-medium text-fg">
          <span className={`h-2.5 w-2.5 rounded-full ${IMPACT_BG[incident.impact]}`} aria-hidden="true" />
          {IMPACT_LABEL[incident.impact]}
        </span>
        <span>{incident.resolvedAt ? `${incident.statusLabel} ${utcStamp(incident.resolvedAt)}` : incident.statusLabel}</span>
        <span>Started {utcStamp(incident.startedAt)}</span>
        <span>Affects {incident.components.map((c) => COMPONENT_NAME[c] ?? c).join(", ")}</span>
      </div>

      <div className="rounded-[8px] border border-border bg-surface px-5 py-5">
        <IncidentTimeline updates={incident.updates} />
      </div>
    </div>
  );
}
