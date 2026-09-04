"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { SectionHeading } from "../ui";
import { PlanIcon, PLAN_ACCENTS, PLAN_GRADIENTS, PLAN_ON_ACCENT } from "../plan-icons";
import { usePlans } from "../plans-provider";
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

  maxReportRecipients: number;
  sortOrder: number;
  priceMonthly: CurrencyPrices;
  priceYearly: CurrencyPrices;
};

type ResolvedOrbitPlan = {
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

const FEATURED_SLUG = "pro";
const FEATURED_ORBIT_SLUG = "orbit-starter";

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

const MAX_SITES_PER_WORKSPACE = 2;

function planFeatures(plan: ResolvedPlan): string[] {
  return [

    `${MAX_SITES_PER_WORKSPACE} sites per workspace`,
    `${plan.monthlyAuditQuota} SEO audits / month`,
    `${plural(plan.monthlyCrawlQuota, "site crawl")} / month`,

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

export function Pricing() {

  const shared = usePlans();
  const plans = shared.plans as ResolvedPlan[] | null;
  const orbitPlans = shared.orbitPlans as ResolvedOrbitPlan[] | null;
  const error = shared.error;

  const [yearly, setYearly] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    setCurrency(detectCurrency());
  }, []);

  return (
    <section id="pricing" className="border-t border-border bg-bg-subtle">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <SectionHeading
          align="center"
          className="v-rise"
          eyebrow="Pricing"
          title="Plans that scale with your sites."
          body="Every plan includes the full dashboard and SEO audit suite. No feature is held back to sell you an upgrade."
        />

        {plans && (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <div className="glass inline-flex items-center gap-1 rounded-full p-1">
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

            <div className="glass inline-flex items-center gap-1 rounded-full p-1">
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
                  className={`glass relative flex flex-col rounded-2xl p-6 transition-all duration-300 sm:p-7 ${
                    featured
                      ? "border-accent/50 shadow-float lg:scale-[1.03]"
                      : "hover:-translate-y-1 hover:border-border-strong hover:shadow-card"
                  }`}
                >
                  {featured && (
                    <>
                      <span
                        className="pointer-events-none absolute -inset-px -z-10 rounded-xl opacity-40 blur-lg"
                        style={{ background: "var(--glow)" }}
                        aria-hidden="true"
                      />

                      <span
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide shadow-soft"
                        style={{
                          background:
                            PLAN_GRADIENTS[plan.slug] ?? PLAN_ACCENTS[plan.slug] ?? "#8b5cf6",

                          color: PLAN_ON_ACCENT[plan.slug] ?? "#fff",
                        }}
                      >
                        Most popular
                      </span>
                    </>
                  )}

                  <div className="flex items-center gap-2.5">
                    <PlanIcon slug={plan.slug} size={26} uid="pricing" />
                    <h3 className="text-[15px] font-medium tracking-tight">{plan.name}</h3>
                  </div>
                  <p className="mt-2 min-h-10 text-sm leading-relaxed text-fg-muted">
                    {plan.description}
                  </p>

                  <div className="mt-7">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[1.875rem] font-medium leading-none tracking-[-0.04em] tabular-nums sm:text-[2.5rem]">
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
                    className={`mt-6 rounded-lg py-2 text-center text-[13px] font-medium transition-all duration-200 ${
                      featured
                        ? "bg-cta text-cta-fg shadow-soft hover:bg-cta-hover"
                        : "border border-border bg-surface/60 text-fg backdrop-blur hover:border-border-strong hover:bg-surface-raised"
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
          <div className="mt-20 border-t border-border pt-16 sm:mt-24 sm:pt-20">
            <SectionHeading
              align="center"
              className="v-rise"
              eyebrow="Orbit AI"
              title="The assistant is included in every plan."
              body="Orbit answers questions about your setup and walks you through fixing what an audit flagged. Every plan includes a tier of it — no separate subscription."
            />

            <div className="mx-auto mt-10 max-w-3xl overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-fg-faint">
                    <th className="py-3 pr-4 font-semibold">Plan</th>
                    <th className="py-3 pr-4 font-semibold">Questions / month</th>
                    <th className="py-3 font-semibold">Extras</th>
                  </tr>
                </thead>
                <tbody>
                  {orbitPlans.map((plan) => (
                    <tr key={plan.slug} className="border-b border-border/60">
                      <td className="py-3.5 pr-4 font-medium">
                        {plan.name.replace(/^Orbit /, "")}
                      </td>
                      <td className="py-3.5 pr-4 text-fg-muted">
                        {plan.monthlyQuota.toLocaleString()}
                      </td>
                      <td className="py-3.5 text-fg-muted">
                        {plan.dataAccess ? "Answers from your own analytics" : "All models included"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-8 text-center text-xs text-fg-faint">
              A question only counts once Orbit has answered it. Need more than
              your plan includes? Question packs are sold separately and never
              expire.
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
