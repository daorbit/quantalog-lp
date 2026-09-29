import type { Metadata } from "next";
import {
  AlertTriangle,
  BookmarkPlus,
  CalendarRange,
  Download,
  Filter,
  GitCompareArrows,
  Link2,
  MousePointerClick,
  Repeat,
  Share2,
  Split,
  Target,
} from "lucide-react";
import { FeatureHero } from "@/components/feature-hero";
import { OrbitStrip } from "@/components/orbit-strip";
import { BigStats } from "@/components/big-stats";
import { SplitStory } from "@/components/split-story";
import { Analytics } from "@/components/sections/analytics";
import { Cta } from "@/components/sections/cta";
import { ProductSection } from "@/components/product/product-section";
import { ProductFeatureGrid, type ProductFeature } from "@/components/product/product-feature-grid";
import { ProductFaq } from "@/components/product/product-faq";
import { RelatedProducts } from "@/components/product/related-products";
import { LiveDashboardVisual } from "@/components/product/visuals/live-dashboard-visual";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

const PUBLISHED = "2025-11-01";
const MODIFIED = "2026-09-29";

const DESCRIPTION =
  "Real-time, cookieless web analytics: a live visitor dashboard, funnels and conversion goals, retention cohorts, and breakdowns by device, browser, country and hour of day — no consent banner, no sampling.";

const stats = [
  { value: "<1", unit: "KB", label: "Tracker size" },
  { value: "~3", unit: "s", label: "To your first pageview" },
  { value: "0", label: "Cookies set" },
  { value: "100", unit: "%", label: "Of events counted" },
] as const;

const features: ProductFeature[] = [
  {
    icon: Split,
    title: "Funnels",
    body: "Measure conversion through an ordered sequence of pages and events, and see exactly where people drop off.",
    href: "/docs/funnels",
  },
  {
    icon: Target,
    title: "Conversions & goals",
    body: "Define goals from pages or events and track their conversion rate over any window.",
    href: "/docs/conversions",
  },
  {
    icon: Repeat,
    title: "Retention cohorts",
    body: "Weekly cohorts show whether visitors come back, and how sticky each one is.",
    href: "/docs/retention",
  },
  {
    icon: MousePointerClick,
    title: "Custom events",
    body: "Track signups, purchases and any other action with one line of code.",
    href: "/docs/custom-events",
  },
  {
    icon: Filter,
    title: "Filters & segments",
    body: "Click any breakdown to re-scope the whole dashboard, and stack filters to answer narrower questions.",
    href: "/docs/filters",
  },
  {
    icon: GitCompareArrows,
    title: "Period comparisons",
    body: "Measure every metric against the previous period, last year, or any baseline you choose.",
    href: "/docs/comparisons",
  },
  {
    icon: Link2,
    title: "Channels",
    body: "Traffic grouped by how it arrived — direct, organic search, paid, social, email and referral.",
    href: "/docs/channels",
  },
  {
    icon: Download,
    title: "Outbound & downloads",
    body: "Clicks that leave your site and file downloads are tracked automatically.",
    href: "/docs/outbound",
  },
  {
    icon: AlertTriangle,
    title: "Error tracking",
    body: "Uncaught JavaScript errors and broken resources surface per page, straight from the tracker.",
    href: "/docs/error-tracking",
  },
  {
    icon: CalendarRange,
    title: "Date ranges & export",
    body: "Scope any view to a custom range and download the raw events as Excel or CSV.",
    href: "/docs/exporting",
  },
  {
    icon: Share2,
    title: "Public dashboards",
    body: "Share a read-only view at a link anyone can open, with control over which panels show.",
    href: "/docs/public-dashboards",
  },
  {
    icon: BookmarkPlus,
    title: "Saved segments & markers",
    body: "Save the filters you use often and annotate charts with deploys, campaigns and incidents.",
    href: "/docs/segments-markers",
  },
];

const faqs = [
  {
    q: "How real-time is the dashboard?",
    a: "Visitors appear within a couple of seconds of the pageview. The live count and the last-five-minutes view update on their own; the rest of the dashboard refreshes when you open it or hit refresh.",
  },
  {
    q: "Do funnels and cohorts cost extra?",
    a: "No. Funnels, goals, retention cohorts and every breakdown are on every plan, including the free tier — the limit is on events per month, not on features.",
  },
  {
    q: "Is the data sampled?",
    a: "Never. Every figure is computed from every event in the range you picked. A tool that samples is guessing, and guesses do not belong in a report you hand to someone.",
  },
  {
    q: "Does it work with single-page apps?",
    a: "Yes. The tracker patches history.pushState, so route changes in React, Next.js, Vue and other single-page apps are reported as pageviews without extra code.",
  },
  {
    q: "Can I share a dashboard with a client?",
    a: "Yes. Publish a read-only public dashboard at a link anyone can open — no account or login — and choose which panels are visible.",
  },
  {
    q: "Can I get my raw data out?",
    a: "Any view can be scoped to a custom date range and the underlying events downloaded as Excel or CSV, whenever you like.",
  },
];

