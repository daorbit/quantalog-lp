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

export const revalidate = 20;

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
    <div className="mb-3 flex items-baseline justify-between gap-4">
      <h2 className="text-[19px] font-semibold tracking-tight text-fg">{children}</h2>
      {aside}
    </div>
  );
}

export default async function StatusPage() {
  const status = await getStatus();
  const maintenance = status?.active.filter((i) => i.impact === "maintenance") ?? [];
  const incidents = status?.active.filter((i) => i.impact !== "maintenance") ?? [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <StatusHeader title="System status" subscribe />
      <Suspense fallback={null}>
        <StatusNotice />
      </Suspense>

      {status ? <StatusBanner state={status.overall} label={status.overallLabel} updatedAt={status.updatedAt} /> : <StatusUnavailable />}

      {incidents.length > 0 && (
        <section className="mt-10">
          <SectionTitle>Current incidents</SectionTitle>
          <div className="space-y-4">
            {incidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
        </section>
      )}

      {maintenance.length > 0 && (
        <section className="mt-10">
          <SectionTitle>Maintenance</SectionTitle>
          <div className="space-y-4">
            {maintenance.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
        </section>
      )}

      {status && (
        <section className="mt-10">
          <SectionTitle aside={<span className="text-[13px] text-fg-muted">Uptime over the last 90 days</span>}>Systems</SectionTitle>
          <ComponentList components={status.components} />
        </section>
      )}

      {status && (
        <section className="mt-10">
          <SectionTitle
            aside={
              <Link href="/status/history" className="inline-flex items-center gap-0.5 text-[14px] font-medium text-accent hover:underline">
                Full history
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            }
          >
            Past incidents
          </SectionTitle>
          <PastIncidents incidents={status.recent} updatedAt={status.updatedAt} days={PAST_DAYS} />
        </section>
      )}

      <section id="subscribe" className="mt-10 scroll-mt-24 rounded-[8px] border border-border bg-surface px-5 py-5 sm:px-6">
        <h2 className="text-[17px] font-semibold text-fg">Get status emails</h2>
        <p className="mb-4 mt-1 text-[14px] leading-relaxed text-fg-muted">
          One email when an incident or maintenance starts, and one for each update. Unsubscribe from any email.
        </p>
        <SubscribeForm />
      </section>
    </div>
  );
}
