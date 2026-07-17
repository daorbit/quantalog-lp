import type { ComponentType } from "react";
import { overview } from "@/content/docs/overview";
import { tracking } from "@/content/docs/tracking";
import { customEvents } from "@/content/docs/custom-events";
import { filters } from "@/content/docs/filters";
import { funnels } from "@/content/docs/funnels";
import { channels } from "@/content/docs/channels";
import { conversions } from "@/content/docs/conversions";
import { outbound } from "@/content/docs/outbound";
import { errorTracking } from "@/content/docs/error-tracking";
import { retention } from "@/content/docs/retention";
import { platformApi } from "@/content/docs/platform-api";
import { apiReference } from "@/content/docs/api-reference";
import { privacy } from "@/content/docs/privacy";

export type DocCategory = "Getting started" | "Tracking" | "Platform API";

export type DocMeta = {
  slug: string;
  title: string;
  description: string;
  category: DocCategory;
  /** Sort order within a category (lower first). */
  order: number;
};

export type Doc = DocMeta & {
  Body: ComponentType;
};

// The single registry of documentation pages. Add a page = write a file under
// src/content/docs and list it here. Order in this array is irrelevant; the
// nav sorts by category then `order`.
const DOCS: Doc[] = [
  overview,
  tracking,
  customEvents,
  filters,
  funnels,
  retention,
  channels,
  conversions,
  outbound,
  errorTracking,
  platformApi,
  apiReference,
  privacy,
];

// The order categories appear in the sidebar.
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

/** Docs grouped by category, both categories and pages in display order. */
export function getDocNav(): { category: DocCategory; docs: DocMeta[] }[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    docs: getAllDocs()
      .filter((d) => d.category === category)
      .sort((a, b) => a.order - b.order),
  })).filter((group) => group.docs.length > 0);
}

/** Previous / next page in a flat walk of the nav, for footer pager links. */
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
