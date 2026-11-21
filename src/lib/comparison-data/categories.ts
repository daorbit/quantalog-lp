import { site } from "@/lib/site";
import type { ComparisonCategory } from "./types";

export type ComparisonCategoryInfo = {
  id: ComparisonCategory;
  label: string;
  keywords: string[];
  cta: { title: string; body: (rival: string) => string };
};

export const COMPARISON_CATEGORIES: ComparisonCategoryInfo[] = [
  {
    id: "analytics",
    label: "Analytics",
    keywords: ["analytics tool comparison", "privacy-friendly analytics alternatives"],
    cta: {
      title: "Try it against your own traffic.",
      body: (rival) =>
        `Run ${site.name} alongside ${rival} for a couple of weeks and compare the numbers yourself. The Free plan needs no card.`,
    },
  },
  {
    id: "forms",
    label: "Forms and bookings",
    keywords: ["form builder comparison", "form builder alternatives"],
    cta: {
      title: "Rebuild one form and compare.",
      body: (rival) =>
        `Rebuild your busiest ${rival} form in ${site.name}, or ask Orbit to draft it from a sentence, and see which one your customers finish. The Free plan needs no card.`,
    },
  },
  {
    id: "invoicing",
    label: "Invoicing",
    keywords: ["invoicing software comparison", "GST billing software alternatives"],
    cta: {
      title: "Send your next invoice from here.",
      body: () =>
        `Add your business details once and send a GST invoice with a UPI QR in a few minutes. Invoicing is a free ${site.name} app, and the Free plan needs no card.`,
    },
  },
];

export function comparisonCategory(id: ComparisonCategory): ComparisonCategoryInfo {
  return COMPARISON_CATEGORIES.find((c) => c.id === id) ?? COMPARISON_CATEGORIES[0];
}
