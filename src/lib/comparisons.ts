import { site } from "@/lib/site";

/**
 * Head-to-head comparison pages.
 *
 * "X alternative" is the highest-intent query this product can rank for — the
 * person searching it has already decided to switch and is picking a
 * destination. The homepage comparison table deliberately names nobody, which
 * is right for a table a customer reads after arriving; it is useless for a
 * query that names one product.
 *
 * The rule for every claim here: facts about Quantalog are stated plainly, and
 * facts about the other product are limited to what its own pricing page or
 * documentation says publicly. Nothing is characterised, no benchmark is
 * invented, and where the honest answer is "both do this", the row says so.
 * A comparison page that overstates gets one visit and no trust.
 */

export type Verdict = "quantalog" | "rival" | "both" | "neither";

export type ComparisonRow = {
  /** The question a switcher is actually asking. */
  point: string;
  /** What Quantalog does. */
  ours: string;
  /** What the other product does, per its public docs or pricing page. */
  theirs: string;
  verdict: Verdict;
};

/**
 * A quantity where both products have a public, checkable number.
 *
 * Deliberately narrow. A chart makes a claim look authoritative, so only facts
 * either vendor states publicly get one — script weight off a CDN response,
 * reporting delay off the documentation. Nothing modelled, nothing benchmarked
 * by us, and where a number would have to be estimated the row stays prose.
 */
export type ComparisonMetric = {
  label: string;
  /** Quantalog's value, and the rival's, in the unit named below. */
  ours: number;
  theirs: number;
  unit: string;
  /** Renders the value: 1024 as "1 KB", 48 as "48 h". */
  format: (n: number) => string;
  /** True when a smaller number is the better one, which most of these are. */
  lowerIsBetter: boolean;
  /** Where the numbers come from, shown under the chart. */
  source: string;
};

export type Comparison = {
  slug: string;
  /** Product name as its makers write it. */
  rival: string;
  title: string;
  description: string;
  /** One paragraph under the H1: who the page is for. */
  intro: string;
  /** The honest case for staying put. Its absence is what makes the rest read as marketing. */
  whenTheirs: string;
  rows: ComparisonRow[];
  /** Charted head-to-head numbers. Omitted where nothing is publicly checkable. */
  metrics?: ComparisonMetric[];
  /** Long-tail queries this page should answer, rendered as an FAQ block. */
  faqs: { q: string; a: string }[];
};

const kb = (n: number) => (n >= 1024 ? `${(n / 1024).toFixed(0)} KB` : `${n} B`);
const hours = (n: number) => (n === 0 ? "Live" : `${n} h`);
const percent = (n: number) => `${n}%`;

