import type { Metadata } from "next";
import {
  CalendarClock,
  FileSpreadsheet,
  MessageCircle,
  MessageSquareText,
  PauseCircle,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";
import { FeatureHero } from "@/components/feature-hero";
import { BigStats } from "@/components/big-stats";
import { SplitStory } from "@/components/split-story";
import { Cta } from "@/components/sections/cta";
import { ReportVisual } from "@/components/more/report-visual";
import { ProductSection } from "@/components/product/product-section";
import { ProductFeatureGrid } from "@/components/product/product-feature-grid";
import { ProductChecklist } from "@/components/product/product-checklist";
import { ProductFaq } from "@/components/product/product-faq";
import { RelatedProducts } from "@/components/product/related-products";
import { ReportInboxPreview } from "@/components/product/report-inbox-preview";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

const PUBLISHED = "2025-11-01";
const MODIFIED = "2026-08-09";

const DESCRIPTION =
  "Automated analytics reports by email and WhatsApp. Send a scheduled traffic and SEO summary to clients or your team — opening with a plain-language AI read of what changed and why, headline numbers in the body, the full breakdown attached as an XLSX spreadsheet, no dashboard login required.";

const capabilities = [
  {
    icon: MessageSquareText,
    title: "It reads the numbers for them",
    body: "Every report opens with two or three sentences in plain language: what moved, the likely reason, and one thing worth doing about it. A client who would never interpret a bounce rate still learns their traffic spike came from Reddit and did not stick. Labelled as an AI summary, and switchable off per report.",
  },
  {
    icon: Users,
    title: "For the people who never log in",
    body: "Send to a client, a manager, a stakeholder — no account, no seat, no licence. The recipient reads the numbers in their inbox and never touches the dashboard. Every email carries its own unsubscribe link.",
  },
  {
    icon: FileSpreadsheet,
    title: "The full detail, attached",
    body: "A spreadsheet rides along with every send. Top pages, referrers, channels, countries, devices, goals and SEO scores, each on its own sheet — ready to pivot, chart or paste into a deck.",
  },
  {
    icon: CalendarClock,
    title: "Daily, weekly or monthly",
    body: "Pick the rhythm the work is actually reviewed on. A daily pulse during a launch, a monthly summary for a retainer client — each report keeps its own schedule and recipient list.",
  },
  {
    icon: MessageCircle,
    title: "Email and WhatsApp",
    body: "The full report and its spreadsheet go by email. A short version lands on your own WhatsApp the moment it sends, so you know what your client just read before they reply.",
  },
  {
    icon: PauseCircle,
    title: "Pause without losing setup",
    body: "A project goes quiet, the report pauses and keeps every setting — recipients, sections, schedule. Resume it months later and nothing needs rebuilding.",
  },
  {
    icon: Send,
    title: "Send yourself a test first",
    body: "Fire a one-off copy to your own address and read exactly what the client will get, before a schedule ever runs.",
  },
  {
    icon: ShieldCheck,
    title: "Sharing without oversharing",
    body: "A report holds only what you put in it. Site keys, settings, team members and raw events are never sent, and removing a recipient stops the next report immediately.",
  },
];

const stats = [
  { value: "0", label: "Logins for recipients" },
  { value: "2", label: "Channels — email & WhatsApp" },
  { value: "3", label: "Schedules to choose from" },
  { value: "9", label: "Sections in every report" },
] as const;

const included = [
  "A plain-language AI summary of what changed and why, above the numbers",
  "Visitors, pageviews, sessions and bounce rate, each against the previous period",
  "Top pages and entry pages",
  "Referrers, channels and UTM campaigns",
  "Countries, devices and browsers",
  "Conversion goals and their rates",
  "Custom events, with revenue where you send it",
  "SEO audit scores and what changed since the last run",
  "Core Web Vitals for mobile and desktop",
];

const faqs = [
  {
    q: "Can I send analytics reports to clients without giving them a login?",
    a: "Yes — that is what the feature is for. A recipient needs no account and occupies no seat. They receive the email, read the headline numbers and open the attached spreadsheet if they want the detail.",
  },
  {
    q: "What is the AI summary in a report?",
    a: "Two or three sentences at the top of the email explaining what changed over the period, the most likely reason for it, and one thing worth doing. It is written by a language model reading only your own figures from that report, and it is labelled as an AI summary so recipients know it is interpretation rather than measurement. It is on by default and can be switched off per report.",
  },
  {
    q: "Is my analytics data sent anywhere to generate the summary?",
    a: "Only the figures already in that report — the headline numbers and the top breakdowns — are sent to the model that writes the paragraph. No raw visitor records, nothing from other workspaces, and nothing that identifies an individual visitor. Turning the AI summary off for a report means nothing from it is sent at all.",
  },
  {
    q: "What format is the attachment?",
    a: "XLSX, readable by Excel, Numbers, LibreOffice and Google Sheets. Each dimension gets its own sheet rather than one flat dump, so a client can sort and pivot without cleaning the file first.",
  },
  {
    q: "How often can reports go out?",
    a: "Daily, weekly or monthly. Each report has its own schedule, so a daily pulse for one site and a monthly summary for another can run side by side from the same workspace.",
  },
  {
    q: "Do reports include SEO data as well as traffic?",
    a: "Yes. Audit scores, what changed since the previous run, and Core Web Vitals for mobile and desktop sit in the same report as the traffic numbers — which is the point of having both in one tool.",
  },
  {
    q: "Can I stop a report without deleting it?",
    a: "Pause it. Recipients, sections and schedule are all kept, and resuming picks up exactly where it left off.",
  },
];

export const metadata: Metadata = {
  title: "Automated analytics reports by email and WhatsApp",
  description: DESCRIPTION,
  alternates: { canonical: "/reports" },
  other: {
    "article:published_time": PUBLISHED,
    "article:modified_time": MODIFIED,
  },
  keywords: [
    "automated analytics reports",
    "scheduled analytics email",
    "client reporting tool",
    "white label client reporting",
    "agency analytics reporting",
    "WhatsApp analytics report",
    "analytics report spreadsheet export",
    "AI analytics summary",
    "recurring traffic report",
    "no-login client dashboard",
  ],
  openGraph: {
    type: "website",
    url: `${site.url}/reports`,
    title: "Automated analytics reports by email and WhatsApp",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Automated analytics reports by email and WhatsApp",
    description: DESCRIPTION,
  },
};

export default function ReportsPage() {
  const jsonLd = graph(
    {
      "@type": "WebPage",
      "@id": `${site.url}/reports#page`,
      name: "Automated analytics reports by email and WhatsApp",
      description: DESCRIPTION,
      url: `${site.url}/reports`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
      primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}/new-og-image.webp` },
    },
    service({
      path: "/reports",
      name: "Automated analytics reports by email and WhatsApp",
      description: DESCRIPTION,
      serviceType: "Analytics reporting",
    }),
    article({
      path: "/reports",
      headline: "Automated analytics reports by email and WhatsApp",
      description: DESCRIPTION,
      published: PUBLISHED,
      modified: MODIFIED,
    }),
    {
      "@type": "FAQPage",
      "@id": `${site.url}/reports#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Reports", path: "/reports" },
    ])
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      <FeatureHero
        eyebrow="Reports"
        title={
          <>
            Automated analytics reports,
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">delivered where people read.</span>
          </>
        }
        description={DESCRIPTION}
        primary={{ label: "Start free — no card" }}
        secondary={{ label: "Read the docs", href: "/docs/email-reports" }}
        visual={<ReportVisual />}
        tone="slate"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-y border-border py-12 sm:py-16">
          <BigStats stats={stats} />
        </div>
      </div>

      <ProductSection
        eyebrow="What a report does"
        title="The report that reads itself."
        body="Headline numbers, a plain-language read of what changed, and the full detail attached — sent on your schedule to people who never open a dashboard."
      >
        <ProductFeatureGrid features={capabilities} columns={4} />
      </ProductSection>

      <ProductSection
        eyebrow="In the inbox"
        title="What your client actually sees."
        body="A monthly report for one site, with every number stated against the period before it — so a client reads the direction, not just the total."
        bordered
      >
        <ReportInboxPreview />
      </ProductSection>

      <ProductSection eyebrow="In every report" title="Nine sections. Zero setup." bordered>
        <ProductChecklist items={included} />
      </ProductSection>

      <SplitStory
        eyebrow="One send"
        title="Traffic and SEO, in the same email."
        link={{ label: "What the SEO audit checks", href: "/seo-audits" }}
      >
        <p>
          A report is not two attachments from two tools. Audit scores and what moved since the last run
          sit in the same email as the visitor numbers, because the person reading it wants one answer
          about how the site is doing — not a reconciliation exercise.
        </p>
      </SplitStory>

      <ProductFaq faqs={faqs} idPrefix="reports-faq" />

      <RelatedProducts hrefs={["/analytics", "/seo-audits", "/search-visibility"]} />

      <Cta
        title="Set one up in a couple of minutes."
        body="Scheduled reports are included on every plan, including the free tier. Pick a site, a rhythm and a recipient list, and send yourself a test copy first."
        secondary={{ label: "Read the docs", href: "/docs/email-reports" }}
        location="reports_cta"
      />
    </>
  );
}
