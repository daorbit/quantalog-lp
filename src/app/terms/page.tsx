import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { LEGAL_UPDATED } from "@/components/legal/legal-data";
import { TERMS_HIGHLIGHTS, TERMS_LEAD, TermsBody } from "@/content/legal/terms";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/alternates";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern use of ${site.name}.`,
  alternates: pageAlternates("/terms"),
};

export default function TermsPage() {
  return (
    <LegalPage
      path="/terms"
      title="Terms of Service"
      lead={TERMS_LEAD}
      updated={LEGAL_UPDATED}
      highlights={TERMS_HIGHLIGHTS}
    >
      <TermsBody />
    </LegalPage>
  );
}
