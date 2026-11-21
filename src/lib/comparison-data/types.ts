import type { SimpleIcon } from "simple-icons";

export type Verdict = "quantalog" | "rival" | "both" | "neither";

export type ComparisonCategory = "analytics" | "forms" | "invoicing";

export type ComparisonRow = {
  point: string;
  ours: string;
  theirs: string;
  verdict: Verdict;
};

export type ComparisonMetric = {
  label: string;
  ours: number;
  theirs: number;
  unit: string;
  format: (n: number) => string;
  lowerIsBetter: boolean;
  source: string;
};

export type Comparison = {
  slug: string;
  category: ComparisonCategory;
  rival: string;
  logo?: SimpleIcon;
  title: string;
  description: string;
  intro: string;
  whenTheirs: string;
  rows: ComparisonRow[];
  metrics?: ComparisonMetric[];
  faqs: { q: string; a: string }[];
  checkedOn?: string;
};

export type ComparisonEntry = Omit<Comparison, "category">;
