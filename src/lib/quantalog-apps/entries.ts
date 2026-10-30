import { allApps, type AppEntry } from "@/components/apps-carousel/app-items";
import { APP_PAGES } from "./index";
import type { AppGroup, AppPage } from "./types";

const EXTRA_GROUPS: Record<string, AppGroup> = { invoicing: "Grow" };

function markId(entry: AppEntry): string | null {
  return entry.mark.kind === "quantalog" ? entry.mark.id : null;
}

function logoId(page: AppPage): string {
  return page.logo.replace(/^quantalog-/, "").replace(/\.svg$/, "");
}

export const officialApps: AppEntry[] = allApps.filter((a) => a.category === "quantalog");

export const integrationApps: AppEntry[] = allApps.filter((a) => a.category !== "quantalog");

export function entryForPage(page: AppPage): AppEntry | undefined {
  return officialApps.find((entry) => markId(entry) === logoId(page));
}

export function groupOfEntry(entry: AppEntry): AppGroup | undefined {
  const id = markId(entry);
  if (!id) return undefined;
  return APP_PAGES.find((page) => logoId(page) === id)?.group ?? EXTRA_GROUPS[id];
}

export function relatedEntries(page: AppPage): AppEntry[] {
  return page.related
    .map((slug) => APP_PAGES.find((p) => p.slug === slug))
    .filter((p): p is AppPage => Boolean(p))
    .map(entryForPage)
    .filter((e): e is AppEntry => Boolean(e));
}
