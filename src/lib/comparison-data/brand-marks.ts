import type { BrandIcon, BrandMark } from "./types";

export const TYPEFORM_ICON: BrandIcon = {
  hex: "262627",
  path: "M4.3 8.35a1.6 1.6 0 0 1 3.2 0v7.5a1.6 1.6 0 0 1-3.2 0zM11.6 6.75h5.68a2.6 2.6 0 0 1 2.6 2.6v5.49a2.6 2.6 0 0 1-2.6 2.6H11.6a2.6 2.6 0 0 1-2.6-2.6V9.35a2.6 2.6 0 0 1 2.6-2.6z",
};

export const BRAND_MARKS = {
  tally: { src: "/brands/tally.svg", invertInDark: true },
  jotform: { src: "/brands/jotform.png" },
  zohoInvoice: { src: "/brands/zoho-invoice.svg" },
  vyapar: { src: "/brands/vyapar.svg" },
  agencyAnalytics: { src: "/brands/agencyanalytics.svg" },
  lookerStudio: { src: "/brands/looker-studio.png" },
} satisfies Record<string, BrandMark>;
