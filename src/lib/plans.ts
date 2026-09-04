 

export const CURRENCIES = ["INR", "USD"] as const;
export type Currency = (typeof CURRENCIES)[number];

const CURRENCY_SYMBOLS: Record<Currency, string> = { INR: "₹", USD: "$" };
const CURRENCY_LOCALES: Record<Currency, string> = { INR: "en-IN", USD: "en-US" };

export type CurrencyPrices = Record<Currency, number>;

export type ResolvedPlan = {
  slug: string;
  name: string;
  description: string;
  monthlyAuditQuota: number;
  monthlyCrawlQuota: number;
  features: string[];
  maxReportRecipients: number;
  sortOrder: number;
  priceMonthly: CurrencyPrices;
  priceYearly: CurrencyPrices;
};

/** Orbit is sold as credits alongside a plan, not as a plan tier of its own. */
export type ResolvedOrbitPlan = {
  slug: string;
  name: string;
  description: string;
  monthlyQuota: number;
  modelTier: "basic" | "standard" | "advanced";
  dataAccess: boolean;
  maxHistoryTurns: number;
  features: string[];
  sortOrder: number;
  priceMonthly: CurrencyPrices;
  priceYearly: CurrencyPrices;
};

export const FEATURED_SLUG = "pro";
export const MAX_SITES_PER_WORKSPACE = 2;

export function detectCurrency(): Currency {
  if (typeof navigator === "undefined") return "USD";
  const region = navigator.language.split("-")[1]?.toUpperCase();
  return region === "IN" ? "INR" : "USD";
}

export function formatPrice(amountMinor: number, currency: Currency) {
  const symbol = CURRENCY_SYMBOLS[currency];
  if (amountMinor === 0) return `${symbol}0`;
  return `${symbol}${(amountMinor / 100).toLocaleString(CURRENCY_LOCALES[currency], {
    maximumFractionDigits: 0,
  })}`;
}

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

/** Quota lines are per-plan facts, so they always read as included. */
export function planQuotas(plan: ResolvedPlan): string[] {
  return [
    `${MAX_SITES_PER_WORKSPACE} sites per workspace`,
    `${plan.monthlyAuditQuota} SEO audits / month`,
    `${plural(plan.monthlyCrawlQuota, "site crawl")} / month`,
    `${plural(plan.maxReportRecipients, "report recipient")} per report`,
  ];
}

/**
 * Every named feature across all plans, in the order the plans introduce them,
 * so a card or a table row can show what a tier does *not* include rather than
 * only what it does.
 */
export function allFeatures(plans: ResolvedPlan[]): string[] {
  const seen: string[] = [];
  for (const plan of [...plans].sort((a, b) => a.sortOrder - b.sortOrder)) {
    for (const f of plan.features) if (!seen.includes(f)) seen.push(f);
  }
  return seen;
}
