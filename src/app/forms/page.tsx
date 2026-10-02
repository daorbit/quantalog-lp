import type { Metadata } from "next";
import {
  Code2,
  CreditCard,
  Eye,
  GitBranch,
  LayoutGrid,
  Link2,
  Palette,
  ShieldCheck,
  Table2,
  TrendingDown,
  Workflow,
} from "lucide-react";
import { FeatureHero } from "@/components/feature-hero";
import { OrbitStrip } from "@/components/orbit-strip";
import { BigStats } from "@/components/big-stats";
import { SplitStory } from "@/components/split-story";
import { Cta } from "@/components/sections/cta";
import { FieldVisual } from "@/components/explore/visuals/field-visual";
import { FormBuilderPreview } from "@/components/form-builder-preview";
import { BuildFlowShowcase } from "@/components/build-flow-showcase";
import { ProductSection } from "@/components/product/product-section";
import { ProductFeatureGrid } from "@/components/product/product-feature-grid";
import { ProductChecklist } from "@/components/product/product-checklist";
import { ProductFaq } from "@/components/product/product-faq";
import { RelatedProducts } from "@/components/product/related-products";
import { FormDropoffPreview } from "@/components/product/form-dropoff-preview";
import { FormIntegrations } from "@/components/product/form-integrations";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/blog";

const PUBLISHED = "2025-11-01";
const MODIFIED = "2026-08-29";

const META_DESCRIPTION =
  "Drag-and-drop form builder with analytics attached. Multi-step forms, conditional logic, Razorpay, Cashfree and PayU payments, and per-field drop-off you can actually see.";

const DESCRIPTION =
  "A drag-and-drop form builder with the analytics already attached. Build multi-step forms with conditional logic, take payments through your own Razorpay, Cashfree or PayU account, embed them anywhere, and see exactly which field people abandon — because a form you cannot measure is a funnel you are guessing at.";

const capabilities = [
  {
    icon: LayoutGrid,
    title: "Forty-odd field types, dragged into place",
    body: "Names, addresses, phones and emails with their own validation. Ratings, sliders, file uploads, date and time pickers, consent boxes, signature pads and generated identifiers. Multi-column layouts, so a first and last name sit side by side instead of stacked down the page.",
  },
  {
    icon: CreditCard,
    title: "Take payments, into your own account",
    body: "A payment field turns a form into a checkout: registration fees, deposits, paid applications, donations. Charge a fixed amount, a price that follows an earlier answer, or whatever the respondent chooses to pay. Money moves through your own Razorpay, Cashfree or PayU account and lands with you, not with us — and a response is only recorded once the payment actually clears.",
  },
  {
    icon: GitBranch,
    title: "Conditional logic",
    body: "Show a field only when an earlier answer calls for it. A support form that asks for an order number only from people who picked \"problem with an order\" is shorter for everyone else — and length is the single largest cause of abandonment.",
  },
  {
    icon: Workflow,
    title: "Multi-step, with a progress bar",
    body: "Split a long form into pages that validate as people advance. Twelve fields behind three steps convert better than twelve fields on one screen, and the step indicator is what tells someone the end is in sight.",
  },
  {
    icon: Palette,
    title: "Themed to look like your site",
    body: "Colours, backgrounds, fonts, button size and alignment, label placement — set per form. An embedded form that looks like a third-party widget gets treated like one.",
  },
  {
    icon: Code2,
    title: "Embed anywhere, or share a link",
    body: "One iframe snippet drops the form into any page on any stack. Or send the hosted link — the form works standalone, with no site required.",
  },
  {
    icon: Table2,
    title: "Entries as a board or a spreadsheet",
    body: "Responses land in a kanban board you can move through review stages, export as CSV, or open individually and save as PDF for the person who needs a copy.",
  },
  {
    icon: ShieldCheck,
    title: "Spam handled without a CAPTCHA",
    body: "A honeypot field bots fill and people never see, plus per-IP rate limiting — both on by default, because a CAPTCHA is itself a field people abandon at.",
  },
];

const whyMeasured = [
  {
    icon: Eye,
    title: "Views, not just submissions",
    body: "Every form load is recorded, so a completion rate is a real ratio rather than a number divided by a guess. A form with 40 submissions means nothing until you know whether 60 people saw it or 6,000.",
  },
  {
    icon: TrendingDown,
    title: "Where people stop",
    body: "Per-field drop-off shows which question ends the session. It is almost never the one you would guess — phone numbers, salary ranges and anything asking for an ID are the usual culprits.",
  },
  {
    icon: Link2,
    title: "Where they came from",
    body: "Every submission records the page it came from, so you can tell which landing page, campaign or blog post actually produces responses rather than traffic.",
  },
];

