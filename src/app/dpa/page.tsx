import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { LEGAL_UPDATED } from "@/components/legal/legal-data";
import { DPA_HIGHLIGHTS, DPA_LEAD, DpaBody } from "@/content/legal/dpa";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Processing Addendum",
  description: `How ${site.name} processes personal data on behalf of its customers, as their data processor.`,
  alternates: { canonical: "/dpa" },
};

export default function DpaPage() {
  return (
    <LegalPage
      path="/dpa"
      title="Data Processing Addendum"
      lead={DPA_LEAD}
      updated={LEGAL_UPDATED}
      highlights={DPA_HIGHLIGHTS}
    >
      <DpaBody />
    </LegalPage>
  );
}
