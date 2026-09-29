import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { LEGAL_UPDATED } from "@/components/legal/legal-data";
import { PRIVACY_HIGHLIGHTS, PRIVACY_LEAD, PrivacyBody } from "@/content/legal/privacy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, hashes and stores analytics data — and what it deliberately does not collect.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      path="/privacy"
      title="Privacy Policy"
      lead={PRIVACY_LEAD}
      updated={LEGAL_UPDATED}
      highlights={PRIVACY_HIGHLIGHTS}
    >
      <PrivacyBody />
    </LegalPage>
  );
}