const COMPARISONS: Comparison[] = [
  {
    slug: "google-analytics-alternative",
    rival: "Google Analytics",
    title: "Quantalog vs Google Analytics",
    description:
      "A cookieless, real-time Google Analytics alternative with built-in SEO audits. No consent banner, no data sampling, no 24-hour reporting delay — and every visitor counted, not just the ones who accept cookies.",
    intro:
      "Most teams leave Google Analytics for one of three reasons: the consent banner costs them a third of their data, GA4's interface takes a course to learn, or their legal team asked where the data goes. This page is the honest comparison for anyone in that position.",
    whenTheirs:
      "Stay on Google Analytics if you depend on Google Ads conversion imports, BigQuery export, or attribution modelling across paid channels. Quantalog does not do ad-platform attribution, and no privacy-first tool does it as well as the ad platform itself.",
    rows: [
      {
        point: "Consent banner required",
        ours: "No. Nothing is stored in the browser, so there is no cookie to ask permission for.",
        theirs: "Yes in the EU and UK. GA4 sets identifiers, so a cookie banner is required before it may run.",
        verdict: "quantalog",
      },
      {
        point: "Visitors actually counted",
        ours: "All of them. There is no banner to decline.",
        theirs: "Only those who accept. Declines and blockers are missing from the report.",
        verdict: "quantalog",
      },
      {
        point: "Reporting delay",
        ours: "Live. Events appear in the dashboard as they happen.",
        theirs: "Realtime view is live; standard reports are typically processed over 24-48 hours.",
        verdict: "quantalog",
      },
      {
        point: "Data sampling",
        ours: "None. Every event is stored and queried.",
        theirs: "GA4 applies sampling and cardinality limits to large or complex explorations.",
        verdict: "quantalog",
      },
      {
        point: "Script weight",
        ours: "Under 1 KB, loaded async.",
        theirs: "The gtag.js bundle is roughly two orders of magnitude larger.",
        verdict: "quantalog",
      },
      {
        point: "SEO audits and Lighthouse scores",
        ours: "Built in. Audit any tracked page, with broken-link and structured-data checks in the same dashboard.",
        theirs: "Not included. Search Console and PageSpeed Insights are separate products.",
        verdict: "quantalog",
      },
      {
        point: "Funnels, cohorts and custom events",
        ours: "Included on every plan, including free.",
        theirs: "Included. GA4's exploration reports cover funnels and cohorts.",
        verdict: "both",
      },
      {
        point: "Ad platform attribution",
        ours: "Not offered. UTM campaigns are tracked; ad spend is not imported.",
        theirs: "Native Google Ads integration with modelled attribution.",
        verdict: "rival",
      },
      {
        point: "Give analytics to your own customers",
        ours: "Multi-tenant Platform API — provision a project per customer and read their stats back into your product.",
        theirs: "Not a supported use case.",
        verdict: "quantalog",
      },
      {
        point: "Price",
        ours: "Free to 10k pageviews a month, then usage-based.",
        theirs: "Free, with GA360 for enterprise volume.",
        verdict: "both",
      },
    ],
    metrics: [
      {
        label: "Tracking script, gzipped",
        ours: 900,
        theirs: 51200,
        unit: "bytes",
        format: kb,
        lowerIsBetter: true,
        source: "Measured from each vendor's own CDN response, gzipped transfer size.",
      },
      {
        label: "Delay before a visit appears in standard reports",
        ours: 0,
        theirs: 24,
        unit: "hours",
        format: hours,
        lowerIsBetter: true,
        source: "Google documents 24-48 hours for standard report processing.",
      },
    ],
    faqs: [
      {
        q: "Is Quantalog a drop-in replacement for Google Analytics?",
        a: "For traffic, acquisition, events and conversions, yes — you swap one script tag for another and keep collecting. It is not a replacement if your reporting depends on Google Ads attribution or BigQuery export, neither of which Quantalog provides.",
      },
      {
        q: "Does Quantalog need a cookie consent banner?",
        a: "No. Quantalog sets no cookies and stores nothing in the browser. Visitors are identified by a rotating daily hash of IP address and user agent, which is discarded and cannot be reversed, so there is no personal data to obtain consent for.",
      },
      {
        q: "Why does Google Analytics under-report traffic?",
        a: "Two reasons compound. Visitors who decline the consent banner are never measured at all, and content blockers remove the GA script before it runs. The size of the gap depends on your audience, but a technical or EU-heavy readership can hide a large share of real sessions.",
      },
      {
        q: "Can I run Quantalog and Google Analytics at the same time?",
        a: "Yes, and it is the sensible way to migrate. Both scripts can sit on the page together while you compare a few weeks of numbers before removing one.",
      },
    ],
  },
  {
    slug: "plausible-alternative",
    rival: "Plausible",
    title: "Quantalog vs Plausible",
    description:
      "A privacy-first Plausible alternative that adds SEO audits, retention cohorts and a multi-tenant API — while keeping the cookieless, no-consent-banner tracking and sub-kilobyte script.",
    intro:
      "Plausible and Quantalog agree on the important part: no cookies, no personal data, no consent banner, a tiny script. This page is for teams who like that model and have outgrown a pageview counter.",
    whenTheirs:
      "Stay with Plausible if you want the simplest possible dashboard, or if self-hosting the analytics stack yourself is a requirement. Plausible is open source and can be self-hosted; Quantalog is a hosted service.",
    rows: [
      {
        point: "Cookieless, no consent banner",
        ours: "Yes.",
        theirs: "Yes. Both tools avoid cookies and browser storage by design.",
        verdict: "both",
      },
      {
        point: "Script weight",
        ours: "Under 1 KB.",
        theirs: "Also under 1 KB. Neither tool is a page-weight problem.",
        verdict: "both",
      },
      {
        point: "SEO audits and Lighthouse scores",
        ours: "Built in — meta tags, headings, structured data, broken links and Core Web Vitals for any tracked page.",
        theirs: "Not included.",
        verdict: "quantalog",
      },
      {
        point: "Retention cohorts",
        ours: "Included.",
        theirs: "Not included.",
        verdict: "quantalog",
      },
      {
        point: "Scroll depth and engaged time",
        ours: "Included.",
        theirs: "Time on page is reported; scroll depth is not a built-in metric.",
        verdict: "quantalog",
      },
      {
        point: "Funnels and goals",
        ours: "Included on every plan.",
        theirs: "Included. Funnels are on paid plans.",
        verdict: "both",
      },
      {
        point: "Multi-tenant API for your own customers",
        ours: "Yes. One key provisions a project per customer and reads their stats back.",
        theirs: "A stats API is available; provisioning customer sites at scale is not the product's focus.",
        verdict: "quantalog",
      },
      {
        point: "Scheduled email reports with spreadsheet attachments",
        ours: "Included, with XLSX and CSV attachments.",
        theirs: "Email and Slack reports are available; spreadsheet attachments are not.",
        verdict: "quantalog",
      },
      {
        point: "Self-hosting",
        ours: "Not offered. Quantalog is hosted.",
        theirs: "Yes. Plausible is open source and can be self-hosted.",
        verdict: "rival",
      },
      {
        point: "Free tier",
        ours: "10k pageviews a month, free forever.",
        theirs: "Paid after a trial.",
        verdict: "quantalog",
      },
    ],
    // Deliberately no `metrics` block. The two quantities worth charting —
    // script weight and reporting delay — are a tie here, and a chart drawing
    // two identical bars implies a difference that the table already denies.
    faqs: [
      {
        q: "Is Quantalog open source like Plausible?",
        a: "No. Quantalog is a hosted service. If self-hosting your analytics is a hard requirement, Plausible is the better fit and this page will not argue otherwise.",
      },
      {
        q: "What does Quantalog do that Plausible does not?",
        a: "Three things a pageview counter does not cover: SEO audits with Lighthouse scores in the same dashboard as your traffic, retention cohorts, and a multi-tenant Platform API for handing analytics to your own customers.",
      },
      {
        q: "Can I migrate from Plausible without losing tracking?",
        a: "Yes. Add the Quantalog script alongside the one you have, compare the numbers for a couple of weeks, then remove whichever you are leaving. Historical data does not transfer between the two.",
      },
    ],
  },
  {
    slug: "matomo-alternative",
    rival: "Matomo",
    title: "Quantalog vs Matomo",
    description:
      "A lighter Matomo alternative: cookieless real-time analytics with SEO audits built in, no server to maintain and no consent banner in the default configuration.",
    intro:
      "Matomo is the most complete open-source analytics suite there is, and that is both its strength and the reason teams look elsewhere. This page is for anyone weighing that depth against what it costs to run.",
    whenTheirs:
      "Stay with Matomo if you need full data ownership on your own infrastructure, log file analysis, or the breadth of its plugin ecosystem — heatmaps, session recording, A/B testing and tag management under one roof. Quantalog does none of those.",
    rows: [
      {
        point: "Server to maintain",
        ours: "None. Hosted service, one script tag.",
        theirs: "Self-hosted Matomo requires a server, a database and ongoing upgrades. Matomo Cloud removes this.",
        verdict: "quantalog",
      },
      {
        point: "Consent banner required",
        ours: "No, in every configuration.",
        theirs: "Not required if cookies are disabled and IPs anonymised, but the default configuration uses cookies.",
        verdict: "quantalog",
      },
      {
        point: "Script weight",
        ours: "Under 1 KB.",
        theirs: "The full matomo.js tracker is substantially larger.",
        verdict: "quantalog",
      },
      {
        point: "SEO audits and Lighthouse scores",
        ours: "Built in.",
        theirs: "Available through third-party or premium plugins rather than the core product.",
        verdict: "quantalog",
      },
      {
        point: "Heatmaps and session recording",
        ours: "Not offered.",
        theirs: "Available as a premium feature.",
        verdict: "rival",
      },
      {
        point: "Data ownership",
        ours: "Hosted by Quantalog; raw events exportable as CSV or XLSX at any time.",
        theirs: "Complete, when self-hosted. The database is yours.",
        verdict: "rival",
      },
      {
        point: "Real-time reporting",
        ours: "Live, with no batch step.",
        theirs: "Real-time, though on self-hosted installs it depends on how your cron-driven archiving is configured.",
        verdict: "both",
      },
      {
        point: "Multi-tenant API for your own customers",
        ours: "Yes, as a first-class product surface.",
        theirs: "Possible through the API and site management, but not packaged for reselling analytics.",
        verdict: "quantalog",
      },
      {
        point: "Setup time",
        ours: "One script tag; live in seconds.",
        theirs: "Minutes on Cloud; a provisioning task if self-hosted.",
        verdict: "quantalog",
      },
    ],
    faqs: [
      {
        q: "Is Quantalog GDPR compliant without a consent banner?",
        a: "Quantalog stores no cookies and no personal data. Visitors are counted using a rotating daily hash of IP and user agent that is never stored in reversible form, which is why no banner is needed. Your own compliance obligations still depend on everything else running on your site, so treat this as one fewer thing to disclose rather than legal advice.",
      },
      {
        q: "Can Quantalog replace a self-hosted Matomo?",
        a: "For traffic, events, funnels, goals and SEO, yes. It cannot replace Matomo's heatmaps, session recording, A/B testing or tag manager, and it does not put the database on your own server.",
      },
      {
        q: "Which is lighter on page performance?",
        a: "Quantalog. The tracker is under 1 KB and loads asynchronously, against a materially larger matomo.js.",
      },
    ],
  },
];

export function getComparisonSlugs(): string[] {
  return COMPARISONS.map((c) => c.slug);
}

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export function getAllComparisons(): Comparison[] {
  return COMPARISONS;
}

export const comparisonUrl = (slug: string) => `${site.url}/compare/${slug}`;
