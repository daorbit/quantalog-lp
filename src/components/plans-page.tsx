"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Minus } from "lucide-react";
import { PlanIcon, PLAN_ACCENTS, PLAN_GRADIENTS, PLAN_ON_ACCENT } from "./plan-icons";
import { PlanCard } from "./plan-card";
import { usePlans } from "./plans-provider";
import { site } from "@/lib/site";
import {
  CURRENCIES, FEATURED_SLUG, MAX_SITES_PER_WORKSPACE,
  allFeatures, detectCurrency, formatPrice,
} from "@/lib/plans";
import type { Currency, ResolvedPlan, ResolvedOrbitPlan } from "@/lib/plans";

/** A row in the comparison matrix. `value` returns what a plan gets. */
type Row = {
  label: string;
  value: (plan: ResolvedPlan) => string | boolean;
};

const QUOTA_ROWS: Row[] = [
  { label: "Sites per workspace", value: () => String(MAX_SITES_PER_WORKSPACE) },
  { label: "SEO audits / month", value: (p) => p.monthlyAuditQuota.toLocaleString() },
  { label: "Site crawls / month", value: (p) => p.monthlyCrawlQuota.toLocaleString() },
  { label: "Report recipients", value: (p) => String(p.maxReportRecipients) },
];

/** Questions specific to choosing a plan, rather than the site-wide FAQ. */
const PLAN_FAQS = [
  {
    q: "What happens when I hit a quota?",
    a: "Tracking never stops — pageviews and events keep being recorded on every plan. Only audits and crawls are metered, and those simply queue until the next reset or until you upgrade.",
  },
  {
    q: "Can I change plans later?",
    a: "Any time, in both directions. Upgrades apply immediately and are prorated against what you have already paid; downgrades take effect at the end of the current billing period.",
  },
  {
    q: "Do unused quotas roll over?",
    a: "No. Audit and crawl allowances reset at the start of each billing period. Orbit credit packs are the exception — those are bought separately and never expire.",
  },
  {
    q: "Is there a contract or setup fee?",
    a: "Neither. Every plan is month-to-month unless you choose annual billing, and cancelling takes one click in the billing settings.",
  },
];

/** Renders a matrix cell: a count, a tick, or a dash for "not included". */
function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "string") {
    return <span className="text-[13px] tabular-nums text-fg">{value}</span>;
  }
  return value ? (
    <>
      <Check className="mx-auto h-4 w-4 text-accent" strokeWidth={3} aria-hidden="true" />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <Minus className="mx-auto h-4 w-4 text-fg-faint/50" strokeWidth={2.5} aria-hidden="true" />
      <span className="sr-only">Not included</span>
    </>
  );
}

