import { BarChart3, CalendarClock, FileSearch, LayoutGrid, Mail, PanelRight, Plug, Signpost, TrendingUp } from "lucide-react";
import { OrbitIcon } from "../orbit/orbit-icon";
import { site } from "@/lib/site";
import { LiveVisual } from "./visuals/live-visual";
import { ScoreVisual } from "./visuals/score-visual";
import { RankVisual } from "./visuals/rank-visual";
import { FieldVisual } from "./visuals/field-visual";
import { OrbitVisual } from "./visuals/orbit-visual";
import { ApiVisual } from "./visuals/api-visual";
import { ReportVisual } from "./visuals/report-visual";
import { SocialVisual } from "./visuals/social-visual";
import { ExtensionVisual } from "./visuals/extension-visual";
import { SourceVisual } from "./visuals/source-visual";

type Link = { label: string; href: string };

export type ExploreTone = "teal" | "blue" | "violet" | "amber" | "rose" | "slate" | "indigo";

export type ExploreItem = {
  tone: ExploreTone;
  icon: (props: { className?: string }) => React.ReactNode;
  label: string;
  title: string;
  body: string;
  primary: Link;
  secondary: Link;
  Visual: () => React.ReactNode;
};

const items: ExploreItem[] = [
  {
    icon: BarChart3,
    tone: "teal",
    label: "Analytics",
    title: "Live. Not tomorrow.",
    body: "Every visitor, the second they arrive.",
    primary: { label: "Learn more", href: "/analytics" },
    secondary: { label: "Install guide", href: "/docs/tracking" },
    Visual: LiveVisual,
  },
  {
    icon: LayoutGrid,
    tone: "amber",
    label: "Forms",
    title: "Find the field that loses them.",
    body: "Drop-off measured per field.",
    primary: { label: "Learn more", href: "/forms" },
    secondary: { label: "Docs", href: "/docs/lead-capture" },
    Visual: FieldVisual,
  },
  {
    icon: Signpost,
    tone: "violet",
    label: "Lead sources",
    title: "Know which ads pay off.",
    body: "Every lead tagged with where it came from, and whether you won it.",
    primary: { label: "Learn more", href: "/forms" },
    secondary: { label: "Docs", href: "/docs/forms-settings-and-analytics#lead-sources" },
    Visual: SourceVisual,
  },
  {
    icon: Mail,
    tone: "blue",
    label: "Reports",
    title: "The numbers, in their inbox.",
    body: "Scheduled email reports with a spreadsheet attached.",
    primary: { label: "Learn more", href: "/reports" },
    secondary: { label: "Docs", href: "/docs/email-reports" },
    Visual: ReportVisual,
  },
  {
    icon: CalendarClock,
    tone: "violet",
    label: "Social posts",
    title: "Write once. Post on time.",
    body: "Orbit drafts LinkedIn and Instagram posts and schedules them.",
    primary: { label: "Learn more", href: "/social" },
    secondary: { label: "Docs", href: "/docs/scheduled-posts" },
    Visual: SocialVisual,
  },
  {
    icon: FileSearch,
    tone: "blue",
    label: "SEO audits",
    title: "Prove the fix worked.",
    body: "Lighthouse audits, kept over time.",
    primary: { label: "Learn more", href: "/seo-audits" },
    secondary: { label: "Docs", href: "/docs/seo" },
    Visual: ScoreVisual,
  },
  {
    icon: TrendingUp,
    tone: "violet",
    label: "Search visibility",
    title: "Climb the results.",
    body: "Search Console, inside your analytics.",
    primary: { label: "Learn more", href: "/search-visibility" },
    secondary: { label: "Docs", href: "/docs/search-visibility" },
    Visual: RankVisual,
  },
  {
    icon: OrbitIcon,
    tone: "rose",
    label: "Orbit AI",
    title: "Ask. Get the fix.",
    body: "An assistant that knows the product.",
    primary: { label: "Learn more", href: "/docs/orbit-ai" },
    secondary: { label: "Start free", href: `${site.app}/signup` },
    Visual: OrbitVisual,
  },
  {
    icon: Plug,
    tone: "indigo",
    label: "Platform API",
    title: "Analytics inside your own product.",
    body: "One key provisions a project for every customer, and reads their stats back over REST.",
    primary: { label: "Learn more", href: "/platform-api" },
    secondary: { label: "API reference", href: "/docs/api-reference" },
    Visual: ApiVisual,
  },
  {
    icon: PanelRight,
    tone: "teal",
    label: "Orbit AI for Chrome",
    title: "Orbit, on every tab.",
    body: "Ask about the page you're on, from Chrome's side panel.",
    primary: { label: "Add to Chrome", href: site.orbitExtension },
    secondary: { label: "How it works", href: "/docs/orbit-ai" },
    Visual: ExtensionVisual,
  },
];

const pick = (...labels: string[]) => labels.map((label) => items.find((item) => item.label === label)!);

export const measureItems = pick("Analytics", "Forms", "Lead sources", "Reports", "SEO audits", "Search visibility");
export const aiItems = pick("Orbit AI", "Social posts", "Orbit AI for Chrome", "Platform API");
