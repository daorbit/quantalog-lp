import { Code, LayoutTemplate, Search, Target, type LucideIcon } from "lucide-react";

export type DashboardFact = { icon: LucideIcon; title: string; body: string };

export const dashboardFacts: DashboardFact[] = [
  {
    icon: LayoutTemplate,
    title: "20 ready-made templates",
    body: "Executive summaries, client reports, launches and more — preview one, name it, done.",
  },
  {
    icon: Search,
    title: "Google Search inside",
    body: "Clicks, rankings, top queries and quick wins sit beside your traffic on the same grid.",
  },
  {
    icon: Target,
    title: "Conversion goals",
    body: "Count the pages and events that matter, and see which channels drive them.",
  },
  {
    icon: Code,
    title: "Embed any widget",
    body: "Put a live chart or KPI on your own site, a client portal or a Notion page.",
  },
];
