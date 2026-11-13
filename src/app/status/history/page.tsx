import type { Metadata } from "next";
import Link from "next/link";
import { COMPONENT_NAME, IMPACT_LABEL, getIncidentPage, utcStamp } from "@/lib/status";
import { pageAlternates } from "@/lib/alternates";
import { StatusHeader } from "@/components/status/status-header";
import { StatusUnavailable } from "@/components/status/status-unavailable";
import { IMPACT_BG } from "@/components/status/state-style";

export const metadata: Metadata = {
  title: "Incident history · Status",
  description: "Every past Quantalog incident and maintenance window, with its updates.",
  alternates: pageAlternates("/status/history"),
};

type Props = { searchParams: Promise<{ before?: string }> };

export default async function HistoryPage({ searchParams }: Props) {
  const { before } = await searchParams;
  const page = await getIncidentPage(before);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <StatusHeader title="Incident history" back />

      {!page ? (
        <StatusUnavailable />
      ) : page.incidents.length ? (
        <div className="overflow-hidden rounded-[8px] border border-border bg-surface">
          {page.incidents.map((incident) => (
            <Link
              key={incident.id}
              href={`/status/incidents/${incident.id}`}
              className="flex items-start gap-3 border-t border-border px-5 py-4 transition-colors first:border-t-0 hover:bg-bg-subtle"
            >
              <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${IMPACT_BG[incident.impact]}`} aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium text-fg">{incident.title}</span>
                <span className="mt-0.5 block text-[13px] text-fg-muted">
                  {IMPACT_LABEL[incident.impact]} · {incident.components.map((c) => COMPONENT_NAME[c] ?? c).join(", ")} ·{" "}
                  {utcStamp(incident.startedAt)}
                </span>
              </span>
              <span className="shrink-0 text-[13px] text-fg-muted">{incident.statusLabel}</span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-[15px] text-fg-muted">No incidents have been reported.</p>
      )}

      {page?.nextBefore && (
        <div className="mt-6 text-center">
          <Link
            href={`/status/history?before=${encodeURIComponent(page.nextBefore)}`}
            className="inline-flex h-10 items-center rounded-[10px] border border-border bg-surface px-4 text-[14px] font-medium text-fg transition-colors hover:border-border-strong"
          >
            Older incidents
          </Link>
        </div>
      )}
    </div>
  );
}
