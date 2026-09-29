import { BarChart3, FileSearch, LayoutGrid, Plug, Swords, TrendingUp } from "lucide-react";
import { OrbitIcon } from "../orbit/orbit-icon";
import { site } from "@/lib/site";
import { LiveVisual } from "./visuals/live-visual";
import { ScoreVisual } from "./visuals/score-visual";
import { RankVisual } from "./visuals/rank-visual";
import { FieldVisual } from "./visuals/field-visual";
import { OrbitVisual } from "./visuals/orbit-visual";
import { CompareVisual } from "./visuals/compare-visual";
import { ApiVisual } from "./visuals/api-visual";

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
  wide?: boolean;
};

export const exploreItems: ExploreItem[] = [
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
    icon: OrbitIcon,
    tone: "rose",
    label: "Orbit AI",
    title: "Ask. Get the fix.",
    body: "An assistant that knows the product.",
    primary: { label: "Learn more", href: "/social" },
    secondary: { label: "Docs", href: "/docs/orbit-ai" },
    Visual: OrbitVisual,
  },
  {
    icon: Swords,
    tone: "slate",
    label: "Compare",
    title: "See it side by side.",
    body: "Honest head-to-heads with the big names.",
    primary: { label: "Compare", href: "/compare" },
    secondary: { label: "Start free", href: `${site.app}/signup` },
    Visual: CompareVisual,
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
    wide: true,
  },
];