const stats = [
  { value: "40+", label: "Field types" },
  { value: "3", label: "Payment gateways" },
  { value: "0", unit: "%", label: "Commission on payments" },
  { value: "0", label: "CAPTCHAs shown" },
] as const;

const included = [
  "Per-form views, submissions and completion rate",
  "Per-field drop-off, so you can see which question loses people",
  "Source URL on every submission",
  "Payments through your own Razorpay, Cashfree or PayU account — fixed, priced by answer, or respondent-chosen",
  "Notification email through Brevo or your own SMTP server, plus submission webhooks",
  "Conditional logic — show or hide a field on an earlier answer",
  "Multi-step forms with per-step validation and a progress indicator",
  "Honeypot spam trap and per-IP rate limiting on every public form",
  "CSV export of all entries, PDF export of any single submission",
  "Kanban review board for moving entries through stages",
  "Full theming — colours, fonts, backgrounds, layout and button styling",
  "Embed by iframe, or share the hosted link",
];

const faqs = [
  {
    q: "How is this different from Google Forms or Typeform?",
    a: "The analytics. Standalone form builders report how many people submitted; they cannot tell you how many arrived and left, or which field they left on, because they do not measure the page the form sits in. Quantalog records views and per-field drop-off alongside the rest of your site traffic, so a form is a funnel you can actually see rather than a submission counter.",
  },
  {
    q: "Do forms need a cookie consent banner?",
    a: "No. Forms follow the same cookieless model as the rest of Quantalog — nothing is stored in the visitor's browser to measure a view or a submission. The data a respondent types is of course stored, because that is what they filled the form in for, and IP collection for submissions is off by default and switchable per form.",
  },
  {
    q: "Can I embed a form on a site that Quantalog does not track?",
    a: "Yes. The embed is a plain iframe and works on any stack, tracked or not. Form views and submissions are recorded either way; the form's own analytics do not depend on the page around it running the tracker.",
  },
  {
    q: "What stops spam submissions?",
    a: "Two things, both on by default: a honeypot field that is invisible to people and irresistible to bots, and per-IP rate limiting on the public submission endpoint. Neither shows a CAPTCHA to a real respondent, because a CAPTCHA is itself a drop-off point.",
  },
  {
    q: "How do payments work, and do you take a cut?",
    a: "You connect your own gateway account once per workspace — Razorpay, Cashfree or PayU — and every paid form in it charges through those keys. The money goes directly to you: it never passes through Quantalog, and we take nothing beyond your normal plan. The gateway's fees are between you and them.",
  },
  {
    q: "What happens if someone abandons the payment?",
    a: "Nothing is charged and no response is recorded. Their answers stay on screen so they can try again without retyping, and the abandoned attempt is cleared automatically rather than sitting in your entries as a lead that never paid. A response is only confirmed once the gateway tells us the money arrived — not when the browser says so.",
  },
  {
    q: "Can respondents upload files?",
    a: "Yes — file, image and media upload fields are available, and uploads arrive attached to the submission alongside the rest of the answers.",
  },
  {
    q: "Can I see an individual response rather than a table?",
    a: "Yes. Any entry opens on its own, and exports to PDF from there — which is what you want when someone asks for a copy of what a particular person submitted. The full set exports as CSV.",
  },
];

export const metadata: Metadata = {
  title: "Form builder with built-in form analytics",
  description: META_DESCRIPTION,
  alternates: { canonical: "/forms" },
  keywords: [
    "form builder",
    "online form builder",
    "form analytics",
    "form drop-off tracking",
    "form abandonment analytics",
    "conditional logic forms",
    "multi-step form builder",
    "embeddable forms",
    "Typeform alternative",
    "Google Forms alternative",
  ],
  other: {
    "article:published_time": PUBLISHED,
    "article:modified_time": MODIFIED,
  },
  openGraph: {
    type: "website",
    url: `${site.url}/forms`,
    title: "Form builder with built-in form analytics",
    description: META_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Form builder with built-in form analytics",
    description: META_DESCRIPTION,
  },
};

