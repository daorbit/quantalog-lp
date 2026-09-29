"use client";

import { useEffect, useState } from "react";
import { ArrowRight, BarChart3 } from "lucide-react";
import { PlanCard } from "../plan-card";
import { usePlans } from "../plans-provider";
import { SegmentedControl } from "../segmented-control";
import { OrbitIcon } from "../orbit/orbit-icon";
import { BillingControls } from "../pricing/billing-controls";
import { OrbitPlanCard } from "../pricing/orbit-plan-card";
import { BillingFacts } from "../pricing/billing-facts";
import { site } from "@/lib/site";
import { detectCurrency } from "@/lib/plans";
import type { Currency, ResolvedOrbitPlan, ResolvedPlan } from "@/lib/plans";

const CARD_FEATURE_ROWS = 8;

const ladders = [
  { id: "analytics", label: "Analytics plans", icon: BarChart3 },
  { id: "orbit", label: "Orbit AI", icon: OrbitIcon },
];

const blurbs: Record<string, string> = {
  analytics: "Every plan includes the full dashboard and the SEO audit suite. Start on Free and move up as your sites grow.",
  orbit: "Orbit is bought per workspace, on its own ladder — a small site can still be a heavy Orbit user. A question only counts once it's answered.",
};

function Skeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-3" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-(--radius-panel) p-7 ring-1 ring-border">
          <div className="skeleton h-5 w-24 rounded" />
          <div className="skeleton mt-3 h-3.5 w-full rounded" />
          <div className="skeleton mt-6 h-11 w-32 rounded-lg" />
          <div className="skeleton mt-7 h-11 w-full rounded-full" />
          <div className="mt-7 space-y-3 border-t border-border pt-6">
            {[0, 1, 2, 3].map((r) => (
              <div key={r} className="skeleton h-3.5 w-full rounded" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Pricing() {
  const shared = usePlans();
  const plans = shared.plans as ResolvedPlan[] | null;
  const orbitPlans = shared.orbitPlans as ResolvedOrbitPlan[] | null;

  const [ladder, setLadder] = useState("analytics");
  const [yearly, setYearly] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    setCurrency(detectCurrency());
  }, []);

  const sortedOrbit = orbitPlans ? [...orbitPlans].sort((a, b) => a.sortOrder - b.sortOrder) : null;
  const loading = ladder === "analytics" ? !plans : !sortedOrbit;

  return (
    <section id="pricing">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <div className="v-rise mx-auto max-w-2xl text-center">
          <p className="text-[15px] font-semibold text-accent sm:text-[17px]">Pricing</p>
          <h2 className="mt-3 text-balance text-display font-medium leading-[1.02] tracking-display">
            Start free. Pay when it&apos;s worth it.
          </h2>
        </div>

        <div className="v-rise v-d2 mt-10">
          <SegmentedControl
            options={ladders}
            value={ladder}
            onChange={setLadder}
            label="Pricing"
            idPrefix="pricing-tab"
            controls="pricing-panel"
          />
          <p key={ladder} className="rise mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-fg-muted">
            {blurbs[ladder]}
          </p>
          <div className="mt-6">
            <BillingControls currency={currency} onCurrency={setCurrency} yearly={yearly} onYearly={setYearly} />
          </div>
        </div>

        <div id="pricing-panel" role="tabpanel" aria-labelledby={`pricing-tab-${ladder}`} className="mt-12">
          {shared.error ? (
            <p className="text-center text-[15px] text-fg-muted">
              Couldn&apos;t load plans right now.{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-fg underline underline-offset-4">
                Contact us
              </a>{" "}
              for pricing.
            </p>
          ) : loading ? (
            <>
              <Skeleton />
              <span className="sr-only">Loading plans…</span>
            </>
          ) : ladder === "analytics" && plans ? (
            <div key="analytics" className="rise grid gap-5 lg:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.slug}
                  plan={plan}
                  currency={currency}
                  yearly={yearly}
                  maxRows={CARD_FEATURE_ROWS}
                  location="home"
                />
              ))}
            </div>
          ) : sortedOrbit && sortedOrbit.length > 0 ? (
            <div key="orbit" className="rise grid gap-5 lg:grid-cols-3">
              {sortedOrbit.map((plan, i) => (
                <OrbitPlanCard
                  key={plan.slug}
                  plan={plan}
                  currency={currency}
                  yearly={yearly}
                  featured={i === sortedOrbit.length - 1}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-[15px] text-fg-muted">Orbit plans are shown in the dashboard.</p>
          )}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/plans"
            className="group inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
          >
            Compare every feature
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-20 border-t border-border pt-14">
          <BillingFacts />
        </div>
      </div>
    </section>
  );
}
