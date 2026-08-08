"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { SectionHeading } from "../ui";
import { PlanIcon, PLAN_ACCENTS, PLAN_GRADIENTS, PLAN_ON_ACCENT } from "../plan-icons";
import { site } from "@/lib/site";
import { track } from "@/lib/track";

const CURRENCIES = ["INR", "USD"] as const;
type Currency = (typeof CURRENCIES)[number];

const CURRENCY_SYMBOLS: Record<Currency, string> = { INR: "₹", USD: "$" };
const CURRENCY_LOCALES: Record<Currency, string> = { INR: "en-IN", USD: "en-US" };

type CurrencyPrices = Record<Currency, number>;

type ResolvedPlan = {
  slug: string;
  name: string;
  description: string;
  monthlyAuditQuota: number;
  monthlyCrawlQuota: number;
  features: string[];
  /** Report recipients per schedule, including the owner. */
  maxReportRecipients: number;
  sortOrder: number;
  priceMonthly: CurrencyPrices;
  priceYearly: CurrencyPrices;
};

/**
 * An Orbit AI tier. Sold separately from the plans above and on its own ladder,
 * so it gets its own shape and its own row rather than extra columns here.
 */
type ResolvedOrbitPlan = {
  slug: string;
  name: string;
  description: string;
  monthlyQuota: number;
  modelTier: "basic" | "standard" | "advanced";
  maxHistoryTurns: number;
  features: string[];
  sortOrder: number;
  priceMonthly: CurrencyPrices;
  priceYearly: CurrencyPrices;
};

const FEATURED_SLUG = "pro";
const FEATURED_ORBIT_SLUG = "orbit-starter";

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

/**
 * Sites one workspace holds, on every tier. Mirrors the API's constant of the
 * same name — a workspace is what is priced, so this is a property of the
 * product rather than a difference between plans.
 */
const MAX_SITES_PER_WORKSPACE = 2;

function planFeatures(plan: ResolvedPlan): string[] {
  return [
    // Priced per workspace, so the tier does not cap how many an account can
    // have — it decides what each one costs and what it can do.
    `${MAX_SITES_PER_WORKSPACE} sites per workspace`,
    `${plan.monthlyAuditQuota} SEO audits / month`,
    `${plural(plan.monthlyCrawlQuota, "site crawl")} / month`,
    // Spelled out rather than left to `plan.features`: the recipient cap is the
    // line a buyer comparing tiers actually reads.
    `${plural(plan.maxReportRecipients, "report recipient")} per report`,
    ...plan.features,
  ];
}

function detectCurrency(): Currency {
  if (typeof navigator === "undefined") return "USD";
  const region = navigator.language.split("-")[1]?.toUpperCase();
  return region === "IN" ? "INR" : "USD";
}

function formatPrice(amountMinor: number, currency: Currency) {
  const symbol = CURRENCY_SYMBOLS[currency];
  if (amountMinor === 0) return `${symbol}0`;
  return `${symbol}${(amountMinor / 100).toLocaleString(CURRENCY_LOCALES[currency], { maximumFractionDigits: 0 })}`;
}

/** What one Orbit tier lists, in the order a buyer compares them. */
function orbitFeatures(plan: ResolvedOrbitPlan): string[] {
  return [
    `${plan.monthlyQuota.toLocaleString()} questions / month`,
    ORBIT_TIER_FEATURE[plan.modelTier],
    `${plan.maxHistoryTurns} turns of conversation memory`,
    ...plan.features.filter((f) => !f.startsWith("Everything in")),
  ];
}

/** What each model tier actually gets you, in a buyer's words rather than ours. */
const ORBIT_TIER_FEATURE: Record<ResolvedOrbitPlan["modelTier"], string> = {
  basic: "Open-weight models",
  standard: "Reasoning models",
  advanced: "Every model, including Gemini Flash",
};

