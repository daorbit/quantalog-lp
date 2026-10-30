import type { ComponentType } from "react";
import type { BigStat } from "@/components/big-stats";
import type { PlanRow } from "@/components/product/product-plan-table";
import type { Faq } from "@/lib/faqs";

type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

export type AppGroup = "Analyze" | "Grow" | "Work" | "Share";

export type AppConnection =
  | { kind: "app"; id: string; how: string }
  | { kind: "product"; href: string; how: string };

export type AppPage = {
  slug: string;
  logo: string;
  name: string;
  shortName: string;
  group: AppGroup;
  unlock: "free" | "once";
  docs: string;
  launched: string;
  title: string;
  accent: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  chips: { icon: Icon; label: string }[];
  stats: BigStat[];
  features: { icon: Icon; title: string; body: string }[];
  steps: { title: string; body: string }[];
  story: { eyebrow: string; title: string; paragraphs: string[] };
  connections: AppConnection[];
  included: string[];
  plans?: PlanRow[];
  faqs: Faq[];
  related: string[];
  ctaTitle: string;
};

export const UNLOCK_LABEL: Record<AppPage["unlock"], string> = {
  free: "Free on every plan",
  once: "One-time unlock per workspace",
};

export const UNLOCK_NOTE: Record<AppPage["unlock"], string> = {
  free: "Included with every Quantalog plan, including Free. A workspace admin switches it on in Apps.",
  once: "Unlocked once per workspace in Apps, with no subscription. Turning it off later keeps everything it holds.",
};