export const metadata: Metadata = {
  title: "Real-time web analytics dashboard",
  description: DESCRIPTION,
  alternates: { canonical: "/analytics" },
  other: {
    "article:published_time": PUBLISHED,
    "article:modified_time": MODIFIED,
  },
  keywords: [
    "real-time analytics",
    "real-time web analytics dashboard",
    "cookieless analytics",
    "funnel analysis tool",
    "conversion goal tracking",
    "retention cohort analysis",
    "unsampled analytics",
    "privacy-first analytics",
    "live visitor dashboard",
    "Google Analytics alternative",
  ],
  openGraph: {
    type: "website",
    url: `${site.url}/analytics`,
    title: "Real-time web analytics dashboard",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Real-time web analytics dashboard",
    description: DESCRIPTION,
  },
};

export default function AnalyticsPage() {
  const jsonLd = graph(
    {
      "@type": "WebPage",
      "@id": `${site.url}/analytics#page`,
      name: "Real-time web analytics dashboard",
      description: DESCRIPTION,
      url: `${site.url}/analytics`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    service({
      path: "/analytics",
      name: "Real-time web analytics dashboard",
      description: DESCRIPTION,
      serviceType: "Web analytics",
    }),
    article({
      path: "/analytics",
      headline: "Real-time web analytics dashboard",
      description: DESCRIPTION,
      published: PUBLISHED,
      modified: MODIFIED,
    }),
    {
      "@type": "FAQPage",
      "@id": `${site.url}/analytics#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Analytics", path: "/analytics" },
    ])
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      <FeatureHero
        eyebrow="Analytics"
        title={
          <>
            Every number, from every visit.
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">Nothing sampled.</span>
          </>
        }
        description={DESCRIPTION}
        primary={{ label: "Start free" }}
        secondary={{ label: "See the live demo" }}
        visual={<LiveDashboardVisual />}
        tone="teal"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-y border-border py-12 sm:py-16">
          <BigStats stats={stats} />
        </div>
      </div>

      <Analytics />

      <ProductSection
        eyebrow="Everything included"
        title="Every report, on every plan."
        body="No add-ons and no feature gates — the free plan gets the same reports as Pro. Plans differ only in how many events they record."
        link={{ label: "Read the analytics docs", href: "/docs/tracking" }}
        bordered
      >
        <ProductFeatureGrid features={features} columns={4} />
      </ProductSection>

      <SplitStory
        eyebrow="Why it's different"
        title="Complete numbers, the moment they happen."
        link={{ label: "How the privacy model works", href: "/docs/privacy" }}
      >
        <p>
          <span className="font-semibold text-fg">Nobody declines, so nobody is missing.</span> Quantalog
          sets no cookies and stores nothing in the browser, so there is no consent banner to click away —
          and no visitor who quietly drops out of your report.
        </p>
        <p>
          <span className="font-semibold text-fg">Nothing is sampled or estimated.</span> Every figure is
          computed from every event in the range you choose, however large the site or the date range.
        </p>
        <p>
          <span className="font-semibold text-fg">And it is live.</span> A visit appears within seconds,
          not after an overnight processing job — so you can watch a launch land instead of reading about
          it tomorrow.
        </p>
      </SplitStory>

      <OrbitStrip
        body="Orbit is in the dashboard on every page. It explains what a metric means, why a number moved, and which breakdown answers the question you are actually asking — without you learning where each report lives first."
        examples={[
          "Why did traffic drop on Tuesday?",
          "Which page loses the most visitors?",
          "What counts as a bounce here?",
        ]}
      />

      <ProductFaq faqs={faqs} idPrefix="analytics-faq" />

      <RelatedProducts hrefs={["/seo-audits", "/search-visibility", "/reports"]} />

      <Cta
        title="One script tag, live in a minute."
        body="The Free plan covers 10,000 events a month, forever. Add the snippet, watch the first visitor land, decide later."
        secondary={{ label: "See the live demo", href: "/docs/demo" }}
        location="analytics_cta"
      />
    </>
  );
}
