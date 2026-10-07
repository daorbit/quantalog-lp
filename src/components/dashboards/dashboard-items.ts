import { LayoutDashboard, Target } from "lucide-react";
import type { ExploreItem } from "../explore/explore-items";
import { DashboardVisual } from "./dashboard-visual";
import { GoalsVisual } from "./goals-visual";

export const dashboardItems: ExploreItem[] = [
  {
    icon: LayoutDashboard,
    tone: "indigo",
    label: "Dashboards",
    title: "A dashboard for every job.",
    body: "Start from a template, then make it yours.",
    primary: { label: "Learn more", href: "/analytics" },
    secondary: { label: "Docs", href: "/docs/dashboards" },
    Visual: DashboardVisual,
  },
  {
    icon: Target,
    tone: "teal",
    label: "Goals",
    title: "Set a target. Watch it fill.",
    body: "Pace tracking that flags a miss early.",
    primary: { label: "Learn more", href: "/analytics" },
    secondary: { label: "Docs", href: "/docs/goals" },
    Visual: GoalsVisual,
  },
];
