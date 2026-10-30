import { ArrowDownRight, BarChart3, Clock, GitCompareArrows, Route, TrendingDown } from "lucide-react";
import type { AppPage } from "./types";

export const funnelsApp: AppPage = {
  slug: "funnels",
  logo: "quantalog-funnels.svg",
  name: "Quantalog Funnels",
  shortName: "Funnels",
  group: "Analyze",
  unlock: "once",
  docs: "/docs/funnels",
  launched: "2026-10-30",
  title: "Find the step",
  accent: "where people leave.",
  description:
    "Line up the pages and events that lead to a sale, and see how many visitors make it through each one, where the rest drop off, and how long each step takes.",
  metaDescription:
    "Conversion funnels for your website. Mix pages and events, see drop-off per step, the biggest leak, time between steps and conversion over time.",
  keywords: ["conversion funnel analytics", "funnel drop-off", "checkout funnel", "website funnel tool", "step conversion rate"],
  chips: [
    { icon: Route, label: "Landing → Pricing → Signup" },
    { icon: TrendingDown, label: "Biggest leak: Pricing, −412" },
    { icon: GitCompareArrows, label: "vs previous period" },
  ],
  stats: [
    { value: "8", label: "Steps per funnel" },
    { value: "4", label: "Conversion time scales" },
    { value: "1", label: "Unlock, no subscription" },
  ],
  features: [
    {
      icon: Route,
      title: "Pages and events, mixed",
      body: "Each step is a page someone visited or an event they fired, so /pricing → checkout_started → purchase is one funnel.",
    },
    {
      icon: TrendingDown,
      title: "The biggest leak",
      body: "Ranked by sessions lost, not percentage, so a busy step losing 30% ranks above a quiet one losing 60%.",
    },
    {
      icon: BarChart3,
      title: "Read it both ways",
      body: "Switch each step between share of the first step and share of the previous one, with the lost sessions shown above every bar.",
    },
    {
      icon: Clock,
      title: "Time between steps",
      body: "See how long people take to get from one step to the next, and spot the step where they stall.",
    },
    {
      icon: GitCompareArrows,
      title: "Against last period",
      body: "Every number compared with the period before, with green and red arrows for what improved and what slipped.",
    },
    {
      icon: ArrowDownRight,
      title: "Conversion over time",
      body: "Conversion by when visitors entered, from 5 minutes to weeks. A sudden dip usually means a release or an outage.",
    },
  ],
  steps: [
    {
      title: "Unlock Funnels",
      body: "A workspace admin unlocks Quantalog Funnels once in Apps. It appears in the sidebar for the whole team.",
    },
    {
      title: "Add the steps",
      body: "Press New funnel or pick a suggestion built from your traffic. Add pages and events in order, up to eight.",
    },
    {
      title: "Fix the leak",
      body: "Open the funnel, find the biggest leak, and compare with the previous period after you change that step.",
    },
  ],
  story: {
    eyebrow: "How it counts",
    title: "Session based, in order, no shortcuts.",
    paragraphs: [
      "A session counts toward a step only if it reached every earlier step first, in order. That is what makes the drop-off between two steps trustworthy.",
      "The preview beside the editor shows the result as you add steps, so you build the funnel against real numbers instead of guessing which pages matter.",
    ],
  },
  connections: [
    { kind: "product", href: "/analytics", how: "Steps come from the pages and events your tracking script already records." },
    { kind: "product", href: "/platform-api", how: "Send custom events like checkout_started from your app and use them as steps." },
    { kind: "app", id: "tasks", how: "Turn the biggest leak into a task for whoever owns that page." },
    { kind: "app", id: "goals", how: "Set a monthly conversion target for the event at the end of the funnel." },
  ],
  included: [
    "Up to eight steps per funnel",
    "Pages and custom events in any order",
    "Conversion, entered and completed sessions",
    "The biggest leak by sessions lost",
    "Share of first and of previous step",
    "Average time between steps",
    "Comparison with the previous period",
    "Conversion over time with dips marked",
  ],
  faqs: [
    {
      q: "Is Funnels a subscription?",
      a: "No. A workspace admin unlocks it once in Apps. Saved funnels are shared with everyone in the workspace.",
    },
    {
      q: "Can I use events, not just pages?",
      a: "Yes. Any custom event you send can be a step, and you can mix pages and events in the same funnel.",
    },
    {
      q: "Who can edit funnels?",
      a: "Editors and admins can create, change and delete them. Viewers can open and read them.",
    },
    {
      q: "What happens if I turn Funnels off?",
      a: "Funnels leaves the sidebar but every saved funnel is kept.",
    },
  ],
  related: ["goals", "insights", "popups"],
  ctaTitle: "Find your biggest leak today.",
};
