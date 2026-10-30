import { BarChart3, Bot, History, ListOrdered, ScanSearch, Swords } from "lucide-react";
import type { AppPage } from "./types";

export const compareApp: AppPage = {
  slug: "compare",
  logo: "quantalog-compare.svg",
  name: "Quantalog Compare",
  shortName: "Compare",
  group: "Analyze",
  unlock: "free",
  docs: "/docs/quantalog-compare",
  launched: "2026-10-30",
  title: "Your page against the ten",
  accent: "you actually compete with.",
  description:
    "Put one of your pages beside up to ten competitor pages, score them all the same way, and get a ranked list of what would close the gap.",
  metaDescription:
    "Compare your pages with up to 10 competitors per site. Same scoring for everyone, score history over time, and a ranked list of what to fix first.",
  keywords: ["competitor page comparison", "SEO competitor analysis", "content gap tool", "competitor scoring", "page benchmark"],
  chips: [
    { icon: Swords, label: "Up to 10 competitors per site" },
    { icon: ListOrdered, label: "Ranked fixes, biggest gap first" },
    { icon: History, label: "Every refresh kept" },
  ],
  stats: [
    { value: "10", label: "Competitors per site" },
    { value: "1", label: "Scoring method for everyone" },
    { value: "0", label: "Extra tools to install" },
  ],
  features: [
    {
      icon: ScanSearch,
      title: "Measured side by side",
      body: "Quantalog fetches their page and yours together, so both scores come from the same run and the same rules. No guessing whether a tool scored them differently.",
    },
    {
      icon: ListOrdered,
      title: "Standings at a glance",
      body: "See where your page ranks in the set today, and how far ahead or behind each competitor sits.",
    },
    {
      icon: BarChart3,
      title: "What closes the gap",
      body: "Pick a competitor and get a ranked list of what they have that you don't: missing sections, structured data and the terms they make prominent.",
    },
    {
      icon: History,
      title: "Score over time",
      body: "Every refresh is kept, so you can follow each competitor's score as they change their page, and see your own fixes land.",
    },
    {
      icon: Bot,
      title: "Ask Orbit what to fix",
      body: "Ask in plain language what to work on first across every competitor, and get an answer grounded in the comparison.",
    },
    {
      icon: Swords,
      title: "Per site, for the whole team",
      body: "Each site keeps its own competitor set. Editors and above add and remove them; everyone in the workspace can read the results.",
    },
  ],
  steps: [
    {
      title: "Turn Compare on",
      body: "A workspace admin opens Apps, finds Quantalog Compare and presses Enable. It appears in the sidebar under Analyze for everyone.",
    },
    {
      title: "Add competitor pages",
      body: "Pick the site, paste a competitor's page address and press Add. Repeat for up to ten pages per site.",
    },
    {
      title: "Fix the biggest gap first",
      body: "Read the standings, open a competitor for its ranked list of gaps, and press Compare again after you ship a change.",
    },
  ],
  story: {
    eyebrow: "Why it matters",
    title: "A score means nothing without the room it's in.",
    paragraphs: [
      "An SEO score of 82 sounds fine until the three pages above you on Google all score 95. Compare puts your page in the room it actually competes in, so the number has context.",
      "Instead of a generic checklist, you get the specific things your competitors do that you don't, ranked by how much they would move you. That is a shorter, more useful to-do list.",
    ],
  },
  connections: [
    { kind: "product", href: "/seo-audits", how: "Compare uses the same scoring as your SEO audits, so a fix shows up in both." },
    { kind: "app", id: "tasks", how: "Turn a gap into a task on your board, with an owner and a due date." },
    { kind: "app", id: "seo-reports", how: "Send the client a read-only audit link to show the work behind the plan." },
    { kind: "product", href: "/social", how: "Orbit reads the comparison and tells you what to fix first, in plain language." },
  ],
  included: [
    "Up to 10 competitor pages per site",
    "Your page and theirs fetched in the same run",
    "Standings for the whole set",
    "Score history for every competitor",
    "A ranked list of gaps per competitor",
    "Missing sections, structured data and prominent terms",
    "Orbit answers on what to fix first",
    "Competitor sets kept when the app is off",
  ],
  faqs: [
    {
      q: "Does Compare need anything installed on competitor sites?",
      a: "No. Quantalog fetches their public page the same way a browser would. Nothing is installed anywhere and competitors are not notified.",
    },
    {
      q: "How many competitors can I track?",
      a: "Up to 10 pages per site in your workspace. Each site keeps its own set, so an agency can track a different set for every client site.",
    },
    {
      q: "What happens when I turn Compare off?",
      a: "It leaves the sidebar and competitor checks stop. Your competitors and their score history are kept, so turning it back on picks up where you left off.",
    },
    {
      q: "Who can add competitors?",
      a: "Editors, admins and owners. Viewers can read the comparison but can't change the set.",
    },
  ],
  related: ["tasks", "seo-reports", "insights"],
  ctaTitle: "See where you stand against them.",
};
