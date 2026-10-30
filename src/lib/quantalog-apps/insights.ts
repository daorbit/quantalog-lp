import { BellRing, CalendarClock, Filter, History, ListChecks, MessageSquareText } from "lucide-react";
import type { AppPage } from "./types";

export const insightsApp: AppPage = {
  slug: "insights",
  logo: "quantalog-insights.svg",
  name: "Quantalog Insights",
  shortName: "Insights",
  group: "Analyze",
  unlock: "once",
  docs: "/docs/quantalog-insights",
  launched: "2026-10-30",
  title: "What changed this week,",
  accent: "without digging for it.",
  description:
    "Every Monday, Insights compares the last seven days with the seven before, keeps only what moved enough to matter, and Orbit sums up the week in two sentences.",
  metaDescription:
    "A weekly feed of what changed on your website: traffic, sources, pages, countries and campaigns, with a plain-language summary and one-click tasks.",
  keywords: ["weekly analytics summary", "website insights", "traffic changes", "automated analytics insights", "AI analytics summary"],
  chips: [
    { icon: MessageSquareText, label: "Two-sentence weekly read" },
    { icon: Filter, label: "Only what moved enough" },
    { icon: ListChecks, label: "One click to a task" },
  ],
  stats: [
    { value: "7", unit: "days", label: "Against the 7 before" },
    { value: "52", unit: "wks", label: "History on Pro" },
    { value: "1", label: "Bell notice per new week" },
  ],
  features: [
    {
      icon: Filter,
      title: "Only what matters",
      body: "Visitors up or down by a fifth or more, new referrers, pages taking off or slipping, new countries, new campaigns, bounce and mobile shifts.",
    },
    {
      icon: MessageSquareText,
      title: "Orbit's read on the week",
      body: "A two-sentence summary at the top says what happened and why it probably did, in plain language.",
    },
    {
      icon: ListChecks,
      title: "Straight to action",
      body: "Open the matching report already filtered, or create a task on your board with a link back to the data.",
    },
    {
      icon: BellRing,
      title: "Ready on Monday",
      body: "A notice lands in the bell when the new week is ready. Starter and Pro can refresh the current week on demand.",
    },
    {
      icon: History,
      title: "Step back through weeks",
      body: "Use the arrows to read earlier weeks: 4 on Free, 12 on Starter and a full year on Pro.",
    },
    {
      icon: CalendarClock,
      title: "No setup",
      body: "It reads the traffic you already track. Very small sites are skipped until there is enough to compare.",
    },
  ],
  steps: [
    {
      title: "Unlock Insights",
      body: "A workspace admin opens Apps, finds Quantalog Insights and unlocks it once. It appears in the sidebar.",
    },
    {
      title: "Open the first week",
      body: "The first week is ready within a few minutes of opening Insights. After that, a new one arrives every Monday.",
    },
    {
      title: "Act on what moved",
      body: "Press View in analytics to see the detail, or Create task to hand it to someone on your board.",
    },
  ],
  story: {
    eyebrow: "Why it matters",
    title: "Nobody reads every chart every week.",
    paragraphs: [
      "The useful change is usually in a breakdown nobody opened: a new referrer, a page that slipped, a country that doubled. Insights reads them all for you and keeps only what moved enough to matter.",
      "What's left is a short feed you can read with your Monday coffee, with each item one click from the data and one click from a task.",
    ],
  },
  connections: [
    { kind: "product", href: "/analytics", how: "Built from the traffic, sources, pages and campaigns you already track." },
    { kind: "app", id: "tasks", how: "Create task turns an insight into a card with a link back to the filtered data." },
    { kind: "product", href: "/social", how: "Orbit writes the weekly summary from your own numbers." },
    { kind: "app", id: "alerts", how: "Alerts catch sudden drops the same day; Insights explains the week." },
  ],
  included: [
    "Weekly comparison, last 7 days against the 7 before",
    "Traffic, sources, pages, countries and campaigns",
    "Bounce and mobile share shifts",
    "Orbit's two-sentence summary",
    "View in analytics, already filtered",
    "Create task with a link back",
    "Bell notice when a week is ready",
    "Week history you can step through",
  ],
  plans: [
    { row: "Week history", free: "4 weeks", starter: "12 weeks", pro: "52 weeks" },
    { row: "Refresh on demand", free: "—", starter: "Yes", pro: "Yes" },
  ],
  faqs: [
    {
      q: "When is a new week ready?",
      a: "Every Monday. The first week is generated within a few minutes of opening Insights for the first time.",
    },
    {
      q: "Why don't I see any insights for a small site?",
      a: "Very small sites are skipped until there is enough traffic to compare, so a handful of visits doesn't produce misleading swings.",
    },
    {
      q: "Is my data sent anywhere for the summary?",
      a: "Only the week's figures are read to write the two-sentence summary. No visitor-level data is involved.",
    },
  ],
  related: ["alerts", "tasks", "goals"],
  ctaTitle: "Get your first week in minutes.",
};
