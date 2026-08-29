import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Braces,
  CheckCircle2,
  FileSearch,
  Gauge,
  Layers,
  Link2Off,
  Share2,
  Swords,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui";
import { FeatureHero } from "@/components/feature-hero";
import { SeoHeroVisual } from "@/components/feature-hero-visuals";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

/** Kept beside the Article node so the tag and the schema can never disagree. */
const PUBLISHED = "2025-11-01";
const MODIFIED = "2026-08-09";

/**
 * SEO audits, as a page rather than a homepage section.
 *
 * "SEO audit tool", "free Lighthouse report" and "broken link checker" are
 * queries with their own intent, typed by people who are not yet shopping for
 * analytics. A #seo anchor on a homepage about privacy-first tracking cannot
 * answer them; this page can, and it is also the natural landing spot for
 * anyone comparing audit tools.
 */

const DESCRIPTION =
  "A free SEO audit tool built into your analytics. Run Lighthouse scores, meta tag and heading checks, structured data validation, broken link detection and Core Web Vitals against any page you already track — with history, so a fix is provable.";

const checks = [
  {
    icon: Gauge,
    title: "Lighthouse, scored and kept",
    body: "Performance, accessibility, best practices and SEO, measured on the mobile profile Google indexes with. Every run is stored, so a fix is provable rather than assumed.",
  },
  {
    icon: FileSearch,
    title: "Meta tags and content",
    body: "Titles and descriptions measured against the lengths search results actually display, heading structure, keyword density, readability, and every image missing alt text.",
  },
  {
    icon: Link2Off,
    title: "Broken links, found first",
    body: "Every link on the page is followed and checked, so dead ends and redirect chains surface in your dashboard instead of in a customer's tab.",
  },
  {
    icon: Braces,
    title: "Structured data, validated",
    body: "Your JSON-LD checked against schema.org: what breaks a rich result outright, and the optional properties that would make one stronger.",
  },
  {
    icon: Layers,
    title: "Whole-site crawl",
    body: "A crawl reads your sitemap and checks up to 30 pages at once, finding what a single-page audit cannot — duplicate titles, thin pages, orphaned URLs and sitemap entries that no longer load.",
  },
  {
    icon: TrendingUp,
    title: "Core Web Vitals, field and lab",
    body: "LCP, CLS and INP for mobile and desktop, from both the Lighthouse run and real-user field data where Google has enough of it for your domain.",
  },
  {
    icon: Swords,
    title: "Competitors side by side",
    body: "Add up to three competitor pages and compare titles, headings, content depth and structured data against yours, scored on the same on-page signals.",
  },
  {
    icon: Share2,
    title: "Reports you can hand over",
    body: "Publish an audit at a link anyone can open — choosing section by section what is visible — or export it as a print-ready page and save it as a PDF for the person who asked.",
  },
];

const audited = [
  "Title tag, meta description and canonical URL",
  "Open Graph and Twitter card tags",
  "H1 through H6 structure and ordering",
  "Word count, keyword density and readability",
  "Images missing alt text",
  "JSON-LD structured data, validated against schema.org",
  "Internal and outbound links, each followed for broken targets",
  "Redirect chains",
  "robots.txt and sitemap presence",
  "Lighthouse performance, accessibility, best practices and SEO",
  "Core Web Vitals — LCP, CLS and INP, mobile and desktop",
  "HTTPS, viewport and mobile-friendliness",
];

const faqs = [
  {
    q: "Is the SEO audit tool free?",
    a: "Audits are included on every plan, including the free tier — there is no separate SEO subscription. The free tier covers 10,000 pageviews a month and the audit features described on this page.",
  },
  {
    q: "What does a Quantalog SEO audit check?",
    a: "The page is fetched the way a crawler reads it and run through Google Lighthouse. You get the four Lighthouse scores, meta tags measured against display lengths, heading structure and readability, images missing alt text, structured data validated against schema.org, every link followed for broken targets and redirect chains, and Core Web Vitals for mobile and desktop.",
  },
  {
    q: "How is this different from Google Search Console?",
    a: "Search Console reports what Google already observed about pages it has crawled, on Google's schedule. Quantalog audits a page on demand, right now, and puts the result next to the traffic that page is getting — which is what lets you connect a technical problem to the visitors it is costing you.",
  },
  {
    q: "Can I audit a site I do not own?",
    a: "You can add up to three competitor pages per site and compare them against yours on on-page signals — titles, headings, content depth, structured data. Full audits with Lighthouse run against sites in your own workspace.",
  },
  {
    q: "Does an audit cost me pageview quota?",
    a: "No. Audits are counted separately from tracked pageviews, and a site crawl does not run Lighthouse per page, so crawling costs no PageSpeed quota at all.",
  },
  {
    q: "Can I prove to a client that a fix worked?",
    a: "Yes — that is why every run is kept. Scores are tracked across runs with the change against the previous audit, so you can point at the number that moved and the date it moved on. Any report can be published at a link or exported to PDF.",
  },
];