export function PlansPage() {
  const shared = usePlans();
  const plans = shared.plans as ResolvedPlan[] | null;
  const orbitPlans = shared.orbitPlans as ResolvedOrbitPlan[] | null;
  const error = shared.error;

  const [yearly, setYearly] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    setCurrency(detectCurrency());
  }, []);

  const sorted = plans ? [...plans].sort((a, b) => a.sortOrder - b.sortOrder) : [];
  const features = plans ? allFeatures(plans) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <div className="v-rise">
        <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-medium text-fg-muted">
          <PlanIcon slug="pro" size={13} uid="plans-eyebrow" />
          Plans
        </span>
        <h1 className="mt-5 max-w-3xl text-h2 font-medium leading-[1.08] tracking-[-0.03em]">
          Pick the plan
          <br />
          <span className="pricing-display-accent">that fits your sites.</span>
        </h1>
        <p className="mt-4 max-w-xl text-lead leading-relaxed text-fg-muted">
          Every plan includes the full dashboard and SEO audit suite. What
          changes between them is how much you can run, not what you can reach.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="glass inline-flex items-center gap-1 rounded-full p-1">
          {CURRENCIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${
                currency === c
                  ? "bg-surface-raised text-fg shadow-soft"
                  : "text-fg-muted hover:text-fg"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 text-[13px]">
          <span className={yearly ? "text-fg-muted" : "text-fg"}>Monthly</span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label="Bill yearly"
            onClick={() => setYearly((v) => !v)}
            className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors duration-200 ${
              yearly ? "border-accent/50 bg-accent/25" : "border-border bg-surface"
            }`}
          >
            <span
              className={`absolute top-0.5 h-3.5 w-3.5 rounded-full transition-all duration-200 ${
                yearly ? "left-4.5 bg-accent" : "left-0.5 bg-fg-faint"
              }`}
            />
          </button>
          <span className={yearly ? "text-fg" : "text-fg-muted"}>Yearly</span>
          <span className="text-fg-faint">Save 20% with annual</span>
        </div>
      </div>

      {!plans && !error && (
        <div className="mt-16 flex justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-fg-faint" />
        </div>
      )}

      {error && (
        <p className="mt-16 text-sm text-fg-muted">
          Couldn&apos;t load plans right now.{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-2">
            Contact us
          </a>{" "}
          for pricing.
        </p>
      )}

      {/* The same cards as the home page, but with no row cap — this is the
          page someone lands on to actually decide. */}
      {plans && (
        <div className="mt-10 grid items-start gap-5 lg:grid-cols-3">
          {sorted.map((plan) => (
            <PlanCard
              key={plan.slug}
              plan={plan}
              features={features}
              currency={currency}
              yearly={yearly}
              location="plans"
            />
          ))}
        </div>
      )}

      {plans && (
        <div className="mt-20 border-t border-border pt-14">
          <h2 className="text-h3 font-medium tracking-tight">Compare every feature</h2>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-fg-muted">
            The full matrix, with nothing hidden behind a tooltip.
          </p>

          {/* Scrolls inside its own container rather than the page, so three
              plan columns never push the body sideways on a phone. */}
          <div className="mt-6 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-176 border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-[34%] py-4 pr-4 align-bottom">
                    <span className="text-xs font-semibold uppercase tracking-wide text-fg-faint">
                      Features
                    </span>
                  </th>
                  {sorted.map((plan) => {
                    const featured = plan.slug === FEATURED_SLUG;
                    const price = (yearly ? plan.priceYearly : plan.priceMonthly)[currency];
                    return (
                      <th
                        key={plan.slug}
                        className={`px-3 py-4 text-center align-bottom ${
                          featured ? "pricing-col--featured" : ""
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1.5">
                          <PlanIcon slug={plan.slug} size={22} uid="matrix" />
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold">{plan.name}</span>
                            {featured && (
                              <span
                                className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide"
                                style={{
                                  background:
                                    PLAN_GRADIENTS[plan.slug] ??
                                    PLAN_ACCENTS[plan.slug] ??
                                    "#8b5cf6",
                                  color: PLAN_ON_ACCENT[plan.slug] ?? "#fff",
                                }}
                              >
                                Popular
                              </span>
                            )}
                          </div>
                          <span className="text-[13px] tabular-nums text-fg-muted">
                            {price === 0
                              ? "Free"
                              : `${formatPrice(price, currency)} / ${yearly ? "yr" : "mo"}`}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan={sorted.length + 1} className="pt-7 pb-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-fg-faint">
                      Limits
                    </span>
                  </td>
                </tr>
                {QUOTA_ROWS.map((row) => (
                  <tr key={row.label} className="border-t border-border/60">
                    <td className="py-3 pr-4 text-[13px] text-fg-muted">{row.label}</td>
                    {sorted.map((plan) => (
                      <td
                        key={plan.slug}
                        className={`px-3 py-3 text-center ${
                          plan.slug === FEATURED_SLUG ? "pricing-col--featured" : ""
                        }`}
                      >
                        <Cell value={row.value(plan)} />
                      </td>
                    ))}
                  </tr>
                ))}

                <tr>
                  <td colSpan={sorted.length + 1} className="pt-7 pb-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-fg-faint">
                      Features
                    </span>
                  </td>
                </tr>
                {features.map((f) => (
                  <tr key={f} className="border-t border-border/60">
                    <td className="py-3 pr-4 text-[13px] text-fg-muted">{f}</td>
                    {sorted.map((plan) => (
                      <td
                        key={plan.slug}
                        className={`px-3 py-3 text-center ${
                          plan.slug === FEATURED_SLUG ? "pricing-col--featured" : ""
                        }`}
                      >
                        <Cell value={plan.features.includes(f)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orbit is credits bought alongside a plan, not a tier of its own — so
          it sits in its own block rather than as columns in the matrix. */}
      {orbitPlans && orbitPlans.length > 0 && (
        <div className="mt-20 border-t border-border pt-14">
          <h2 className="text-h3 font-medium tracking-tight">Orbit AI credits</h2>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-fg-muted">
            Orbit answers questions about your setup and walks you through
            fixing what an audit flagged. Every plan includes a monthly
            allowance; packs are bought on top and never expire.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...orbitPlans]
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((plan) => (
                <div
                  key={plan.slug}
                  className="rounded-xl border border-border bg-surface/60 p-4 backdrop-blur"
                >
                  <div className="text-sm font-semibold">
                    {plan.name.replace(/^Orbit /, "")}
                  </div>
                  <div className="mt-1 text-[13px] text-fg-muted">
                    {plan.monthlyQuota.toLocaleString()} questions / month
                  </div>
                  <div className="mt-2 text-xs text-fg-faint">
                    {plan.dataAccess
                      ? "Answers from your own analytics"
                      : "All models included"}
                  </div>
                </div>
              ))}
          </div>

          <p className="mt-6 text-xs text-fg-faint">
            A question only counts once Orbit has answered it.
          </p>
        </div>
      )}

      <div className="mt-20 border-t border-border pt-14">
        <h2 className="text-h3 font-medium tracking-tight">Before you pick</h2>
        <dl className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {PLAN_FAQS.map((item) => (
            <div key={item.q}>
              <dt className="text-sm font-semibold">{item.q}</dt>
              <dd className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-12 text-xs text-fg-faint">
        Prices in {currency}. Cancel any time — no exit interview.
      </p>
    </div>
  );
}
