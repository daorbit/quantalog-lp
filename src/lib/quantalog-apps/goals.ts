import { CalendarRange, Gauge, LayoutDashboard, Search, Target, TrendingUp } from "lucide-react";
import type { AppPage } from "./types";

export const goalsApp: AppPage = {
  slug: "goals",
  logo: "quantalog-goals.svg",
  name: "Quantalog Goals",
  shortName: "Goals",
  group: "Analyze",
  unlock: "free",
  docs: "/docs/goals",
  launched: "2026-10-30",
  title: "Targets that keep",
  accent: "their own score.",
  description:
    "Set a monthly or quarterly number once. Quantalog counts it from your live data, shows whether you are on pace, and flags a miss before the period ends.",
  metaDescription:
    "Monthly and quarterly targets for visitors, signups, form submissions or Google position. Live progress, pace projection and early warnings.",
  keywords: ["website goals tracking", "monthly traffic targets", "KPI tracker", "conversion targets", "OKR analytics"],
  chips: [
    { icon: Target, label: "50,000 visitors this month" },
    { icon: TrendingUp, label: "On track, 6 days to spare" },
    { icon: CalendarRange, label: "Monthly or quarterly" },
  ],
  stats: [
    { value: "6", label: "Things you can target" },
    { value: "2", label: "Periods: month or quarter" },
    { value: "1", unit: "min", label: "Between refreshes" },
  ],
  features: [
    {
      icon: Target,
      title: "Six kinds of target",
      body: "Visitors, pageviews, sessions, conversions, form submissions, or your average Google position, across one site or all of them.",
    },
    {
      icon: Gauge,
      title: "Pace, not just progress",
      body: "A pace line compares where you are with where you would be on a straight line to the target, so you know mid-month, not on the 31st.",
    },
    {
      icon: TrendingUp,
      title: "Clear status",
      body: "Achieved, on track, behind pace by how much, or needs setup with what's missing. Every card says it plainly.",
    },
    {
      icon: CalendarRange,
      title: "Resets itself",
      body: "When a month or quarter ends, every goal starts fresh on the next one. There is nothing to reset or copy over.",
    },
    {
      icon: Search,
      title: "Google position goals",
      body: "Aim for an average position under 5. Read from Search Console over the last 28 days, so it counts real rankings.",
    },
    {
      icon: LayoutDashboard,
      title: "On any dashboard",
      body: "Drop the Goal progress widget on a custom dashboard to see every target beside the traffic that drives it.",
    },
  ],
  steps: [
    {
      title: "Turn Goals on",
      body: "A workspace admin enables Quantalog Goals in Apps, or presses Turn on Goals on the Goal progress widget.",
    },
    {
      title: "Set the number",
      body: "Choose New goal, pick what to measure, the target and monthly or quarterly. Quantalog suggests a name.",
    },
    {
      title: "Watch the pace",
      body: "Each card shows progress, days left and whether you're on course. Numbers refresh every minute.",
    },
  ],
  story: {
    eyebrow: "Why it matters",
    title: "The month is decided before it ends.",
    paragraphs: [
      "Most teams find out they missed a target in the monthly review, when it's too late to do anything. Goals projects the current rate to the end of the period and tells you while there is still time to push.",
      "The projection stays hidden for the first few percent of a period, so one busy morning on the 1st doesn't promise a record month.",
    ],
  },
  connections: [
    { kind: "product", href: "/analytics", how: "Visitors, pageviews, sessions and conversions come straight from your live analytics." },
    { kind: "product", href: "/forms", how: "Count responses to your lead capture forms toward a signup target." },
    { kind: "app", id: "search-console", how: "Average position goals read your rankings from a linked Search Console property." },
    { kind: "app", id: "alerts", how: "Get told on email, Telegram or WhatsApp when a goal falls behind pace." },
  ],
  included: [
    "Visitor, pageview and session targets",
    "Conversion and form submission targets",
    "Average Google position targets",
    "Monthly and quarterly periods in UTC",
    "Pace line and end-of-period projection",
    "Achieved, on track and behind pace status",
    "Goal progress widget for dashboards",
    "Automatic reset each period",
  ],
  plans: [{ row: "Goals", free: "2", starter: "10", pro: "30" }],
  faqs: [
    {
      q: "How is a goal different from a conversion goal?",
      a: "A conversion goal defines what counts as a conversion, such as reaching /thank-you. A goal sets how many you are aiming for in a month or quarter. You can target the number of conversions of any conversion goal.",
    },
    {
      q: "When does a quarterly goal start counting?",
      a: "Months and quarters follow the calendar in UTC. A quarterly goal set in February counts from 1 January to 31 March.",
    },
    {
      q: "Can viewers change goals?",
      a: "No. Editors, admins and owners create, edit and delete goals. Viewers see them read-only.",
    },
    {
      q: "What does Needs setup mean?",
      a: "Something the goal depends on is missing, such as a site, a conversion goal or a Search Console link. The card says exactly what.",
    },
  ],
  related: ["alerts", "insights", "public-dashboard"],
  ctaTitle: "Set this month's number.",
};
