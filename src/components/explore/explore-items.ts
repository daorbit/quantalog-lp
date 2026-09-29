import {
  BarChart3,
  FileSearch,
  LayoutGrid,
  Mails,
  Plug,
  Swords,
  TrendingUp,
} from "lucide-react";
import { OrbitIcon } from "../orbit/orbit-icon";

export type ExploreItem = {
  href: string;
  icon: (props: { className?: string }) => React.ReactNode;
  label: string;
  title: string;
  stat: string;
  statLabel: string;
};

export const exploreItems: ExploreItem[] = [
  {
    href: "/analytics",
    icon: BarChart3,
    label: "Analytics",
    title: "Every visitor, the second they arrive.",
    stat: "~3s",
    statLabel: "from visit to dashboard",
  },
  {
    href: "/seo-audits",
    icon: FileSearch,
    label: "SEO audits",
    title: "Proof that a fix moved the number.",
    stat: "4",
    statLabel: "Lighthouse scores on every audit",
  },
  {
    href: "/search-visibility",
    icon: TrendingUp,
    label: "Search visibility",
    title: "What Google sends you, and what it becomes.",
    stat: "Every page",
    statLabel: "checked for index status",
  },
  {
    href: "/reports",
    icon: Mails,
    label: "Reports",
    title: "A weekly read your clients will open.",
    stat: "2",
    statLabel: "channels — email and WhatsApp",
  },
  {
    href: "/social",
    icon: OrbitIcon,
    label: "Orbit AI & social",
    title: "Answers now. Posts on schedule.",
    stat: "2am",
    statLabel: "and Orbit still answers",
  },
  {
    href: "/forms",
    icon: LayoutGrid,
    label: "Forms",
    title: "See the exact field people give up on.",
    stat: "Per field",
    statLabel: "drop-off, not just per form",
  },
  {
    href: "/platform-api",
    icon: Plug,
    label: "Platform API",
    title: "Analytics inside your own product.",
    stat: "1 key",
    statLabel: "a project for every customer",
  },
  {
    href: "/compare",
    icon: Swords,
    label: "Compare",
    title: "Side by side, including where they win.",
    stat: "3",
    statLabel: "head-to-heads: GA, Plausible, Matomo",
  },
];
