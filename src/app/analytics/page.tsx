import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { FeatureHero } from "@/components/feature-hero";
import { AnalyticsHeroVisual } from "@/components/feature-hero-visuals";
import { Analytics } from "@/components/sections/analytics";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

/** Kept beside the Article node so the tag and the schema can never disagree. */
const PUBLISHED = "2025-11-01";
const MODIFIED = "2026-08-09";

/**
 * The analytics deep-dive, as a page rather than a homepage section.
 *
 * "Real-time analytics", "funnel analysis tool" and "retention cohort report"
 * are their own searches, and the homepage — which has to make the
 * privacy-first argument first — cannot rank for all of them at once. This
 * page carries the dashboard on its own title and H1, and keeps the homepage
 * short by lifting the chart wall out of it.
 */

const DESCRIPTION =
  "Real-time, cookieless web analytics: a live visitor dashboard, funnels and conversion goals, retention cohorts, and breakdowns by device, browser, country and hour of day — no consent banner, no sampling.";

const faqs = [
  {
    q: "How real-time is the dashboard?",
    a: "Visitors appear within a couple of seconds of the pageview. The live count and the last-five-minutes view update on their own; the rest of the dashboard refreshes when you open it or hit refresh.",
  },
  {
    q: "Do funnels and cohorts cost extra?",
    a: "No. Funnels, goals, retention cohorts and every breakdown are on every plan, including the free tier — the limit is on pageviews per month, not on features.",
  },
  {
    q: "Is the data sampled?",
    a: "Never. Every figure is computed from every event in the range you picked. A tool that samples is guessing, and guesses do not belong in a report you hand to someone.",
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
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
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
        visual={<AnalyticsHeroVisual />}
      />

      {/* The chart wall — same component the homepage uses; it carries its own
          inner max-width, so it sits inside the page column without a wrapper. */}
      <Analytics />

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-tight">
          Common questions
        </h2>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <div key={f.q} className="py-6">
              <dt className="font-semibold tracking-tight">{f.q}</dt>
              <dd className="mt-2.5 text-pretty leading-relaxed text-fg-muted">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16">
        <p className="max-w-2xl text-pretty leading-relaxed text-fg-muted">
          Traffic is half the picture. The other half is whether search can find
          the site at all.
        </p>
        <Link
          href="/seo-audits"
          className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          See what the SEO audit checks
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </section>

      <section className="card mt-16 p-8 text-center">
        <h2 className="text-[1.5rem] font-bold tracking-[-0.02em]">
          One script tag, live in a minute
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-pretty leading-relaxed text-fg-muted">
          The free tier covers 10k pageviews a month, forever. Add the snippet,
          watch the first visitor land, decide later.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={`${site.app}/signup`}>Start free</Button>
          <Button href={`${site.app}/login`} variant="secondary">
            See the live demo
          </Button>
        </div>
      </section>
    </div>
  );
}
