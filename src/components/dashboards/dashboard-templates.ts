import type { Metric } from "./format-metric";

export type Kpi = Metric & { label: string; delta: string };

export type DashboardTemplate = {
  name: string;
  kpis: Kpi[];
  series: [string, string];
  primary: string;
  secondary: string;
};

export const DASHBOARD_TEMPLATES: DashboardTemplate[] = [
  {
    name: "Executive summary",
    kpis: [
      { label: "Visitors", value: 124, decimals: 1, suffix: "k", delta: "+8.2%" },
      { label: "Google clicks", value: 2310, delta: "+14%" },
      { label: "Conversions", value: 386, delta: "+5.1%" },
      { label: "Bounce rate", value: 38, suffix: "%", delta: "−2.4%" },
    ],
    series: ["Visitors", "Google clicks"],
    primary:
      "M0,62 C20,58 34,48 52,50 C72,52 84,38 104,36 C124,34 138,44 158,40 C180,36 194,22 216,24 C238,26 252,16 272,12 C284,10 292,8 300,6",
    secondary:
      "M0,72 C24,70 40,66 60,67 C82,68 96,60 118,58 C140,56 156,62 178,56 C200,50 218,48 240,42 C260,37 280,36 300,30",
  },
  {
    name: "SEO client report",
    kpis: [
      { label: "Clicks", value: 2310, delta: "+14%" },
      { label: "Impressions", value: 846, decimals: 1, suffix: "k", delta: "+21%" },
      { label: "Avg position", value: 62, decimals: 1, delta: "−1.8" },
      { label: "Audit score", value: 96, delta: "+4" },
    ],
    series: ["Clicks", "Impressions"],
    primary:
      "M0,70 C22,66 38,60 58,58 C80,56 96,50 118,46 C140,42 158,44 180,36 C202,28 220,30 242,22 C262,16 282,14 300,10",
    secondary:
      "M0,66 C24,62 42,64 62,58 C84,52 100,56 122,50 C144,44 160,48 182,42 C204,36 224,38 246,32 C266,28 284,26 300,24",
  },
  {
    name: "E-commerce",
    kpis: [
      { label: "Revenue", value: 182, decimals: 1, prefix: "$", suffix: "k", delta: "+11%" },
      { label: "Orders", value: 412, delta: "+6.4%" },
      { label: "Conversion rate", value: 34, decimals: 1, suffix: "%", delta: "+0.6pt" },
      { label: "Avg order", value: 44, prefix: "$", delta: "+3.9%" },
    ],
    series: ["Revenue", "Orders"],
    primary:
      "M0,54 C20,50 32,58 52,52 C74,46 86,30 108,34 C130,38 142,50 164,42 C186,34 198,20 220,24 C242,28 256,18 276,14 C288,12 294,10 300,9",
    secondary:
      "M0,70 C22,68 36,62 58,64 C80,66 94,54 116,56 C138,58 152,50 174,48 C196,46 212,40 234,40 C256,40 278,34 300,32",
  },
  {
    name: "Product launch",
    kpis: [
      { label: "Signups", value: 1284, delta: "+32%" },
      { label: "Visitors", value: 9840, delta: "+27%" },
      { label: "Activation", value: 61, suffix: "%", delta: "+4%" },
      { label: "Referrals", value: 214, delta: "+18%" },
    ],
    series: ["Signups", "Visitors"],
    primary:
      "M0,74 C30,73 60,72 90,70 C110,69 124,66 138,58 C150,50 158,20 172,14 C186,8 198,26 214,30 C234,34 252,28 272,26 C284,25 292,24 300,23",
    secondary:
      "M0,72 C30,71 60,70 90,68 C112,66 126,60 140,52 C154,44 162,34 176,32 C190,30 204,40 222,42 C242,44 262,40 280,38 C290,37 296,36 300,36",
  },
];
