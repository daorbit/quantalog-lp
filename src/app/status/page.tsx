import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import { getStatus } from "@/lib/status";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/alternates";
import { StatusHeader } from "@/components/status/status-header";
import { StatusBanner } from "@/components/status/status-banner";
import { StatusUnavailable } from "@/components/status/status-unavailable";
import { StatusNotice } from "@/components/status/status-notice";
import { IncidentCard } from "@/components/status/incident-card";
import { ComponentList } from "@/components/status/component-list";
import { PastIncidents } from "@/components/status/past-incidents";
import { SubscribeForm } from "@/components/status/subscribe-form";

export const revalidate = 60;

const DESCRIPTION = "Live status of the Quantalog dashboard, API, tracking, lead capture and invoicing, with incident updates and 90 days of uptime.";
const PAST_DAYS = 7;

export const metadata: Metadata = {
  title: "System status",
  description: DESCRIPTION,
  alternates: pageAlternates("/status"),
  openGraph: { type: "website", url: `${site.url}/status`, title: "Quantalog status", description: DESCRIPTION, images: [site.ogImage] },
};

function SectionTitle({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-4">
      <h2 className="text-[1.25rem] font-semibold tracking-tight text-fg">{children}</h2>
      {aside}
    </div>
  );
}

export default async function StatusPage() {
  const status = await getStatus();
  const maintenance = status?.active.filter((i) => i.impact === "maintenance") ?? [];
  const incidents = status?.active.filter((i) => i.impact !== "maintenance") ?? [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <StatusHeader title="Quantalog status" />
      <Suspense fallback={null}>
        <StatusNotice />
      </Suspense>

      {status ? <StatusBanner state={status.overall} label={status.overallLabel} updatedAt={status.updatedAt} /> : <StatusUnavailable />}

      {incidents.length > 0 && (
        <section className="mt-10 space-y-5" aria-label="Current incidents">
          {incidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </section>
      )}

      {maintenance.length > 0 && (
        <section className="mt-10">
          <SectionTitle>Maintenance</SectionTitle>
          <div className="space-y-5">
            {maintenance.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
        </section>
      )}

      {status && (
        <section className="mt-12">
          <SectionTitle aside={<span className="text-[13px] text-fg-muted">Last 90 days</span>}>Systems</SectionTitle>
          <ComponentList components={status.components} />
        </section>
      )}

      <section className="mt-12 rounded-[8px] border border-border bg-surface px-5 py-5">
        <h2 className="text-[17px] font-semibold text-fg">Get an email when something goes wrong</h2>
        <p className="mb-4 mt-1 text-[14px] leading-relaxed text-fg-muted">
          One email when an incident or maintenance starts, and one for each update. Unsubscribe from any email.
        </p>
        <SubscribeForm />
      </section>

      {status && (
        <section className="mt-12">
          <SectionTitle
            aside={
              <Link href="/status/history" className="inline-flex items-center gap-0.5 text-[14px] font-medium text-accent hover:underline">
                Incident history
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            }
          >
            Past incidents
          </SectionTitle>
          <PastIncidents incidents={status.recent} updatedAt={status.updatedAt} days={PAST_DAYS} />
        </section>
      )}
    </div>
  );
}
