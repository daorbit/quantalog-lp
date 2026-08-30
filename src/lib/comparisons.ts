import { site } from "@/lib/site";

export type Verdict = "quantalog" | "rival" | "both" | "neither";

export type ComparisonRow = {

  point: string;

  ours: string;

  theirs: string;
  verdict: Verdict;
};

export type ComparisonMetric = {
  label: string;

  ours: number;
  theirs: number;
  unit: string;

  format: (n: number) => string;

  lowerIsBetter: boolean;

  source: string;
};

export type Comparison = {
  slug: string;

  rival: string;
  title: string;
  description: string;

  intro: string;

  whenTheirs: string;
  rows: ComparisonRow[];

  metrics?: ComparisonMetric[];

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
  {
    slug: "fathom-analytics-alternative",
    rival: "Fathom Analytics",
    title: "Quantalog vs Fathom Analytics",
    description:
      "A Fathom Analytics alternative that keeps the cookieless, no-consent-banner model and adds built-in SEO audits, retention cohorts, funnels and a multi-tenant API — with a free tier Fathom does not offer.",
    intro:
      "Fathom and Quantalog start from the same place: no cookies, no personal data, no banner, a small script and a single-page dashboard. This page is for teams who want that model but need more than a traffic counter, or want to try it before paying.",
    whenTheirs:
      "Stay with Fathom if its dashboard is exactly the amount of product you want and you value its long track record and EU-isolated data option. Fathom is a mature, focused tool and does not try to be more than that.",
    rows: [
      {
        point: "Cookieless, no consent banner",
        ours: "Yes.",
        theirs: "Yes. Both tools avoid cookies and browser storage by design.",
        verdict: "both",
      },
      {
        point: "Free tier",
        ours: "Free to 10k pageviews a month, every feature included.",
        theirs: "No free tier; paid plans only, after a trial.",
        verdict: "quantalog",
      },
      {
        point: "SEO audits and Lighthouse scores",
        ours: "Built in — audit any tracked page, with broken-link and structured-data checks.",
        theirs: "Not offered.",
        verdict: "quantalog",
      },
      {
        point: "Funnels, goals and retention cohorts",
        ours: "Included on every plan.",
        theirs: "Event tracking and goals; funnels and retention cohorts are not part of the product.",
        verdict: "quantalog",
      },
      {
        point: "Scheduled email and WhatsApp reports",
        ours: "Yes, with an AI plain-language summary and an XLSX attachment.",
        theirs: "Email reports; no WhatsApp, no AI summary.",
        verdict: "quantalog",
      },
      {
        point: "Give analytics to your own customers",
        ours: "Multi-tenant Platform API — a project per customer, stats read back into your product.",
        theirs: "Not a supported use case.",
        verdict: "quantalog",
      },
      {
        point: "Script weight",
        ours: "Under 1 KB, loaded async.",
        theirs: "A small script in the same class; both are a fraction of a typical analytics bundle.",
        verdict: "both",
      },
      {
        point: "Uptime monitoring and email reports as a bundle",
        ours: "Reporting is bundled; uptime monitoring is not offered.",
        theirs: "Includes email reports; no uptime monitoring.",
        verdict: "both",
      },
      {
        point: "Price",
        ours: "Free to 10k pageviews a month, then usage-based.",
        theirs: "Paid from the first pageview, priced by monthly pageviews.",
        verdict: "quantalog",
      },
    ],
    faqs: [
      {
        q: "Is Quantalog a drop-in replacement for Fathom?",
        a: "For traffic, referrers, events and goals, yes — swap the script tag and keep collecting. Quantalog then adds funnels, retention cohorts, SEO audits and scheduled reports on top.",
      },
      {
        q: "Does Quantalog need a consent banner like Fathom does not?",
        a: "Neither tool needs one. Both are cookieless and store nothing in the browser, so there is no identifier to ask permission for.",
      },
      {
        q: "Can I try Quantalog without paying?",
        a: "Yes. The free tier covers 10k pageviews a month with every feature included, where Fathom is paid-only after its trial.",
      },
    ],
  },
  {
    slug: "umami-alternative",
    rival: "Umami",
    title: "Quantalog vs Umami",
    description:
      "A hosted Umami alternative: the same cookieless, no-banner tracking with no server to run, plus SEO audits, scheduled reports and a multi-tenant API built in.",
    intro:
      "Umami is a well-liked open-source analytics app you host yourself, or pay Umami Cloud to host. Quantalog is a hosted service only. This page is for teams deciding whether running the stack themselves is worth it.",
    whenTheirs:
      "Stay with Umami if self-hosting is a requirement — full data ownership on your own database, MIT-licensed code you can modify, and no per-event pricing because the cost is your own server. Quantalog does none of that.",
    rows: [
      {
        point: "Server and database to maintain",
        ours: "None. Hosted service, one script tag.",
        theirs: "Self-hosted Umami needs a Node host and a Postgres or MySQL database. Umami Cloud removes this.",
        verdict: "quantalog",
      },
      {
        point: "Cookieless, no consent banner",
        ours: "Yes.",
        theirs: "Yes. Umami is cookieless by design.",
        verdict: "both",
      },
      {
        point: "SEO audits and Lighthouse scores",
        ours: "Built in.",
        theirs: "Not offered.",
        verdict: "quantalog",
      },
      {
        point: "Funnels and retention cohorts",
        ours: "Included on every plan.",
        theirs: "Funnels and retention are in recent versions; depth is more limited than a dedicated product analytics tool.",
        verdict: "both",
      },
      {
        point: "Scheduled email and WhatsApp reports",
        ours: "Yes, with an AI summary and XLSX attachment.",
        theirs: "Not part of the product.",
        verdict: "quantalog",
      },
      {
        point: "Data ownership",
        ours: "Hosted by Quantalog; raw events exportable as CSV or XLSX any time.",
        theirs: "Complete, when self-hosted. The database is yours.",
        verdict: "rival",
      },
      {
        point: "Multi-tenant API for reselling analytics",
        ours: "Yes, as a first-class product surface.",
        theirs: "The API and multi-site support exist, but are not packaged for reselling to your own customers.",
        verdict: "quantalog",
      },
      {
        point: "Cost model",
        ours: "Free to 10k pageviews a month, then usage-based.",
        theirs: "Free software; you pay for the server, or for Umami Cloud by event volume.",
        verdict: "both",
      },
    ],
    faqs: [
      {
        q: "Can Quantalog replace a self-hosted Umami?",
        a: "For traffic, events, funnels, goals and SEO, yes, without a server to run. It cannot put the database on your own infrastructure, which is the main reason teams self-host Umami.",
      },
      {
        q: "Is Quantalog open source like Umami?",
        a: "No. Quantalog is a hosted service. If running MIT-licensed code you can fork is a hard requirement, Umami is the better fit.",
      },
      {
        q: "Which is faster to get running?",
        a: "Quantalog — one script tag, live in seconds, no database to provision. Umami Cloud is also quick; self-hosted Umami is a deployment task.",
      },
    ],
  },
  {
    slug: "posthog-alternative",
    rival: "PostHog",
    title: "Quantalog vs PostHog",
    description:
      "A lighter, privacy-first PostHog alternative for teams who want traffic analytics, funnels and SEO audits without cookies, a consent banner or a heavy SDK.",
    intro:
      "PostHog is a full product-analytics platform — session replay, feature flags, experiments, a data warehouse. Quantalog is web analytics with SEO audits and reporting. This page is for teams who adopted PostHog for pageviews and funnels and found the rest was more than they needed.",
    whenTheirs:
      "Stay with PostHog if you use session replay, feature flags, A/B experiments or its SQL data warehouse. Quantalog does none of those and is not trying to; it is the smaller tool on purpose.",
    rows: [
      {
        point: "Consent banner required",
        ours: "No. Nothing is stored in the browser.",
        theirs: "PostHog sets cookies by default and identifies users, so a consent banner is generally required.",
        verdict: "quantalog",
      },
      {
        point: "Script weight",
        ours: "Under 1 KB, loaded async.",
        theirs: "The posthog-js SDK is substantially larger, more so with session replay and autocapture enabled.",
        verdict: "quantalog",
      },
      {
        point: "Cookieless option",
        ours: "The only mode. No configuration needed.",
        theirs: "A cookieless / memory-persistence mode exists but is not the default and limits some features.",
        verdict: "quantalog",
      },
      {
        point: "Funnels, cohorts and custom events",
        ours: "Included on every plan.",
        theirs: "Included, and deeper — path analysis, correlation, retention breakdowns.",
        verdict: "both",
      },
      {
        point: "Session replay, feature flags, experiments",
        ours: "Not offered.",
        theirs: "Core parts of the platform.",
        verdict: "rival",
      },
      {
        point: "SEO audits and Lighthouse scores",
        ours: "Built in.",
        theirs: "Not offered.",
        verdict: "quantalog",
      },
      {
        point: "Scheduled email and WhatsApp client reports",
        ours: "Yes, with an AI summary and XLSX attachment.",
        theirs: "Dashboards can be subscribed to by email; no WhatsApp, no client-report packaging.",
        verdict: "quantalog",
      },
      {
        point: "Give analytics to your own customers",
        ours: "Multi-tenant Platform API — a project per customer.",
        theirs: "Multiple projects exist, but reselling analytics is not a packaged use case.",
        verdict: "quantalog",
      },
      {
        point: "Price",
        ours: "Free to 10k pageviews a month, then usage-based.",
        theirs: "Generous free tier by event volume, then usage-based across each product.",
        verdict: "both",
      },
    ],
    faqs: [
      {
        q: "Is Quantalog a replacement for PostHog?",
        a: "Only for the web-analytics part — traffic, referrers, funnels, goals and events. It does not replace session replay, feature flags or experiments, and it has no data warehouse.",
      },
      {
        q: "Why would I move from PostHog to Quantalog?",
        a: "Usually to drop the consent banner and the SDK weight when the team only ever used PostHog for pageviews and funnels, and the rest of the platform sat idle.",
      },
      {
        q: "Does Quantalog need a cookie banner where PostHog does?",
        a: "Quantalog never needs one; it is cookieless in its only mode. PostHog needs one in its default configuration because it sets cookies and identifies users.",
      },
    ],
  },
  {
    slug: "cloudflare-web-analytics-alternative",
    rival: "Cloudflare Web Analytics",
    title: "Quantalog vs Cloudflare Web Analytics",
    description:
      "A Cloudflare Web Analytics alternative that keeps the cookieless, privacy-first model and adds real-time data, funnels, custom events, SEO audits and scheduled reports.",
    intro:
      "Cloudflare Web Analytics is a free, privacy-first pageview counter that needs no cookie banner. Quantalog shares that model and goes further. This page is for anyone who started with Cloudflare's free tier and hit its edges.",
    whenTheirs:
      "Stay with Cloudflare Web Analytics if a free, zero-configuration pageview and referrer summary is all you need — especially if your site already runs behind Cloudflare, where server-side collection needs no script at all.",
    rows: [
      {
        point: "Cookieless, no consent banner",
        ours: "Yes.",
        theirs: "Yes. Both are privacy-first and need no banner.",
        verdict: "both",
      },
      {
        point: "Real-time data",
        ours: "Live. Events appear as they happen.",
        theirs: "Reporting is not real-time; data appears after a processing delay.",
        verdict: "quantalog",
      },
      {
        point: "Custom events, funnels and goals",
        ours: "Included on every plan.",
        theirs: "Pageviews and core web vitals; no custom events, funnels or goals.",
        verdict: "quantalog",
      },
      {
        point: "Retention cohorts",
        ours: "Included.",
        theirs: "Not offered.",
        verdict: "quantalog",
      },
      {
        point: "SEO audits and Lighthouse scores",
        ours: "Built in.",
        theirs: "Not offered.",
        verdict: "quantalog",
      },
      {
        point: "Core Web Vitals",
        ours: "Measured per audited page, with history.",
        theirs: "Reported from real-user measurement, aggregated.",
        verdict: "both",
      },
      {
        point: "Scheduled email and WhatsApp reports",
        ours: "Yes, with an AI summary and XLSX attachment.",
        theirs: "Not offered.",
        verdict: "quantalog",
      },
      {
        point: "Give analytics to your own customers",
        ours: "Multi-tenant Platform API.",
        theirs: "Not a supported use case.",
        verdict: "quantalog",
      },
      {
        point: "Price",
        ours: "Free to 10k pageviews a month, then usage-based.",
        theirs: "Free.",
        verdict: "both",
      },
    ],
    faqs: [
      {
        q: "Is Quantalog a replacement for Cloudflare Web Analytics?",
        a: "Yes, and a superset for most needs — it covers the same pageviews and referrers without a banner, then adds real-time data, custom events, funnels, retention and SEO audits.",
      },
      {
        q: "Do I need to use Cloudflare as my CDN to run Quantalog?",
        a: "No. Quantalog is a single script tag and works on any host. Cloudflare Web Analytics is easiest when your site is already proxied through Cloudflare.",
      },
      {
        q: "Is Quantalog free like Cloudflare Web Analytics?",
        a: "There is a free tier to 10k pageviews a month with every feature included. Above that it is usage-based, where Cloudflare's offering is free at any volume but far narrower.",
      },
    ],
  },
  {
    slug: "simple-analytics-alternative",
    rival: "Simple Analytics",
    title: "Quantalog vs Simple Analytics",
    description:
      "A Simple Analytics alternative that keeps the cookieless, no-banner model and the tidy dashboard, then adds funnels, retention cohorts, SEO audits and a multi-tenant API — with a free tier.",
    intro:
      "Simple Analytics is a privacy-first, EU-hosted pageview dashboard with a deliberately minimal interface. Quantalog shares the cookieless model and the clean dashboard, and does more with the data. This page is for teams who like Simple Analytics and have outgrown a counter.",
    whenTheirs:
      "Stay with Simple Analytics if EU-only data hosting is a hard requirement, or if the minimal dashboard is exactly the amount of product you want. It is a focused, well-run tool that does not try to be more.",
    rows: [
      {
        point: "Cookieless, no consent banner",
        ours: "Yes.",
        theirs: "Yes. Both avoid cookies and browser storage by design.",
        verdict: "both",
      },
      {
        point: "Free tier",
        ours: "Free to 10k pageviews a month, every feature included.",
        theirs: "No free tier for the hosted product; paid plans after a trial.",
        verdict: "quantalog",
      },
      {
        point: "Funnels, goals and retention cohorts",
        ours: "Included on every plan.",
        theirs: "Events and goals; funnels and retention cohorts are not part of the product.",
        verdict: "quantalog",
      },
      {
        point: "SEO audits and Lighthouse scores",
        ours: "Built in — audit any tracked page, with broken-link and structured-data checks.",
        theirs: "Not offered.",
        verdict: "quantalog",
      },
      {
        point: "Scheduled email and WhatsApp reports",
        ours: "Yes, with an AI plain-language summary and an XLSX attachment.",
        theirs: "Email reports and CSV export; no WhatsApp, no AI summary.",
        verdict: "quantalog",
      },
      {
        point: "Data hosting location",
        ours: "Hosted by Quantalog; raw events exportable as CSV or XLSX any time.",
        theirs: "EU-hosted, which is the point for teams that need it.",
        verdict: "rival",
      },
      {
        point: "Give analytics to your own customers",
        ours: "Multi-tenant Platform API — a project per customer, stats read back into your product.",
        theirs: "Not a packaged use case.",
        verdict: "quantalog",
      },
      {
        point: "Script weight",
        ours: "Under 1 KB, loaded async.",
        theirs: "A small script in the same class; both are a fraction of a typical analytics bundle.",
        verdict: "both",
      },
      {
        point: "Price",
        ours: "Free to 10k pageviews a month, then usage-based.",
        theirs: "Paid from the first pageview, priced by monthly pageviews.",
        verdict: "quantalog",
      },
    ],
    faqs: [
      {
        q: "Is Quantalog a drop-in replacement for Simple Analytics?",
        a: "For traffic, referrers, events and goals, yes — swap the script tag and keep collecting. Quantalog then adds funnels, retention cohorts, SEO audits and scheduled reports.",
      },
      {
        q: "Does Quantalog host data in the EU like Simple Analytics?",
        a: "Simple Analytics is explicitly EU-hosted. If that is a hard requirement for you, it is the safer choice; Quantalog does not currently guarantee an EU-only data region.",
      },
      {
        q: "Can I try Quantalog without paying?",
        a: "Yes. The free tier covers 10k pageviews a month with every feature included, where Simple Analytics is paid-only after its trial.",
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
