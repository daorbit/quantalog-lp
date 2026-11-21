import type { Metadata } from "next";
import { Check } from "lucide-react";
import { BUILD_DATE } from "@/lib/build-date";
import { Eyebrow } from "@/components/ui";
import { GstInvoiceTool } from "@/components/gst-invoice-tool/gst-invoice-tool";
import { ProductSection } from "@/components/product/product-section";
import { ProductSteps } from "@/components/product/product-steps";
import { ProductFeatureGrid } from "@/components/product/product-feature-grid";
import { ProductChecklist } from "@/components/product/product-checklist";
import { ProductFaq } from "@/components/product/product-faq";
import { ProductComparisons } from "@/components/product/product-comparisons";
import { SplitStory } from "@/components/split-story";
import { Cta } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/blog";
import { pageAlternates } from "@/lib/alternates";
import { FAQS, INVOICE_RULES, LEAD, META_DESCRIPTION, PROMISES, STEPS, TAX_SPLIT, TITLE } from "./content";

const PATH = "/tools/gst-invoice-generator";
const PUBLISHED = "2026-11-21";
const MODIFIED = BUILD_DATE;

export const metadata: Metadata = {
  title: TITLE,
  description: META_DESCRIPTION,
  alternates: pageAlternates(PATH),
  keywords: [
    "free GST invoice generator",
    "GST invoice generator",
    "GST invoice format",
    "online GST bill maker",
    "GST invoice with UPI QR code",
    "CGST SGST IGST invoice",
    "tax invoice format India",
    "invoice generator no signup",
  ],
  other: {
    "article:published_time": PUBLISHED,
    "article:modified_time": MODIFIED,
  },
  openGraph: {
    type: "website",
    url: `${site.url}${PATH}`,
    title: TITLE,
    description: META_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: META_DESCRIPTION,
  },
};

export default function GstInvoiceGeneratorPage() {
  const jsonLd = graph(
    {
      "@type": "WebApplication",
      "@id": `${site.url}${PATH}#app`,
      name: "GST invoice generator",
      description: META_DESCRIPTION,
      url: `${site.url}${PATH}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      publisher: { "@id": ORG_ID },
      isPartOf: { "@id": SITE_ID },
      inLanguage: "en-IN",
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}${PATH}#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "GST invoice generator", path: PATH },
    ])
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-20">
        <Eyebrow>Free tool</Eyebrow>
        <h1 className="mt-4 text-balance text-display font-bold leading-[1.2] tracking-display">
          Free GST invoice generator
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-fg-muted sm:text-[19px]">{LEAD}</p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-fg-muted">
          {PROMISES.map((promise) => (
            <li key={promise} className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-accent" aria-hidden="true" />
              {promise}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Invoice generator" className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
        <GstInvoiceTool />
      </section>

      <ProductSection eyebrow="How it works" title="An invoice in three steps." bordered>
        <ProductSteps steps={STEPS} />
      </ProductSection>

      <ProductSection
        eyebrow="CGST, SGST or IGST"
        title="Which GST goes on the invoice."
        body="It depends on two states: yours, and the place of supply. The generator compares them for you."
        bordered
      >
        <ProductFeatureGrid features={TAX_SPLIT} columns={3} />
      </ProductSection>

      <ProductSection
        eyebrow="The rules"
        title="What a GST invoice must show."
        body="Rule 46 of the CGST Rules lists what a tax invoice has to carry. Every item below has a place in the generator."
        bordered
      >
        <ProductChecklist items={INVOICE_RULES} />
      </ProductSection>

      <div className="border-t border-border">
        <SplitStory eyebrow="In fairness" title="What this tool doesn't do.">
          <p>
            It doesn&apos;t make e-invoices. Businesses with aggregate turnover above ₹5 crore must report B2B
            invoices to the Invoice Registration Portal and print the IRN it returns. It doesn&apos;t make
            e-way bills either.
          </p>
          <p>
            It keeps one draft, in this browser. It doesn&apos;t remember your last invoice number, your
            customers or which invoices are paid. Quantalog Invoicing does, and it is free.
          </p>
        </SplitStory>
      </div>

      <ProductFaq faqs={FAQS} idPrefix="gst-tool-faq" />

      <ProductComparisons
        category="invoicing"
        title="Choosing an invoicing app?"
        body="Honest comparisons with the billing tools Indian businesses use most, including what they do that Quantalog does not."
      />

      <Cta
        title="Send the next one from Quantalog."
        body="Quantalog Invoicing uses the same GST maths, and adds numbering that keeps count, saved customers and items, quotations that become invoices, and share links that show when they were opened. Free in every workspace."
        secondary={{ label: "See Invoicing", href: "/invoicing" }}
        location="gst_tool_cta"
      />

      <p className="mx-auto max-w-6xl px-4 pb-10 text-center text-[13px] text-fg-faint sm:px-6">
        Published <time dateTime={PUBLISHED}>{formatDate(PUBLISHED)}</time>. Last updated{" "}
        <time dateTime={MODIFIED}>{formatDate(MODIFIED)}</time>.
      </p>
    </>
  );
}
