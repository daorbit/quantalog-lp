import { CalendarCheck, ClipboardList, FileText, ListChecks, Scale, Search, Users } from "lucide-react";
import type { AppPage } from "./types";

export const growthRadarApp: AppPage = {
  slug: "growth-radar",
  logo: "quantalog-growth-radar.svg",
  name: "Quantalog Growth Radar",
  shortName: "Growth Radar",
  group: "Analyze",
  unlock: "free",
  docs: "/docs/quantalog-growth-radar",
  launched: "2026-11-13",
  title: "See what deserves attention,",
  accent: "and whether the fix helped.",
  description:
    "Growth Radar reads your analytics, lead capture forms, bookings and Google Search data every morning, and lists the changes worth acting on with the numbers behind each one.",
  metaDescription:
    "Find traffic that is not turning into enquiries, pages with weak conversion and forms people stop finishing. Evidence-backed findings, ranked by priority, with before-and-after tracking.",
  keywords: [
    "growth opportunities analytics",
    "conversion rate drop alert",
    "traffic without leads",
    "form conversion analysis",
    "marketing opportunity finder",
  ],
  chips: [
    { icon: Users, label: "Sessions up 38%, leads down 7%" },
    { icon: Scale, label: "High priority, high confidence" },
    { icon: ListChecks, label: "4 next steps" },
  ],
  stats: [
    { value: "5", label: "Checks across your data" },
    { value: "4", label: "Sources it reads" },
    { value: "0", label: "Mystery scores" },
  ],
  features: [
    {
      icon: Users,
      title: "Traffic without enquiries",
      body: "Sessions rose, but leads did not keep up. Compared over two complete weeks, never a half-finished one.",
    },
    {
      icon: FileText,
      title: "Pages with weak conversion",
      body: "A busy landing page that brings far fewer leads than your site average, matched by the page each lead landed on.",
    },
    {
      icon: ClipboardList,
      title: "Forms people stop finishing",
      body: "A form turns fewer views into responses than it used to, which usually points to the form rather than the traffic.",
    },
    {
      icon: Search,
      title: "Impressions without clicks",
      body: "You show up in more Google searches, but a smaller share of searchers click through.",
    },
    {
      icon: CalendarCheck,
      title: "Booking drops",
      body: "Fewer bookings while just as many people open the booking form.",
    },
    {
      icon: Scale,
      title: "Honest about uncertainty",
      body: "Every finding shows its sample size, the periods compared and what the data cannot tell you.",
    },
  ],
  steps: [
    {
      title: "Turn it on",
      body: "A workspace admin enables Quantalog Growth Radar in Apps. The first scan runs when you open it.",
    },
    {
      title: "Read the evidence",
      body: "Open a finding to see the numbers, why it matters, what to check next and how far to trust it.",
    },
    {
      title: "Act and measure",
      body: "Plan it, assign an owner, and record what you changed. Growth Radar compares the same number afterwards.",
    },
  ],
  story: {
    eyebrow: "Evidence first",
    title: "Findings you can check, not a score you have to trust.",
    paragraphs: [
      "Every finding comes from a rule you can read and tune, with a minimum amount of data before it says anything. Priority is High, Medium or Low, explained by impact, confidence and urgency.",
      "When you act, Growth Radar measures again and labels the result as an observed change, because a single before-and-after can never prove what caused it.",
    ],
  },
  connections: [
    { kind: "product", href: "/forms", how: "Reads form views, responses, landing pages and bookings from Lead capture." },
    { kind: "app", id: "tasks", how: "Turn any finding into a task with its next steps attached." },
    { kind: "app", id: "alerts", how: "Alerts tells you the moment traffic drops. Growth Radar shows what to work on over the following weeks." },
  ],
  included: [
    "Five checks across analytics, forms, bookings and search",
    "Source status and data freshness",
    "High, Medium and Low priority with reasons",
    "Evidence with periods and sample sizes",
    "Plan, investigate, resolve, snooze and dismiss",
    "Owners, notes and an activity log",
    "Before-and-after tracking for your changes",
    "Bell notification for high-priority findings",
  ],
  plans: [
    { row: "Morning scans", free: "Yes", starter: "Yes", pro: "Yes" },
    { row: "Scan on demand", free: "—", starter: "3 an hour", pro: "3 an hour" },
    { row: "History", free: "30 days", starter: "180 days", pro: "1 year" },
  ],
  faqs: [
    {
      q: "Does Growth Radar change anything on my site?",
      a: "No. It only reads your data and suggests what to check. You decide what to change.",
    },
    {
      q: "Does it use AI?",
      a: "The checks are plain rules. Orbit can reword a finding in two sentences using only its numbers, and any summary that adds a number or a cause is thrown away. You can turn that off.",
    },
    {
      q: "Can it prove my change worked?",
      a: "No tool can from a single before-and-after. Growth Radar shows the observed change and lets you note anything else that changed at the same time.",
    },
  ],
  related: ["alerts", "funnels", "tasks"],
  ctaTitle: "Know what to work on next.",
};
