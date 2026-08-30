import type { ComponentType } from "react";
import { overview } from "@/content/docs/overview";
import { tracking } from "@/content/docs/tracking";
import { mobileTracking } from "@/content/docs/mobile-tracking";
import { scriptOptions } from "@/content/docs/script-options";
import { customEvents } from "@/content/docs/custom-events";
import { filters } from "@/content/docs/filters";
import { comparisons } from "@/content/docs/comparisons";
import { funnels } from "@/content/docs/funnels";
import { channels } from "@/content/docs/channels";
import { conversions } from "@/content/docs/conversions";
import { outbound } from "@/content/docs/outbound";
import { errorTracking } from "@/content/docs/error-tracking";
import { exporting } from "@/content/docs/exporting";
import { publicDashboards } from "@/content/docs/public-dashboards";
import { emailReports } from "@/content/docs/email-reports";
import { scheduledPosts } from "@/content/docs/scheduled-posts";
import { leadCapture } from "@/content/docs/lead-capture";
import { seo } from "@/content/docs/seo";
import { retention } from "@/content/docs/retention";
import { platformApi } from "@/content/docs/platform-api";
import { apiReference } from "@/content/docs/api-reference";
import { privacy } from "@/content/docs/privacy";
import { demo } from "@/content/docs/demo";
import { billing } from "@/content/docs/billing";
import { orbitAi } from "@/content/docs/orbit-ai";
import { segmentsMarkers } from "@/content/docs/segments-markers";

export type DocCategory = "Getting started" | "Tracking" | "Platform API";

export type DocMeta = {
  slug: string;
  title: string;
  description: string;
  category: DocCategory;

  order: number;
};

export type Doc = DocMeta & {
  Body: ComponentType;
};

const DOCS: Doc[] = [
  overview,
  demo,
  billing,
  tracking,
  mobileTracking,
  scriptOptions,
  customEvents,
  filters,
  comparisons,
  funnels,
  retention,
  channels,
  conversions,
  outbound,
  errorTracking,
  exporting,
  publicDashboards,
  seo,
  emailReports,
  scheduledPosts,
  leadCapture,
  segmentsMarkers,
  orbitAi,
  platformApi,
  apiReference,
  privacy,
];

const CATEGORY_ORDER: DocCategory[] = [
  "Getting started",
  "Tracking",
  "Platform API",
];

export function getDocSlugs(): string[] {
  return DOCS.map((d) => d.slug);
}

export function getDoc(slug: string): Doc | undefined {
  return DOCS.find((d) => d.slug === slug);
}

export function getAllDocs(): DocMeta[] {
  return DOCS.map(({ Body: _Body, ...meta }) => meta);
}

export type DocNavGroup = { category: DocCategory; docs: DocMeta[] };

export function getDocNav(): DocNavGroup[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    docs: getAllDocs()
      .filter((d) => d.category === category)
      .sort((a, b) => a.order - b.order),
  })).filter((group) => group.docs.length > 0);
}

export function getDocSiblings(slug: string): {
  prev: DocMeta | null;
  next: DocMeta | null;
} {
  const flat = getDocNav().flatMap((g) => g.docs);
  const i = flat.findIndex((d) => d.slug === slug);
  return {
    prev: i > 0 ? flat[i - 1] : null,
    next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : null,
  };
}
