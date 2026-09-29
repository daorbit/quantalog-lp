import { BarChart3, FileSearch, Mails, Plug } from "lucide-react";
import { OrbitMark } from "../orbit/orbit-mark";
import { AnalyticsPreview } from "./previews/analytics-preview";
import { SeoPreview } from "./previews/seo-preview";
import { OrbitPreview } from "./previews/orbit-preview";
import { ReportsPreview } from "./previews/reports-preview";
import { ApiPreview } from "./previews/api-preview";

type TabIcon = (props: { className?: string }) => React.ReactNode;

function OrbitTabIcon({ className = "" }: { className?: string }) {
  return <OrbitMark size={18} className={className} />;
}

export type Product = {
  id: string;
  label: string;
  icon: TabIcon;
  title: string;
  body: string;
  points: string[];
  cta: { label: string; href: string };
  Preview: () => React.ReactNode;
};

export const products: Product[] = [
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    title: "See every visitor the moment they arrive.",
    body: "Real-time traffic, funnels, goals and retention — counted without cookies, so the numbers include people who would have declined a banner.",
    points: [
      "Live dashboard, updated in about three seconds",
      "Funnels, goals and retention cohorts",
      "Referrer, UTM, device and country breakdowns",
    ],
    cta: { label: "Explore analytics", href: "/analytics" },
    Preview: AnalyticsPreview,
  },
  {
    id: "seo",
    label: "SEO audits",
    icon: FileSearch,
    title: "Find what's holding your rankings back.",
    body: "Lighthouse-backed audits on the pages you already track, kept over time so you can prove a fix moved the number.",
    points: [
      "Lighthouse scores for mobile and desktop",
      "Broken links, redirects and structured data",
      "Shareable reports for clients, per audit",
    ],
    cta: { label: "Explore SEO audits", href: "/seo-audits" },
    Preview: SeoPreview,
  },
  {
    id: "orbit",
    label: "Orbit AI",
    icon: OrbitTabIcon,
    title: "Ask your analytics a question in plain English.",
    body: "Orbit reads your dashboard and answers with your numbers, not guesses — then offers to write the post about it.",
    points: [
      "Explains what changed and why",
      "Competitor analysis and SEO briefs",
      "Scheduled LinkedIn posts you approve first",
    ],
    cta: { label: "Explore Orbit", href: "/social" },
    Preview: OrbitPreview,
  },
  {
    id: "reports",
    label: "Reports",
    icon: Mails,
    title: "A weekly summary people actually read.",
    body: "Scheduled email and WhatsApp reports with a plain-English read of the week, and a spreadsheet for anyone who wants the detail.",
    points: [
      "Daily, weekly or monthly schedules",
      "Delivered by email or WhatsApp",
      "Spreadsheet attached to every send",
    ],
    cta: { label: "Explore reports", href: "/reports" },
    Preview: ReportsPreview,
  },
  {
    id: "api",
    label: "Platform API",
    icon: Plug,
    title: "Put analytics inside your own product.",
    body: "A multi-tenant API for platforms whose customers each run a site. Create projects, inject the tracker and read stats back over REST.",
    points: [
      "One project per customer, one API key",
      "Automatic tracker injection",
      "White-label every number",
    ],
    cta: { label: "Explore the Platform API", href: "/platform-api" },
    Preview: ApiPreview,
  },
];
