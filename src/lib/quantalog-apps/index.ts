import { alertsApp } from "./alerts";
import { compareApp } from "./compare";
import { funnelsApp } from "./funnels";
import { goalsApp } from "./goals";
import { insightsApp } from "./insights";
import { linkInBioApp } from "./link-in-bio";
import { linksApp } from "./links";
import { mediaApp } from "./media";
import { notesApp } from "./notes";
import { popupsApp } from "./popups";
import { publicDashboardApp } from "./public-dashboard";
import { reviewsApp } from "./reviews";
import { seoReportsApp } from "./seo-reports";
import { tasksApp } from "./tasks";
import type { AppGroup, AppPage } from "./types";

export const APP_PAGES: AppPage[] = [
  compareApp,
  goalsApp,
  insightsApp,
  funnelsApp,
  alertsApp,
  popupsApp,
  linkInBioApp,
  reviewsApp,
  tasksApp,
  notesApp,
  linksApp,
  mediaApp,
  publicDashboardApp,
  seoReportsApp,
];

export const APP_GROUPS: { group: AppGroup; title: string; body: string }[] = [
  { group: "Analyze", title: "Analyze", body: "Read your numbers against targets, competitors and last week." },
  { group: "Grow", title: "Grow", body: "Turn visitors and followers into leads, and keep your reputation in view." },
  { group: "Work", title: "Work", body: "Plan the team's work and keep your notes, tools and files close." },
  { group: "Share", title: "Share", body: "Give clients and stakeholders the numbers without an account." },
];

export function getAppPage(slug: string): AppPage | undefined {
  return APP_PAGES.find((app) => app.slug === slug);
}

export function appPath(slug: string): string {
  return `/apps/${slug}`;
}

export type { AppPage } from "./types";
