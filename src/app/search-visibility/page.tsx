import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileSearch,
  Globe2,
  ListChecks,
  Lock,
  MousePointerClick,
  Search,
  ListTree,
} from "lucide-react";
import { Button } from "@/components/ui";
import { FeatureHero } from "@/components/feature-hero";
import { OrbitStrip } from "@/components/orbit-strip";
import { RankVisual } from "@/components/explore/visuals/rank-visual";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

const PATH = "/search-visibility";
const TITLE = "Google Search Console, inside your analytics";
const PUBLISHED = "2026-09-27";
const MODIFIED = "2026-09-27";

const DESCRIPTION =
  "Connect Google Search Console and read clicks, impressions, rankings and index status next to your real traffic — with a ranked list of what to fix, page-level detail, and Orbit AI to explain what changed.";

const features = [
  {
    icon: BarChart3,
    title: "Performance, up to 16 months",
    body: "Clicks, impressions, click-through rate and average position, compared with the previous period and charted day by day. Toggle metrics on the chart the way you would in Search Console.",
  },
  {
    icon: Search,
    title: "Every query and every page",
    body: "Search, sort and page through up to 25,000 queries and pages per report, with the change in clicks against the previous period on every row.",
  },
  {
    icon: ListChecks,
    title: "A ranked list of what to fix",
    body: "Insights turns the raw data into actions: queries one push from page one, page-one results with weak click-through, and pages losing clicks — ordered by estimated impact.",
  },
  {
    icon: FileSearch,
    title: "Index status for any page",
    body: "Check whether Google has indexed a page, when it last crawled it, whether it could fetch it — and Google's own reason when it is not on Google.",
  },
  {
    icon: MousePointerClick,
    title: "Google clicks beside real visits",
    body: "Each page shows its Google clicks next to the visits Quantalog tracked, so you can see how much of a page's traffic search actually brings.",
  },
  {
    icon: Globe2,
    title: "Countries and devices",
    body: "Where the people searching are, and how mobile, desktop and tablet compare on clicks, click-through and position.",
  },
  {
    icon: ListTree,
    title: "Sitemaps at a glance",
    body: "Every submitted sitemap with its status, errors and warnings, how many URLs it lists, and when Google last read it.",
  },
  {
    icon: Lock,
    title: "Read-only by design",
    body: "Quantalog asks Google for read-only access. It cannot submit sitemaps, remove URLs or change anything in your Search Console account.",
  },
];

const steps = [
  {
    title: "Sign in with Google",
    body: "Choose the Google account that owns your Search Console property and allow read-only access.",
  },
  {
    title: "Pick your property",
    body: "Quantalog lists the properties on that account and recommends the one that covers your site.",
  },
  {
    title: "Read your data",
    body: "Performance, queries, pages, insights and index status load straight away — no waiting for a crawl.",
  },
];

const plans = [
  { row: "Connect Google Search Console", free: "Yes", starter: "Yes", pro: "Yes" },
  { row: "Search history", free: "Last 7 days", starter: "Up to 3 months", pro: "Up to 16 months" },
  { row: "Queries, pages and countries", free: "Top 10", starter: "Every row", pro: "Every row" },
  { row: "Search insights", free: "—", starter: "Top 5 per insight", pro: "Full" },
  { row: "Google clicks vs. Quantalog visits", free: "—", starter: "Yes", pro: "Yes" },
  { row: "Google index checks", free: "—", starter: "100 / month", pro: "1,000 / month" },
];

