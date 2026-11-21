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
  KEYWORDS,
  LEAD,
  META_DESCRIPTION,
  PROMISES,
  QUOTE_CONTENTS,
  QUOTE_VS_INVOICE,
  STEPS,
  TITLE,
} from "./content";

const PAGE = {
  path: "/tools/quotation-generator",
  name: "Quotation generator",
  title: TITLE,
  description: META_DESCRIPTION,
  keywords: KEYWORDS,
  published: "2026-11-21",
  modified: BUILD_DATE,
};

export const metadata = toolPageMetadata(PAGE);

export default function QuotationGeneratorPage() {
  return (
    <>
      <JsonLd data={toolPageJsonLd(PAGE, FAQS)} />

      <ToolPageHeader title="Free quotation generator" lead={LEAD} promises={PROMISES} />

      <section aria-label="Quotation generator" className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
        <GstInvoiceTool kind="quotation" />
      </section>

      <ProductSection eyebrow="How it works" title="A quotation in three steps." bordered>
        <ProductSteps steps={STEPS} />
      </ProductSection>

      <ProductSection
        eyebrow="Quotation or invoice"
        title="Quote the price. Then bill it."
        body="The two documents do different jobs, and the numbers on them should agree."
        bordered
      >
        <ProductFeatureGrid features={QUOTE_VS_INVOICE} columns={3} />
      </ProductSection>

      <ProductSection
        eyebrow="What to include"
        title="What a good quotation shows."
        body="A quotation is not a tax invoice, so GST law does not fix its format. These are what customers expect, and each has a place in the generator."
        bordered
      >
        <ProductChecklist items={QUOTE_CONTENTS} />
      </ProductSection>

      <div className="border-t border-border">
        <SplitStory eyebrow="In fairness" title="What this tool doesn't do.">
          <p>
            It doesn&apos;t know whether the customer accepted, and it doesn&apos;t turn the quotation into
            an invoice. You copy the items into the free GST invoice generator yourself.
          </p>
          <p>
            It keeps one draft, in this browser, and doesn&apos;t remember your numbering or your customers.
            Quantalog Invoicing does all of that, and it is free.
          </p>
        </SplitStory>
      </div>

      <ProductFaq faqs={FAQS} idPrefix="quotation-tool-faq" />

      <ProductComparisons
        category="invoicing"
        title="Choosing an invoicing app?"
        body="Honest comparisons with the billing tools Indian businesses use most, including what they do that Quantalog does not."
      />

      <Cta
        title="Send the quote, then invoice it in one click."
        body="In Quantalog Invoicing the customer accepts on a link, and an accepted quotation becomes an invoice with every line copied. Free in every workspace."
        secondary={{ label: "See Invoicing", href: "/invoicing" }}
        location="quotation_tool_cta"
      />

      <PageDate published={PAGE.published} modified={PAGE.modified} />
    </>
  );
}