export default function FormsPage() {
  const jsonLd = graph(
    {
      "@type": "WebPage",
      "@id": `${site.url}/forms#page`,
      name: "Form builder with built-in form analytics",
      description: DESCRIPTION,
      url: `${site.url}/forms`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
      primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}/new-og-image.webp` },
    },
    service({
      path: "/forms",
      name: "Form builder with built-in form analytics",
      description: DESCRIPTION,
      serviceType: "Form builder",
    }),
    article({
      path: "/forms",
      headline: "Form builder with built-in form analytics",
      description: DESCRIPTION,
      published: PUBLISHED,
      modified: MODIFIED,
    }),
    {
      "@type": "FAQPage",
      "@id": `${site.url}/forms#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Forms", path: "/forms" },
    ])
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      <FeatureHero
        eyebrow="Forms"
        title={
          <>
            Every form is a funnel.
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">Most are invisible ones.</span>
          </>
        }
        description={DESCRIPTION}
        primary={{ label: "Build a form free" }}
        secondary={{ label: "Read the docs", href: "/docs/lead-capture" }}
        visual={<FieldVisual />}
        tone="amber"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-y border-border py-12 sm:py-16">
          <BigStats stats={stats} />
        </div>
      </div>

      <ProductSection
        eyebrow="The builder"
        title="Drag it together in minutes."
        body="A palette of field types on the left, your form taking shape on the right — with validation, layout and logic set as you go."
      >
        <FormBuilderPreview />
      </ProductSection>

      <ProductSection
        eyebrow="Start anywhere"
        title="However you start it, however it lives."
        body="Describe it to Orbit, pick a template, or paste a config copied from another form. Then decide where it lives — a page of its own, or a card embedded in one you already have."
        bordered
      >
        <BuildFlowShowcase />
      </ProductSection>

      <ProductSection
        eyebrow="Why measure"
        title="A submission count is half a number."
        body="A form builder tells you how many people submitted. That cannot tell you whether the form is working, because it is missing the denominator and everything in between."
        bordered
      >
        <ProductFeatureGrid features={whyMeasured} columns={3} />
        <div className="mt-3 sm:mt-4">
          <FormDropoffPreview />
        </div>
      </ProductSection>

      <ProductSection
        eyebrow="What you can build"
        title="Everything a form needs."
        body="From a two-field contact form to a paid, multi-step application — themed to your site and embedded anywhere."
        link={{ label: "Read the forms docs", href: "/docs/lead-capture" }}
        bordered
      >
        <ProductFeatureGrid features={capabilities} columns={4} />
      </ProductSection>

      <ProductSection
        eyebrow="Integrations"
        title="Connects to what you already pay for."
        body="Keys live in your workspace. We hold no merchant account and send no mail on your behalf — a form charges through your gateway and notifies through your mailer."
        bordered
      >
        <FormIntegrations />
      </ProductSection>

      <ProductSection eyebrow="Included" title="What comes with every form." bordered>
        <ProductChecklist items={included} />
      </ProductSection>

      <SplitStory eyebrow="In fairness" title="What forms don't do.">
        <p>
          There is no approval workflow with assignees and due dates, no recurring billing, and no legally
          binding e-signature — the signature field captures a drawn signature, which is not the same as a
          document routed for signing and audited.
        </p>
        <p>
          Payments are one-off, and refunds are issued from your payment gateway&apos;s dashboard rather
          than here. If you need subscriptions or a document sent for countersigning, a dedicated tool will
          serve you better.
        </p>
      </SplitStory>

      <OrbitStrip
        body="Describe the form and Orbit drafts it — fields, validation and the multi-step split. Once responses arrive it reads the free-text answers back to you as themes rather than a spreadsheet you have to sit and skim."
        examples={[
          "Build a three-step onboarding form",
          "What are people complaining about?",
          "Which field loses the most people?",
        ]}
      />

      <ProductFaq faqs={faqs} idPrefix="forms-faq" />

      <RelatedProducts hrefs={["/analytics", "/reports", "/social"]} />

      <Cta
        title="Build one and watch what happens."
        body="The free tier includes forms, their analytics and everything on this page. No card, and no separate subscription from your analytics."
        secondary={{ label: "Read the docs", href: "/docs/lead-capture" }}
        location="forms_cta"
      />

      <p className="mx-auto max-w-6xl px-4 pb-10 text-center text-[13px] text-fg-faint sm:px-6">
        Published <time dateTime={PUBLISHED}>{formatDate(PUBLISHED)}</time>. Last updated{" "}
        <time dateTime={MODIFIED}>{formatDate(MODIFIED)}</time>.
      </p>
    </>
  );
}
