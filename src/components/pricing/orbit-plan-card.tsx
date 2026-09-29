"use client";

import { ArrowRight, Check } from "lucide-react";
import { OrbitMark } from "../orbit/orbit-mark";
import { site } from "@/lib/site";
import { track } from "@/lib/track";
import { formatPrice, type Currency, type ResolvedOrbitPlan } from "@/lib/plans";

export function OrbitPlanCard({
  plan,
  currency,
  yearly,
  featured,
}: {
  plan: ResolvedOrbitPlan;
  currency: Currency;
  yearly: boolean;
  featured: boolean;
}) {
  const price = (yearly ? plan.priceYearly : plan.priceMonthly)[currency];
  const lines = [
    ...new Set([
      `${plan.monthlyQuota.toLocaleString()} questions / month`,
      plan.dataAccess ? "Answers from your own analytics" : "Answers about how Quantalog works",
      "Every model included",
      ...plan.features,
    ]),
  ];

  return (
    <div
      className={`flex flex-col rounded-(--radius-panel) bg-surface p-7 sm:p-8 dark:bg-surface-raised ${
        featured ? "ring-2 ring-accent" : "ring-1 ring-border"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <OrbitMark size={22} />
        <h3 className="text-[1.25rem] font-semibold tracking-tight">{plan.name}</h3>
      </div>
      <p className="mt-2 min-h-11 text-[14px] leading-relaxed text-fg-muted">{plan.description}</p>

      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="text-[2.75rem] font-semibold leading-none tracking-[-0.04em] tabular-nums">
          {price === 0 ? "Free" : formatPrice(price, currency)}
        </span>
        {price > 0 && <span className="text-[14px] text-fg-muted">/ {yearly ? "year" : "month"}</span>}
      </p>

      <a
        href={`${site.app}/signup`}
        onClick={() => track("pricing_orbit_selected", { plan: plan.slug, cycle: yearly ? "yearly" : "monthly" })}
        className={`group mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full text-[14px] font-semibold transition-colors ${
          featured
            ? "bg-cta text-cta-fg hover:bg-cta-hover"
            : "border border-border text-fg hover:bg-bg-subtle"
        }`}
      >
        {price === 0 ? "Start free" : "Get started"}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>

      <ul className="mt-7 space-y-3 border-t border-border pt-6">
        {lines.map((l) => (
          <li key={l} className="flex items-start gap-2.5 text-[14px] text-fg-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}
