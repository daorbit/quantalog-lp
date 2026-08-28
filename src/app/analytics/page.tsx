import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Eyebrow } from "@/components/ui";
import { Analytics } from "@/components/sections/analytics";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

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
  openGraph: {
    type: "website",
    url: `${site.url}/analytics`,
    title: "Real-time web analytics dashboard",
    description: DESCRIPTION,
    images: ["/OgImage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real-time web analytics dashboard",
    description: DESCRIPTION,
    images: ["/OgImage.png"],
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
    <div className="mx-auto max-w-5xl px-5 py-16">
      <JsonLd data={jsonLd} />

      <header className="max-w-3xl border-b border-border pb-12">
        <Eyebrow>Analytics</Eyebrow>
        <h1 className="mt-4 text-balance text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[3rem]">
          Every number, from every visit.
          <br className="hidden sm:block" />{" "}
          <span className="text-accent">Nothing sampled.</span>
        </h1>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-fg-muted">
          {DESCRIPTION}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={`${site.app}/signup`} size="lg">
            Start free
          </Button>
          <Button href={`${site.app}/login`} variant="secondary" size="lg">
            See the live demo
          </Button>
        </div>
      </header>

      <Analytics />

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
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
        <p className="text-pretty leading-relaxed text-fg-muted">
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
