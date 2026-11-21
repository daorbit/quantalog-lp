import type { ComparisonEntry, ComparisonRow } from "./types";

const CHECKED_ON = "November 2026";

const DATA_COLLECTION_ROW: ComparisonRow = {
  point: "Collects the data itself",
  ours: "Yes. Cookieless website analytics with no consent banner, so you don't need GA4 underneath.",
  theirs: "",
  verdict: "quantalog",
};

const DELIVERY_ROW: ComparisonRow = {
  point: "Scheduled delivery",
  ours: "Email with a spreadsheet attached, WhatsApp and Telegram, daily, weekly or monthly, with an AI-written summary.",
  theirs: "",
  verdict: "quantalog",
};

const LEADS_ROW: ComparisonRow = {
  point: "Leads and invoices beside the report",
  ours: "Form leads, bookings and GST invoices sit in the same workspace, so you can show which channel produced paying customers.",
  theirs: "",
  verdict: "quantalog",
};

const SHARING_ROW: ComparisonRow = {
  point: "Client access without a login",
  ours: "A public dashboard link per workspace, and widgets you can embed in a client portal.",
  theirs: "",
  verdict: "both",
};

const withTheirs = (row: ComparisonRow, theirs: string, verdict = row.verdict): ComparisonRow => ({
  ...row,
  theirs,
  verdict,
});

export const REPORTING_COMPARISONS: ComparisonEntry[] = [
  {
    slug: "agencyanalytics-alternative",
    rival: "AgencyAnalytics",
    title: "Quantalog vs AgencyAnalytics",
    description:
      "An AgencyAnalytics alternative for agencies that build and track client websites: cookieless analytics, SEO audits and Search Console in scheduled email, WhatsApp and Telegram reports, with a free plan.",
    intro:
      "AgencyAnalytics pulls marketing data from dozens of platforms into branded client reports, and it is priced per client. Quantalog collects its own website data and reports on it. This page is for agencies whose clients mostly care about their website, its search traffic and the leads it brings in.",
    whenTheirs:
      "Stay with AgencyAnalytics if your reports pull from ad platforms, social networks and GA4, or if white-label client logins and rank tracking are part of what you sell. It connects to far more sources than Quantalog does.",
    checkedOn: CHECKED_ON,
    rows: [
      {
        point: "Free plan",
        ours: "Yes, for one small site, with a monthly email report.",
        theirs: "No free plan. A 14-day trial, then priced per client, from $20 a month on annual billing according to its pricing page.",
        verdict: "quantalog",
      },
      {
        point: "Data sources",
        ours: "Quantalog's own analytics, Google Search Console, SEO audits and form leads.",
        theirs: "90+ marketing integrations, including ad platforms, social networks and GA4.",
        verdict: "rival",
      },
      withTheirs(DATA_COLLECTION_ROW, "No. It reports on data from the tools you connect."),
      withTheirs(DELIVERY_ROW, "Scheduled email reports."),
      {
        point: "White label",
        ours: "Not offered. Report emails carry the Quantalog name, though Telegram reports can come from your own bot.",
        theirs: "White-label options for the client dashboard and reports.",
        verdict: "rival",
      },
      withTheirs(SHARING_ROW, "Client logins to their own dashboard."),
      {
        point: "Keyword rank tracking",
        ours: "Not offered. Search Console shows the average position for the queries a site already appears for.",
        theirs: "A Rank Tracker add-on, priced by the number of keywords.",
        verdict: "rival",
      },
      withTheirs(LEADS_ROW, "Not part of the product. It reports on marketing data."),
    ],
    faqs: [
      {
        q: "Can Quantalog report on Google Ads or Facebook Ads?",
        a: "No. It reports on its own website analytics, Search Console, SEO audits and form leads. If clients judge you on ad spend, a tool that connects to the ad platforms, such as AgencyAnalytics, is the better fit.",
      },
      {
        q: "Are Quantalog reports white-label?",
        a: "Not yet. Report emails carry the Quantalog name. Telegram reports can be sent from your own bot, and the public dashboard shows only the panels you choose.",
      },
      {
        q: "Do clients need an account to read their report?",
        a: "No. Reports arrive by email, WhatsApp or Telegram, and the public dashboard link opens without signing in.",
      },
    ],
  },
  {
    slug: "looker-studio-alternative",
    rival: "Looker Studio",
    title: "Quantalog vs Looker Studio",
    description:
      "A Looker Studio alternative for agencies and small businesses that want client reports without building them: cookieless analytics, SEO audits and Search Console, sent by email, WhatsApp or Telegram.",
    intro:
      "Looker Studio is Google's free report builder. It can chart almost anything once you connect the data and design each page. Quantalog collects the website data itself and sends finished reports on a schedule. This page is for teams who would rather send a report than build one.",
    whenTheirs:
      "Stay with Looker Studio if you are happy building reports by hand, need data from many Google and partner sources on one page, or want it free at any scale. It is the most flexible option here and costs nothing to start.",
    checkedOn: CHECKED_ON,
    rows: [
      {
        point: "Price",
        ours: "Free plan for one small site, then paid plans.",
        theirs: "Free. Looker Studio Pro adds team features and more delivery options for a fee.",
        verdict: "rival",
      },
      {
        point: "Data sources",
        ours: "Quantalog's own analytics, Google Search Console, SEO audits and form leads.",
        theirs: "Google's own connectors plus hundreds of partner connectors, some of them paid.",
        verdict: "rival",
      },
      withTheirs(DATA_COLLECTION_ROW, "No. It charts data from other tools, most often GA4."),
      {
        point: "Setting up a report",
        ours: "Reports and dashboards work once the tracking tag is live. Start from twenty templates, or describe the dashboard to Orbit.",
        theirs: "You build each report yourself, chart by chart, from connected data.",
        verdict: "quantalog",
      },
      {
        point: "Design freedom",
        ours: "Templates and a widget picker, with a fixed set of charts.",
        theirs: "Almost any chart, layout and calculated field you can build.",
        verdict: "rival",
      },
      withTheirs(
        DELIVERY_ROW,
        "A PDF by email on the free version, up to 50 recipients per schedule, with Chat and Slack delivery on Pro.",
        "both"
      ),
      withTheirs(SHARING_ROW, "Share links, embeds and Google account permissions."),
      withTheirs(LEADS_ROW, "Only if you connect a source that holds them."),
    ],
    faqs: [
      {
        q: "Is Looker Studio free?",
        a: "Yes. Looker Studio is free, and Looker Studio Pro is a paid upgrade for teams. Quantalog has a free plan for one small site with a monthly report, and paid plans for more.",
      },
      {
        q: "Can Quantalog use my GA4 data?",
        a: "No. Quantalog collects its own cookieless data from a tracking tag, so it doesn't import GA4. Many teams run both side by side for a few weeks before choosing.",
      },
      {
        q: "Which is faster to set up?",
        a: "Quantalog, because there is nothing to design: the tag starts collecting and the report is already laid out. Looker Studio takes longer, and gives you more control in return.",
      },
    ],
  },
];
