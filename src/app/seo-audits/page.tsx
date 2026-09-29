import type { Metadata } from "next";
import {
  Braces,
  FileSearch,
  Gauge,
  Layers,
  Link2Off,
  Share2,
  Swords,
  TrendingUp,
} from "lucide-react";
import { FeatureHero } from "@/components/feature-hero";
import { OrbitStrip } from "@/components/orbit-strip";
import { BigStats } from "@/components/big-stats";
import { SplitStory } from "@/components/split-story";
import { Cta } from "@/components/sections/cta";
import { ScoreVisual } from "@/components/explore/visuals/score-visual";
import { ProductSection } from "@/components/product/product-section";
import { ProductFeatureGrid } from "@/components/product/product-feature-grid";
import { ProductChecklist } from "@/components/product/product-checklist";
import { ProductFaq } from "@/components/product/product-faq";
import { RelatedProducts } from "@/components/product/related-products";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

const PUBLISHED = "2025-11-01";
const MODIFIED = "2026-08-09";

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

const stats = [
  { value: "4", label: "Lighthouse scores" },
  { value: "12", label: "Checks on every run" },
  { value: "30", label: "Pages per site crawl" },
  { value: "3", label: "Competitors side by side" },
] as const;

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
    a: "Search Console reports what Google already observed about pages it has crawled, on Google's schedule. Quantalog audits a page on demand, right now, and puts the result next to the traffic that page is getting. You can also connect Search Console itself in Search visibility, so what Google recorded and what the audit found sit in the same dashboard.",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO audit tool with Lighthouse scores",
    description: DESCRIPTION,
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
    <>
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
        secondary={{ label: "Read the docs", href: "/docs/seo" }}
        visual={<ScoreVisual />}
        tone="blue"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-y border-border py-12 sm:py-16">
          <BigStats stats={stats} />
        </div>
      </div>

      <ProductSection
        eyebrow="What the audit does"
        title="Everything a crawler sees. And more."
        body="Audit any page on a site you already track. Quantalog reads it the way a crawler would, runs it through Lighthouse, and reports what is holding it back — in the same dashboard as your traffic."
      >
        <ProductFeatureGrid features={checks} columns={4} />
      </ProductSection>

      <ProductSection
        eyebrow="On every run"
        title="Twelve checks. One click."
        body="Every audit covers the full list below — no configuration, no separate tools."
        link={{ label: "See what each check means", href: "/docs/seo" }}
        bordered
      >
        <ProductChecklist items={audited} />
      </ProductSection>

      <SplitStory
        eyebrow="Why it's built in"
        title="An audit means more next to the traffic."
        link={{ label: "Send audits and traffic in one report", href: "/reports" }}
      >
        <p>
          A standalone SEO tool tells you a page has a slow LCP. It cannot tell you that the page is your
          second-biggest entry point, or that its traffic has been sliding for three weeks. That connection
          is the whole reason to fix one thing before another, and it only exists when both halves are in
          the same product.
        </p>
        <p>
          So an audit here is scoped to a site you already track. The report sits beside the visitor
          numbers for the same URL, the scheduled email carries both, and the history of every run is kept
          so the question &ldquo;did that fix work?&rdquo; has an answer with a date on it.
        </p>
      </SplitStory>

      <OrbitStrip
        body="An audit tells you what is wrong. Orbit tells you what to do about it — what a flagged issue actually costs, which fix is worth doing first, and what the corrected markup should look like."
        examples={[
          "Which of these issues matters most?",
          "Write the meta description for this page",
          "Why is my LCP failing on mobile?",
        ]}
      />

      <ProductFaq faqs={faqs} idPrefix="seo-faq" />

      <RelatedProducts hrefs={["/search-visibility", "/analytics", "/reports"]} />

      <Cta
        title="Audit your first page in about a minute."
        body="Add a site, run an audit, and read the report next to the traffic that page is already getting. Included on the free plan — no card."
        secondary={{ label: "Read the docs", href: "/docs/seo" }}
        location="seo_cta"
      />
    </>
  );
}
