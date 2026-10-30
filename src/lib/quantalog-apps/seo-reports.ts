import { Eye, EyeOff, FileSearch, KeyRound, Link2, RefreshCw } from "lucide-react";
import type { AppPage } from "./types";

export const seoReportsApp: AppPage = {
  slug: "seo-reports",
  logo: "quantalog-seo-reports.svg",
  name: "Quantalog SEO Reports",
  shortName: "SEO Reports",
  group: "Share",
  unlock: "free",
  docs: "/docs/quantalog-seo-reports",
  launched: "2026-10-30",
  title: "Every SEO audit,",
  accent: "at a link your client can open.",
  description:
    "Each audited page gets its own read-only report link. Send it to a client or a teammate and they open it without a Quantalog account.",
  metaDescription:
    "Shareable SEO audit reports. One read-only link per audited page, always showing the newest result, with server-side control over what readers see.",
  keywords: ["shareable SEO report", "client SEO report link", "white label SEO audit", "SEO audit sharing", "read-only SEO report"],
  chips: [
    { icon: Link2, label: "One link per page" },
    { icon: RefreshCw, label: "Always the newest run" },
    { icon: EyeOff, label: "You choose what's shown" },
  ],
  stats: [
    { value: "1", label: "Link per audited page" },
    { value: "0", label: "Accounts readers need" },
    { value: "∞", label: "Re-audits, same link" },
  ],
  features: [
    {
      icon: Link2,
      title: "A link per page",
      body: "Every audited page has its own link, so sharing one never exposes the rest of the site's history.",
    },
    {
      icon: RefreshCw,
      title: "Same link, newest result",
      body: "Run the audit again and the link stays the same, showing the latest result. Send it once, it stays current.",
    },
    {
      icon: EyeOff,
      title: "You choose what readers see",
      body: "Score, issues, technical checks and performance are on by default. Meta tags, content, links, structured data and AI search start off.",
    },
    {
      icon: FileSearch,
      title: "Removed on the server",
      body: "Anything you switch off never reaches the reader, not even in the page source.",
    },
    {
      icon: Eye,
      title: "See it was read",
      body: "Each page shows how often its link was opened.",
    },
    {
      icon: KeyRound,
      title: "Replace a link",
      body: "If a link reached the wrong person, Replace link makes the old address stop working at once.",
    },
  ],
  steps: [
    {
      title: "Turn SEO Reports on",
      body: "A workspace admin enables Quantalog SEO Reports in Apps. Every audited page is listed with its own link.",
    },
    {
      title: "Choose what's visible",
      body: "Under What readers see, pick the sections every report link shows.",
    },
    {
      title: "Send the link",
      body: "Copy a page's link and send it, or open it first to see exactly what the reader sees.",
    },
  ],
  story: {
    eyebrow: "For agencies",
    title: "Show the work without handing over the login.",
    paragraphs: [
      "Clients want proof the audit happened and that the fixes landed. A report link gives them exactly that, always current, with nothing they can break.",
      "Sections that can carry internal URLs or staging paths start off, so a client never sees what they shouldn't.",
    ],
  },
  connections: [
    { kind: "product", href: "/seo-audits", how: "Every page you audit gets a report link automatically." },
    { kind: "app", id: "compare", how: "Show a client the plan that came out of the competitor comparison." },
    { kind: "app", id: "public-dashboard", how: "Pair with a public dashboard for traffic and audits in two links." },
  ],
  included: [
    "A live link for every audited page",
    "Same link across re-audits",
    "One set of visibility choices",
    "Sensitive sections off by default",
    "Server-side removal of hidden sections",
    "Open count per page",
    "Replace link",
    "Remove page and its history",
  ],
  faqs: [
    {
      q: "Does the reader need an account?",
      a: "No. The link opens a read-only report for anyone who has it.",
    },
    {
      q: "Will the link change when I re-run the audit?",
      a: "No. The same link shows the newest result, so you can send it once.",
    },
    {
      q: "What happens if I turn the app off?",
      a: "Your links and settings are kept, but every report link stops opening until you turn it back on.",
    },
  ],
  related: ["public-dashboard", "compare", "tasks"],
  ctaTitle: "Send your next audit as a link.",
};
