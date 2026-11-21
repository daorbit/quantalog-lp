import { BUILD_DATE } from "@/lib/build-date";
import { GstInvoiceTool } from "@/components/gst-invoice-tool/gst-invoice-tool";
import { ToolPageHeader } from "@/components/tool-page-header";
import { ProductSection } from "@/components/product/product-section";
import { ProductSteps } from "@/components/product/product-steps";
import { ProductFeatureGrid } from "@/components/product/product-feature-grid";
import { ProductChecklist } from "@/components/product/product-checklist";
import { ProductFaq } from "@/components/product/product-faq";
import { ProductComparisons } from "@/components/product/product-comparisons";
import { SplitStory } from "@/components/split-story";
import { Cta } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { PageDate } from "@/components/page-date";
import { toolPageJsonLd, toolPageMetadata } from "@/lib/tool-page-schema";
import {
  FAQS,
  INVOICE_RULES,
  KEYWORDS,
  LEAD,
  META_DESCRIPTION,
  PROMISES,
  STEPS,
  TAX_SPLIT,
  TITLE,
} from "./content";

const PAGE = {
  path: "/tools/gst-invoice-generator",
  name: "GST invoice generator",
  title: TITLE,
  description: META_DESCRIPTION,
  keywords: KEYWORDS,
  published: "2026-11-21",
  modified: BUILD_DATE,
};

export const metadata = toolPageMetadata(PAGE);

export default function GstInvoiceGeneratorPage() {
  return (
    <>
      <JsonLd data={toolPageJsonLd(PAGE, FAQS)} />

      <ToolPageHeader title="Free GST invoice generator" lead={LEAD} promises={PROMISES} />

      <section aria-label="Invoice generator" className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
        <GstInvoiceTool kind="invoice" />
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
        link={{ label: "Quoting first? Use the free quotation generator", href: "/tools/quotation-generator" }}
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

      <PageDate published={PAGE.published} modified={PAGE.modified} />
    </>
  );
}
