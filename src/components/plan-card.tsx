"use client";

import { ArrowRight, Check } from "lucide-react";
import { PlanIcon, PLAN_ACCENTS, PLAN_GRADIENTS, PLAN_ON_ACCENT } from "./plan-icons";
import { site } from "@/lib/site";
import { track } from "@/lib/track";
import { FEATURED_SLUG, formatPrice, planQuotas } from "@/lib/plans";
import type { Currency, ResolvedPlan } from "@/lib/plans";

/**
 * One plan card. Shared by the pricing section on the home page and the /plans
 * page above the comparison matrix, so the two can never drift apart.
 */
export function PlanCard({
  plan,
  currency,
  yearly,
  maxRows,
  location,
}: {
  plan: ResolvedPlan;
  currency: Currency;
  yearly: boolean;
  /** Feature rows to show, quotas included. Omit for the full list. */
  maxRows?: number;
  /** Distinguishes the home section from /plans in analytics. */
  location: string;
}) {
  const featured = plan.slug === FEATURED_SLUG;
  const quotas = planQuotas(plan);
  // Only what this plan includes. Crossing out what it lacks belonged here
  // when the card was the only comparison available; the matrix on /plans does
  // that job now, and a card full of struck-through rows sells nothing.
  const shown =
    maxRows === undefined
      ? plan.features
      : plan.features.slice(0, Math.max(0, maxRows - quotas.length));

  const price = (yearly ? plan.priceYearly : plan.priceMonthly)[currency];
  const yearlyPrice = plan.priceYearly[currency];
  const monthlyEquivalent = yearly && yearlyPrice > 0 ? Math.round(yearlyPrice / 12) : null;

  return (
    <div
      className={`pricing-card relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
        featured
          ? "pricing-card--featured border-border-strong bg-surface"
          : "border-border bg-surface/60 backdrop-blur"
      }`}
    >
      {/* The featured card is lit from above rather than scaled up: scaling it
          broke the shared baseline across the row. */}
      {featured && <span className="pricing-card__beam" aria-hidden="true" />}

      <div className="relative flex items-center gap-2">
        <h3 className="text-lg font-medium tracking-tight">{plan.name}</h3>
        {featured && (
          <span
            className="rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wide"
            style={{
              background: PLAN_GRADIENTS[plan.slug] ?? PLAN_ACCENTS[plan.slug] ?? "#8b5cf6",
              color: PLAN_ON_ACCENT[plan.slug] ?? "#fff",
            }}
          >
            Most popular
          </span>
        )}
      </div>
      <p className="relative mt-1.5 min-h-10 text-[13px] leading-relaxed text-fg-muted">
        {plan.description}
      </p>

      <div className="relative mt-6 flex items-baseline gap-1.5">
        <span className="text-[2.75rem] font-medium leading-none tracking-[-0.045em] tabular-nums">
          {price === 0 ? "Free" : formatPrice(price, currency)}
        </span>
        {price > 0 && (
          <span className="text-[13px] text-fg-muted">/ {yearly ? "year" : "month"}</span>
        )}
      </div>
      <div className="relative mt-1.5 h-4 text-xs text-fg-faint">
        {monthlyEquivalent !== null &&
          `≈ ${formatPrice(monthlyEquivalent, currency)} / month billed yearly`}
      </div>

      {/* Full-width, with the arrow in its own disc at the trailing edge. */}
      <a
        href={`${site.app}/signup?plan=${plan.slug}${yearly ? "&cycle=yearly" : ""}&currency=${currency}`}
        onClick={() =>
          track("pricing_plan_selected", {
            plan: plan.slug,
            cycle: yearly ? "yearly" : "monthly",
            location,
          })
        }
        className={`group relative mt-6 flex items-center justify-center rounded-full py-2.5 pl-5 pr-2.5 text-[13px] font-medium transition-all duration-200 ${
          featured
            ? "bg-cta text-cta-fg shadow-soft hover:bg-cta-hover"
            : "border border-border bg-surface-raised/60 text-fg hover:border-border-strong hover:bg-surface-raised"
        }`}
      >
        <span className="flex-1 text-center">
          {price === 0 ? "Get started now" : "Upgrade plan"}
        </span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5 ${
            featured ? "bg-cta-fg/12" : "bg-fg/8"
          }`}
          aria-hidden="true"
        >
          <ArrowRight className="h-3 w-3" />
        </span>
      </a>

      {/* The tier mark and its headline quota lead the list. */}
      <div className="relative mt-6 flex items-center gap-2.5">
        <PlanIcon slug={plan.slug} size={22} uid={`plan-${location}`} />
        <span className="text-sm font-semibold">
          {plan.monthlyAuditQuota.toLocaleString()} SEO audits
          <span className="font-normal text-fg-muted"> / month</span>
        </span>
      </div>

      <ul className="relative mt-5 space-y-2.5 border-t border-border pt-5">
        {quotas.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px]">
            <Check
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
              strokeWidth={3}
              aria-hidden="true"
            />
            <span className="text-fg-muted">{f}</span>
          </li>
        ))}
        {shown.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px]">
            <Check
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
              strokeWidth={3}
              aria-hidden="true"
            />
            <span className="text-fg-muted">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
