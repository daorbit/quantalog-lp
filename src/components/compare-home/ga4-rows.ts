export type Ga4Cell = { text: string; good: boolean };

export type Ga4Row = { point: string; ours: Ga4Cell; theirs: Ga4Cell };

export const GA4_ROWS: Ga4Row[] = [
  {
    point: "Consent banner",
    ours: { text: "Not needed", good: true },
    theirs: { text: "Required in EU & UK", good: false },
  },
  {
    point: "Visitors counted",
    ours: { text: "Every visitor", good: true },
    theirs: { text: "Only those who accept", good: false },
  },
  {
    point: "Reports",
    ours: { text: "Live", good: true },
    theirs: { text: "24–48 h delay", good: false },
  },
  {
    point: "Data sampling",
    ours: { text: "None", good: true },
    theirs: { text: "On large explorations", good: false },
  },
  {
    point: "Tracker size",
    ours: { text: "Under 5 KB", good: true },
    theirs: { text: "Roughly 100× larger", good: false },
  },
  {
    point: "Google Ads attribution",
    ours: { text: "Not included", good: false },
    theirs: { text: "Built in", good: true },
  },
];
