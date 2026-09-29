import { BarChart3, FileSearch, LayoutGrid, Plug, TrendingUp } from "lucide-react";
import { OrbitIcon } from "../orbit/orbit-icon";
import type { SegmentOption } from "../segmented-control";
import { AnalyticsPreview } from "./previews/analytics-preview";
import { SeoPreview } from "./previews/seo-preview";
import { SearchPreview } from "./previews/search-preview";
import { FormsPreview } from "./previews/forms-preview";
import { OrbitPreview } from "./previews/orbit-preview";
import { ApiPreview } from "./previews/api-preview";

export type Product = {
  id: string;
  label: string;
  icon: NonNullable<SegmentOption["icon"]>;
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
    body: "Real-time traffic counted without cookies, so the numbers include the people who would have declined a banner.",
    points: [
      "Live dashboard, updated in about three seconds",
      "Funnels, goals, retention cohorts and custom events",
      "Saved segments, markers and spreadsheet export",
    ],
    cta: { label: "Explore analytics", href: "/analytics" },
    Preview: AnalyticsPreview,
  },
  {
    id: "search",
    label: "Search visibility",
    icon: TrendingUp,
    title: "What Google sends you, beside what it becomes.",
    body: "Connect Google Search Console and see searches, clicks, impressions and rankings next to the traffic you already track. Read-only — nothing in Search Console is changed.",
    points: [
      "Clicks, impressions, CTR and average position",
      "Insights on queries close to page one",
      "Index status for every page",
    ],
    cta: { label: "Explore search visibility", href: "/search-visibility" },
    Preview: SearchPreview,
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
    id: "forms",
    label: "Forms",
    icon: LayoutGrid,
    title: "Forms that know what brought people in.",
    body: "Drag-and-drop forms — or describe one and let Orbit draft it. Entries land next to the analytics for the traffic that produced them.",
    points: [
      "Build a form from a sentence with Orbit",
      "Per-field drop-off, not just per form",
      "Payments, webhooks and your own branding",
    ],
    cta: { label: "Explore forms", href: "/forms" },
    Preview: FormsPreview,
  },
  {
    id: "orbit",
    label: "Orbit AI",
    icon: OrbitIcon,
    title: "An assistant that knows the product — and, on Pro, your numbers.",
    body: "Orbit answers how-to questions from Quantalog's own reference and walks you through fixing what an audit flagged. On Orbit Pro it also reads a summary of your last seven days.",
    points: [
      "Step-by-step fixes for SEO audit issues",
      "Answers from your own analytics on Orbit Pro",
      "Every model on every plan — pick your favourite",
    ],
    cta: { label: "Explore Orbit", href: "/social" },
    Preview: OrbitPreview,
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