const faqs = [
  {
    q: "Do I need a Google Search Console account?",
    a: "Yes. Quantalog reads the data Google already collects for a verified Search Console property. If your site is not verified yet, add it in Search Console first — Google starts collecting data from the day it is verified.",
  },
  {
    q: "Is Search visibility included on the free plan?",
    a: "Yes. The free plan connects Search Console and shows the last 7 days with your top 10 queries and pages. Starter extends that to 3 months with every row and search insights; Pro unlocks the full 16 months and 1,000 index checks a month.",
  },
  {
    q: "Can Quantalog change anything in my Search Console?",
    a: "No. The connection uses Google's read-only Search Console permission. Quantalog can read performance data, sitemaps and index status, and nothing else. You can disconnect at any time, which also deletes the search data Quantalog stored.",
  },
  {
    q: "How fresh is the data?",
    a: "The same as Search Console itself. Google publishes performance data with a delay of roughly two to three days, and the most recent days may still rise as Google finalises them. Data is cached for a few hours; the refresh button fetches the latest from Google.",
  },
  {
    q: "Why don't Google clicks match my visitor numbers?",
    a: "They measure different things. A click is counted by Google when someone clicks your result; a visit is counted by Quantalog when your page actually loads. Visits also include every other source — direct, social, referrals — which is exactly why seeing both side by side is useful.",
  },
  {
    q: "What is an index check?",
    a: "It asks Google's URL Inspection API whether a specific page is indexed, when it was last crawled and, if it is not on Google, why. Each new check uses one from your monthly allowance; re-opening a page that was checked recently does not use another.",
  },
  {
    q: "How is this different from Quantalog's SEO audits?",
    a: "SEO audits are Quantalog reading your page right now — Lighthouse scores, meta tags, broken links. Search visibility is what Google actually recorded — the searches you appeared for, the clicks you earned and what it indexed. One tells you what to fix; the other tells you whether it worked.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  other: {
    "article:published_time": PUBLISHED,
    "article:modified_time": MODIFIED,
  },
  keywords: [
    "Google Search Console integration",
    "Search Console dashboard",
    "Search Console analytics",
    "keyword ranking tracker",
    "Google search performance",
    "URL inspection tool",
    "SEO opportunities",
    "search queries report",
    "Google index status checker",
    "Search Console alternative dashboard",
  ],
  openGraph: {
    type: "website",
    url: `${site.url}${PATH}`,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function SearchVisibilityPage() {
  const jsonLd = graph(
    {
      "@type": "WebPage",
      "@id": `${site.url}${PATH}#page`,
      name: TITLE,
      description: DESCRIPTION,
      url: `${site.url}${PATH}`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
    service({
      path: PATH,
      name: TITLE,
      description: DESCRIPTION,
      serviceType: "Search Console analytics",
    }),
    article({
      path: PATH,
      headline: TITLE,
      description: DESCRIPTION,
      published: PUBLISHED,
      modified: MODIFIED,
    }),
    {
      "@type": "FAQPage",
      "@id": `${site.url}${PATH}#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Search visibility", path: PATH },
    ])
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
      <JsonLd data={jsonLd} />

      <FeatureHero
        eyebrow="Search visibility"
        title={
          <>
            See how people find you on Google.
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">And what to fix next.</span>
          </>
        }
        description={DESCRIPTION}
        primary={{ label: "Connect Search Console" }}
        secondary={{ label: "Read the docs", href: "/docs/search-visibility" }}
        visual={<RankVisual />}
        tone="violet"
      />

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-semibold tracking-[-0.025em]">What you get</h2>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-fg-muted">
          Everything Search Console knows about your site, in the same dashboard as your traffic — organised around the
          questions you actually ask: where do my clicks come from, what changed, and what should I do about it?
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={((i % 3) + 1) as 1 | 2 | 3} className="tile group p-7">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-subtle text-accent transition-all duration-200 group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-accent/10">
                <f.icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-[15px] font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-semibold tracking-[-0.025em]">Connected in under a minute</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="tile tile--static p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-sm font-semibold text-accent">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-semibold tracking-[-0.025em]">Why it belongs next to your analytics</h2>
        <div className="mt-6 space-y-5 text-pretty leading-relaxed text-fg-muted">
          <p>
            Search Console tells you a page earned 40 clicks last week. It cannot tell you that the same page had 900
            visits, that most of them came from a newsletter, or that the people who arrived from Google were the ones
            who signed up. Those answers live in your analytics — so that is where the search data should be too.
          </p>
          <p>
            In Quantalog, every page shows its Google clicks beside the visits it actually received, a drop in clicks
            links straight to the queries that fell, and a page&apos;s index status sits one click away from its
            traffic. The question &ldquo;is search working for this page?&rdquo; gets one answer instead of two tabs.
          </p>
        </div>
        <Link
          href="/seo-audits"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          Pair it with on-page SEO audits
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-semibold tracking-[-0.025em]">What each plan includes</h2>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-fg-muted">
          Search visibility is part of every Quantalog plan — no separate add-on. Higher plans go further back and deeper
          into the data.
        </p>
        <div className="tile tile--static mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-fg-faint">
                <th className="px-6 py-4 font-medium" />
                <th className="px-6 py-4 font-semibold text-fg">Free</th>
                <th className="px-6 py-4 font-semibold text-fg">Starter</th>
                <th className="px-6 py-4 font-semibold text-accent">Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {plans.map((p) => (
                <tr key={p.row}>
                  <td className="px-6 py-3.5 text-fg">{p.row}</td>
                  <td className="px-6 py-3.5 text-fg-muted">{p.free}</td>
                  <td className="px-6 py-3.5 text-fg-muted">{p.starter}</td>
                  <td className="px-6 py-3.5 text-fg-muted">{p.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/plans" className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
          Compare every plan
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-semibold tracking-[-0.025em]">Your data, your account</h2>
        <ul className="tile tile--static mt-8 grid gap-x-8 gap-y-3 p-7 sm:grid-cols-2">
          {[
            "Read-only Google permission — nothing in Search Console can be changed",
            "Google tokens are encrypted at rest and never shown in the dashboard",
            "Disconnect in one click; stored search data is deleted with it",
            "Each workspace connects its own Google account",
            "Only workspace admins can connect or change a property",
            "No data leaves Google that Search Console would not already show you",
          ].map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-semibold tracking-[-0.025em]">Common questions</h2>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <div key={f.q} className="py-6">
              <dt className="font-semibold tracking-tight">{f.q}</dt>
              <dd className="mt-2.5 text-pretty leading-relaxed text-fg-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <OrbitStrip
        body="Search Console shows you the numbers. Orbit reads them for you — a plain-language summary of what changed, why a metric moved, and which query or page is worth your time first, answered from your own Google data."
        examples={[
          "What should I fix first to get more clicks?",
          "Why did my clicks drop this month?",
          "Which queries are close to page 1?",
        ]}
      />

      <section className="tile tile--static mt-16 p-10 text-center sm:p-14">
        <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em]">See your Google search data in a minute</h2>
        <p className="mx-auto mt-3 max-w-lg text-pretty leading-relaxed text-fg-muted">
          Add your site, connect Search Console with read-only access, and read your clicks, queries and index status
          next to your traffic. Included on the free plan.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={`${site.app}/signup`}>Start free</Button>
          <Button href="/docs/search-visibility" variant="secondary">
            Read the docs
          </Button>
        </div>
      </section>
    </div>
  );
}
