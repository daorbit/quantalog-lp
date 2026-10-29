import { BUILD_DATE } from "@/lib/build-date";
import type { Metadata } from "next";
import {
  BarChart3,
  Coins,
  CreditCard,
  FileText,
  Inbox,
  Palette,
  QrCode,
  Receipt,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";
import { FeatureHero } from "@/components/feature-hero";
import { OrbitStrip } from "@/components/orbit-strip";
import { BigStats } from "@/components/big-stats";
import { SplitStory } from "@/components/split-story";
import { Cta } from "@/components/sections/cta";
import { InvoiceVisual } from "@/components/explore/visuals/invoice-visual";
import { InvoiceDocumentPreview } from "@/components/product/invoice-document-preview";
import { ProductSection } from "@/components/product/product-section";
import { ProductSteps } from "@/components/product/product-steps";
import { ProductFeatureGrid } from "@/components/product/product-feature-grid";
import { ProductChecklist } from "@/components/product/product-checklist";
import { ProductFaq } from "@/components/product/product-faq";
import { RelatedProducts } from "@/components/product/related-products";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/blog";
import { pageAlternates } from "@/lib/alternates";

const PUBLISHED = "2026-10-29";
const MODIFIED = BUILD_DATE;

const TITLE = "Quotations and GST-ready invoices, paid by UPI";

const META_DESCRIPTION =
  "Send quotations and GST-ready invoices from the workspace your leads already live in. Email or share a link, collect by UPI, and see what is still owed.";

const DESCRIPTION =
  "Quantalog Invoicing sends quotations and invoices to the people your forms and campaigns bring in. An accepted quotation becomes an invoice in one click, GST is split into CGST and SGST or IGST for you, rupee invoices carry a UPI QR code for the amount due, and the Invoices page shows what has been paid and what is still owed.";

const HERO_LEAD =
  "Quotations and GST-ready invoices for the leads Quantalog brings in. Email them or share a link, collect by UPI, and see what is still owed.";

const steps = [
  {
    title: "Quote the lead",
    body: "Pick the customer, add saved items, and the dates, tax and totals fill in. Or describe it to Orbit and check the draft.",
  },
  {
    title: "They accept on the link",
    body: "Email it with the PDF attached, or share a private link. The client accepts or declines on the page, with their name and a note.",
  },
  {
    title: "Invoice it and get paid",
    body: "Convert the accepted quotation in one click. Rupee invoices carry a UPI QR for the amount due, and Paid moves it to Collected.",
  },
];

const capabilities = [
  {
    icon: FileText,
    title: "Quotations that become invoices",
    body: "Send a price before the work is agreed. When the client says yes, convert it: every line, rate and tax is copied onto a new invoice with the next number in your series.",
  },
  {
    icon: Receipt,
    title: "GST done the way the law asks",
    body: "Tax invoice heading once your GSTIN is saved, HSN or SAC per line, place of supply from the client's GSTIN, and CGST and SGST or IGST worked out per line. Reverse charge and export under LUT are one switch each.",
  },
  {
    icon: QrCode,
    title: "A UPI QR for the amount due",
    body: "Add your UPI ID and every rupee invoice prints a scan-to-pay code for the exact balance, with the invoice number as the payment note so the money is easy to match.",
  },
  {
    icon: Send,
    title: "Email it, or send a link",
    body: "Email from your business name with the PDF attached, now or scheduled up to 90 days ahead. Or share a private link on WhatsApp or Telegram and see how often it was opened.",
  },
  {
    icon: Users,
    title: "Customers and items, saved once",
    body: "Pick a customer and their address, GSTIN and state fill in. Pick an item and its rate, unit, code and GST rate follow. Each customer shows what they still owe.",
  },
  {
    icon: BarChart3,
    title: "Reports your accountant asks for",
    body: "Invoiced against collected by month, receivables by how late they are, sales by customer and item, days to pay, and a GST summary you can export for GSTR-1.",
  },
  {
    icon: Coins,
    title: "Bill abroad in their currency",
    body: "Eight currencies, set per document. Your summary converts everything into the currency you pick at the day's exchange rate, and the documents themselves never change.",
  },
  {
    icon: Palette,
    title: "Ten templates, your logo and colour",
    body: "From a quiet minimalist page to a bold banner header, each previewed with your own document on a laptop or a phone before you send it.",
  },
];

const connected = [
  {
    icon: CreditCard,
    title: "Paid forms invoice themselves",
    body: "Turn it on for a payment field and every paid response gets a paid invoice, numbered from your series, with the response linking straight to it.",
    href: "/forms",
  },
  {
    icon: Inbox,
    title: "Leads, then customers",
    body: "The people your forms bring in are the people you quote. Respondents from paid forms are added to Customers for you.",
  },
  {
    icon: ShieldCheck,
    title: "One workspace, one set of roles",
    body: "Editors and above create and send. Viewers never see prices or client details. Everything is shared with the rest of your team.",
  },
];

const stats = [
  { value: "10", label: "Document templates" },
  { value: "8", label: "Currencies" },
  { value: "1", label: "Click from quote to invoice" },
  { value: "Free", label: "In every workspace" },
] as const;

const included = [
  "Quotations and invoices with their own number series and prefixes",
  "Convert an accepted quotation to an invoice in one click",
  "Tax invoice heading, HSN and SAC codes, CGST and SGST or IGST per line",
  "Prices that include tax, round off, reverse charge and export under LUT",
  "UPI scan-to-pay QR on rupee invoices, plus your bank details",
  "Email with the PDF attached, now or scheduled, from your business name",
  "Private share links with view counts and accept or decline for quotations",
  "Customers with outstanding and overdue totals, and a CSV statement",
  "Saved items with rate, unit, code and GST rate",
  "Receivables ageing, sales, payments and a GSTR-1 style export",
  "Ten templates, seven accent colours and your logo",
  "Amount in words, in lakh and crore for rupee totals",
];

const faqs = [
  {
    q: "What does Invoicing cost?",
    a: "Nothing extra. Quantalog Invoicing is a free app in every workspace. A workspace admin turns it on in Apps, and your quotations, invoices and numbering are kept even if it is turned off again.",
  },
  {
    q: "Is it a proper GST invoice?",
    a: "Once your GSTIN is saved, documents are headed Tax invoice and carry your GSTIN, the client's when they are registered, a unique sequential number, HSN or SAC codes, the place of supply, and the tax split into CGST and SGST or IGST. E-invoicing through the GST portal and e-way bills are not supported yet.",
  },
  {
    q: "How do clients pay?",
    a: "Rupee invoices with a UPI ID show a QR code for the amount due, on the PDF and on the share link, so a client can pay from any UPI app. Your bank details are printed too. When the money arrives you mark the invoice Paid, and it moves to Collected.",
  },
  {
    q: "Can I send invoices from Quantalog?",
    a: "Yes. Share emails the document with the PDF attached, from your business name via Quantalog, and replies go to your billing email. You can send now or schedule it up to 90 days ahead, or turn on a private link and send that on WhatsApp, Telegram or your own email app.",
  },
  {
    q: "Can I bill clients outside India?",
    a: "Yes. Pick from eight currencies on each document, including US dollar, euro, pound and dirham. Leave the GSTIN blank if you are not registered for GST, and documents are headed Invoice rather than Tax invoice.",
  },
  {
    q: "Can Orbit write the invoice for me?",
    a: "It can draft one from a sentence, a photo or a PDF of a purchase order, edit it when you ask, and suggest HSN codes and GST rates. Nothing reaches the document until you accept it, and the totals always come from the same calculator as the editor.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: META_DESCRIPTION,
  alternates: pageAlternates("/invoicing"),
  keywords: [
    "invoice generator",
    "GST invoice generator",
    "online invoicing software",
    "quotation software",
    "estimate to invoice",
    "UPI QR invoice",
    "GST billing software for small business",
    "invoice and quotation maker",
  ],
  other: {
    "article:published_time": PUBLISHED,
    "article:modified_time": MODIFIED,
  },
  openGraph: {
    type: "website",
    url: `${site.url}/invoicing`,
    title: TITLE,
    description: META_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: META_DESCRIPTION,
  },
};

export default function InvoicingPage() {
  const jsonLd = graph(
    {
      "@type": "WebPage",
      "@id": `${site.url}/invoicing#page`,
      name: TITLE,
      description: DESCRIPTION,
      url: `${site.url}/invoicing`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
      primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}${site.ogImage}` },
    },
    service({
      path: "/invoicing",
      name: TITLE,
      description: DESCRIPTION,
      serviceType: "Invoicing software",
    }),
    article({
      path: "/invoicing",
      headline: TITLE,
      description: DESCRIPTION,
      published: PUBLISHED,
      modified: MODIFIED,
    }),
    {
      "@type": "FAQPage",
      "@id": `${site.url}/invoicing#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Invoicing", path: "/invoicing" },
    ])
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      <FeatureHero
        eyebrow="Invoicing"
        title={
          <>
            Quote it. Invoice it.
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">Get paid.</span>
          </>
        }
        description={HERO_LEAD}
        primary={{ label: "Start invoicing free" }}
        secondary={{ label: "Read the docs", href: "/docs/quantalog-invoicing" }}
        visual={<InvoiceVisual />}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-y border-border py-12 sm:py-16">
          <BigStats stats={stats} />
        </div>
      </div>

      <ProductSection
        eyebrow="The document"
        title="Everything your client needs to pay."
        body="Your details, theirs, every line with its code and tax, the amount due in large type and a way to pay it. Nothing they have to write back and ask for."
      >
        <InvoiceDocumentPreview />
      </ProductSection>

      <ProductSection
        eyebrow="From lead to paid"
        title="Three steps, nothing typed twice."
        body="The lead fills in your form, you send a price, they accept it, and the invoice is already written."
        bordered
      >
        <ProductSteps steps={steps} />
      </ProductSection>

      <ProductSection
        eyebrow="What it does"
        title="Billing for the work your site wins."
        body="Built for freelancers, agencies and small businesses who would rather not keep a separate billing tool for a few invoices a month."
        link={{ label: "Read the invoicing docs", href: "/docs/quantalog-invoicing" }}
        bordered
      >
        <ProductFeatureGrid features={capabilities} columns={4} />
      </ProductSection>

      <ProductSection
        eyebrow="Part of Quantalog"
        title="Where your leads already are."
        body="Invoicing sits in the same workspace as your forms and analytics, so the person who filled in your form is one click from a quotation."
        bordered
      >
        <ProductFeatureGrid features={connected} columns={3} />
      </ProductSection>

      <ProductSection eyebrow="Included" title="What comes with every document." bordered>
        <ProductChecklist items={included} />
      </ProductSection>

      <SplitStory eyebrow="In fairness" title="What invoicing doesn't do.">
        <p>
          There is no e-invoicing through the GST portal, no e-way bills and no filing of returns. The
          GSTR-1 export is laid out the way the return asks, but check it with your accountant before you
          file.
        </p>
        <p>
          Payment is by UPI or bank transfer, and you mark an invoice Paid yourself; card payment links are
          planned. There are no recurring invoices either, so a monthly retainer is one Duplicate away
          rather than automatic.
        </p>
      </SplitStory>

      <OrbitStrip
        body="Describe the invoice in a sentence, or attach a photo or PDF of a purchase order, and Orbit drafts the client, items, tax and due date. Ask for a discount or a new line and it changes only that, then suggests HSN codes and GST rates before you send."
        examples={[
          "Invoice Acme for 3 days of consulting at 8,000 a day",
          "Give 10% off and make it due on the 30th",
          "Check the GST and HSN codes",
        ]}
      />

      <ProductFaq faqs={faqs} idPrefix="invoicing-faq" />

      <RelatedProducts hrefs={["/forms", "/analytics", "/reports"]} />

      <Cta
        title="Send your first invoice today."
        body="Invoicing is free in every workspace, alongside your analytics and forms. No card, and no separate billing tool."
        secondary={{ label: "Read the docs", href: "/docs/quantalog-invoicing" }}
        location="invoicing_cta"
      />

      <p className="mx-auto max-w-6xl px-4 pb-10 text-center text-[13px] text-fg-faint sm:px-6">
        Published <time dateTime={PUBLISHED}>{formatDate(PUBLISHED)}</time>. Last updated{" "}
        <time dateTime={MODIFIED}>{formatDate(MODIFIED)}</time>.
      </p>
    </>
  );
}