export const metadata: Metadata = {
  title: "SEO audit tool with Lighthouse scores",
  description: DESCRIPTION,
  alternates: { canonical: "/seo-audits" },
  other: {
    "article:published_time": PUBLISHED,
    "article:modified_time": MODIFIED,
  },
  keywords: [
    "SEO audit tool",
    "free SEO audit",
    "Lighthouse SEO report",
    "technical SEO audit",
    "broken link checker",
    "structured data validator",
    "Core Web Vitals monitoring",
    "on-page SEO checker",
    "site crawl tool",
    "competitor SEO comparison",
  ],
  openGraph: {
    type: "website",
    url: `${site.url}/seo-audits`,
    title: "SEO audit tool with Lighthouse scores",
    description: DESCRIPTION,
    images: ["/OgImage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO audit tool with Lighthouse scores",
    description: DESCRIPTION,
    images: ["/OgImage.png"],
  },
};

export default function SeoAuditsPage() {
  const jsonLd = graph(
    {
      "@type": "WebPage",
      "@id": `${site.url}/seo-audits#page`,
      name: "SEO audit tool with Lighthouse scores",
      description: DESCRIPTION,
      url: `${site.url}/seo-audits`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    service({
      path: "/seo-audits",
      name: "SEO audit tool with Lighthouse scores",
      description: DESCRIPTION,
      serviceType: "SEO audit",
    }),
    article({
      path: "/seo-audits",
      headline: "SEO audit tool with Lighthouse scores",
      description: DESCRIPTION,
      published: PUBLISHED,
      modified: MODIFIED,
    }),
    {
      "@type": "FAQPage",
      "@id": `${site.url}/seo-audits#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "SEO audits", path: "/seo-audits" },
    ])
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
      <JsonLd data={jsonLd} />

      <FeatureHero
        eyebrow="SEO audits"
        title={
          <>
            Traffic tells you who came.
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">SEO tells you who didn&apos;t.</span>
          </>
        }
        description={DESCRIPTION}
        primary={{ label: "Run a free audit" }}
        secondary={{ label: "See a sample report" }}
        visual={<SeoHeroVisual />}
      />

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          What the audit does
        </h2>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-fg-muted">
          Audit any page on a site you already track. Quantalog reads it the way
          a crawler would, runs it through Lighthouse, and reports what is
          holding it back — in the same dashboard as your traffic, not a
          separate tool with a separate bill.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {checks.map((c, i) => (
            <Reveal
              key={c.title}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="card card-hover group p-7"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-subtle text-accent transition-all duration-200 group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-accent/10">
                <c.icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-[15px] font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          Everything checked on a single run
        </h2>
        <ul className="card mt-8 grid gap-x-8 gap-y-3 p-7 sm:grid-cols-2">
          {audited.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          Why it lives next to your traffic
        </h2>
        <div className="mt-6 space-y-5 text-pretty leading-relaxed text-fg-muted">
          <p>
            A standalone SEO tool tells you a page has a slow LCP. It cannot
            tell you that the page is your second-biggest entry point, or that
            its traffic has been sliding for three weeks. That connection is the
            whole reason to fix one thing before another, and it only exists
            when both halves are in the same product.
          </p>
          <p>
            So an audit here is scoped to a site you already track. The report
            sits beside the visitor numbers for the same URL, the scheduled
            email carries both, and the history of every run is kept so the
            question &ldquo;did that fix work?&rdquo; has an answer with a date
            on it.
          </p>
        </div>
        <Link
          href="/reports"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          Send audits and traffic in one scheduled report
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </section>

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

      <section className="card mt-16 p-8 text-center">
        <h2 className="text-[1.5rem] font-bold tracking-[-0.02em]">
          Audit your first page in about a minute
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-pretty leading-relaxed text-fg-muted">
          Add a site, run an audit, and read the report next to the traffic that
          page is already getting. Included on the free tier — no card.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={`${site.app}/signup`}>Start free</Button>
          <Button href="/docs/seo" variant="secondary">
            Read the docs
          </Button>
        </div>
      </section>
    </div>
  );
}