export function Pricing() {
  const [plans, setPlans] = useState<ResolvedPlan[] | null>(null);
  const [orbitPlans, setOrbitPlans] = useState<ResolvedOrbitPlan[] | null>(null);
  const [error, setError] = useState(false);
  const [yearly, setYearly] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    setCurrency(detectCurrency());
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`${site.api}/api/public/plans`)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data: ResolvedPlan[]) => {
        if (!cancelled) setPlans(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetched separately, and its failure is deliberately not `setError`: the
  // Orbit row is an addition to this page, so losing it should hide one section
  // rather than replace the whole price list with an error.
  useEffect(() => {
    let cancelled = false;
    fetch(`${site.api}/api/public/plans/orbit`)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data: ResolvedOrbitPlan[]) => {
        if (!cancelled) setOrbitPlans(data);
      })
      .catch(() => {
        if (!cancelled) setOrbitPlans([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="pricing" className="border-t border-border bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-5 py-28">
        <SectionHeading
          centered
          eyebrow="Pricing"
          title="Plans that scale with your sites."
          body="Every plan includes the full dashboard and SEO audit suite. No feature is held back to sell you an upgrade."
        />

        {plans && (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
              <button
                type="button"
                onClick={() => setYearly(false)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  !yearly ? "bg-accent text-accent-fg shadow-soft" : "text-fg-muted hover:text-fg"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setYearly(true)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  yearly ? "bg-accent text-accent-fg shadow-soft" : "text-fg-muted hover:text-fg"
                }`}
              >
                Yearly
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10.5px] font-semibold ${
                    yearly ? "bg-accent-fg/20 text-accent-fg" : "bg-accent/12 text-accent"
                  }`}
                >
                  Save
                </span>
              </button>
            </div>

            <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
              {CURRENCIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    currency === c ? "bg-accent text-accent-fg shadow-soft" : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {!plans && !error && (
          <div className="mt-16 flex justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-fg-faint" />
          </div>
        )}

        {error && (
          <p className="mt-16 text-center text-sm text-fg-muted">
            Couldn&apos;t load plans right now.{" "}
            <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-2">
              Contact us
            </a>{" "}
            for pricing.
          </p>
        )}

        {plans && (
          <div className="mt-10 grid items-start gap-5 lg:grid-cols-3">
            {plans.map((plan) => {
              const featured = plan.slug === FEATURED_SLUG;
              const price = (yearly ? plan.priceYearly : plan.priceMonthly)[currency];
              const yearlyPrice = plan.priceYearly[currency];
              const monthlyEquivalent = yearly && yearlyPrice > 0 ? Math.round(yearlyPrice / 12) : null;

              return (
                <div
                  key={plan.slug}
                  className={`card relative flex flex-col p-7 ${
                    featured ? "border-accent/60 shadow-float lg:scale-[1.03]" : "card-hover"
                  }`}
                >
                  {featured && (
                    <>
                      <span
                        className="pointer-events-none absolute -inset-px -z-10 rounded-xl opacity-40 blur-lg"
                        style={{ background: "var(--glow)" }}
                        aria-hidden="true"
                      />
                      {/* Carries the plan's own tier gradient rather than the
                          site accent, so the badge matches the diamond above
                          it instead of reading as generic chrome. */}
                      <span
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide shadow-soft"
                        style={{
                          background:
                            PLAN_GRADIENTS[plan.slug] ?? PLAN_ACCENTS[plan.slug] ?? "#8b5cf6",
                          // The gold ramp is too light for white text.
                          color: PLAN_ON_ACCENT[plan.slug] ?? "#fff",
                        }}
                      >
                        Most popular
                      </span>
                    </>
                  )}

                  <div className="flex items-center gap-2.5">
                    <PlanIcon slug={plan.slug} size={26} uid="pricing" />
                    <h3 className="text-[15px] font-semibold tracking-tight">{plan.name}</h3>
                  </div>
                  <p className="mt-1.5 min-h-10 text-sm leading-relaxed text-fg-muted">
                    {plan.description}
                  </p>

                  <div className="mt-7">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[2.75rem] font-bold leading-none tracking-[-0.03em]">
                        {formatPrice(price, currency)}
                      </span>
                      <span className="text-sm text-fg-muted">
                        {price === 0 ? "forever" : yearly ? "per year" : "per month"}
                      </span>
                    </div>
                    <div className="mt-1.5 h-4 text-xs text-fg-faint">
                      {monthlyEquivalent !== null && `≈ ${formatPrice(monthlyEquivalent, currency)} / month billed yearly`}
                    </div>
                  </div>

                  <a
                    href={`${site.app}/signup?plan=${plan.slug}${yearly ? "&cycle=yearly" : ""}&currency=${currency}`}
                    onClick={() =>
                      track("pricing_plan_selected", { plan: plan.slug, cycle: yearly ? "yearly" : "monthly" })
                    }
                    className={`mt-6 rounded-lg py-2.5 text-center text-sm font-medium transition duration-200 ${
                      featured
                        ? "bg-accent text-accent-fg shadow-soft hover:brightness-110"
                        : "border border-border bg-surface text-fg hover:border-border-strong hover:bg-surface-raised"
                    }`}
                  >
                    {price === 0 ? "Start free" : "Get started"}
                  </a>

                  <ul className="mt-8 space-y-3 border-t border-border pt-8">
                    {planFeatures(plan).map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/12"
                          aria-hidden="true"
                        >
                          <Check className="h-2.5 w-2.5 text-accent" strokeWidth={3.5} />
                        </span>
                        <span className="text-fg-muted">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {orbitPlans && orbitPlans.length > 0 && (
          <div className="mt-24 border-t border-border pt-20">
            <SectionHeading
              centered
              eyebrow="Orbit AI"
              title="Add the assistant to any plan."
              body="Orbit answers questions about your setup and walks you through fixing what an audit flagged. Priced on its own, so a small site can still run the best model."
            />

            <div className="mt-10 grid items-start gap-5 lg:grid-cols-3">
              {orbitPlans.map((plan) => {
                const featured = plan.slug === FEATURED_ORBIT_SLUG;
                const price = (yearly ? plan.priceYearly : plan.priceMonthly)[currency];

                return (
                  <div
                    key={plan.slug}
                    className={`card relative flex flex-col p-7 ${
                      featured ? "border-accent/60 shadow-float" : "card-hover"
                    }`}
                  >
                    <h3 className="text-[15px] font-semibold tracking-tight">{plan.name}</h3>
                    <p className="mt-1.5 min-h-10 text-sm leading-relaxed text-fg-muted">
                      {plan.description}
                    </p>

                    <div className="mt-7 flex items-baseline gap-1.5">
                      <span className="text-[2rem] font-bold leading-none tracking-[-0.03em]">
                        {formatPrice(price, currency)}
                      </span>
                      <span className="text-sm text-fg-muted">
                        {price === 0 ? "forever" : yearly ? "per year" : "per month"}
                      </span>
                    </div>

                    <ul className="mt-7 space-y-3 border-t border-border pt-7">
                      {orbitFeatures(plan).map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm">
                          <span
                            className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/12"
                            aria-hidden="true"
                          >
                            <Check className="h-2.5 w-2.5 text-accent" strokeWidth={3.5} />
                          </span>
                          <span className="text-fg-muted">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <p className="mt-8 text-center text-xs text-fg-faint">
              Bought per workspace, separately from the plans above. A question
              only counts once Orbit has answered it.
            </p>
          </div>
        )}

        <p className="mt-10 text-center text-xs text-fg-faint">
          Prices in {currency}. Cancel any time — no exit interview.
        </p>
      </div>
    </section>
  );
}
