"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui";
import { PlanCard } from "../plan-card";
import { usePlans } from "../plans-provider";
import { BillingControls } from "../pricing/billing-controls";
import { BillingFacts } from "../pricing/billing-facts";
import { ProviderSignup } from "../provider-signup";
import { site } from "@/lib/site";
import { detectCurrency } from "@/lib/plans";
import type { Currency, ResolvedPlan } from "@/lib/plans";

const CARD_FEATURE_ROWS = 8;

const BLURB =
  "Every plan includes the full dashboard, the SEO audit suite and Orbit AI. Start on Free and move up as your sites grow.";

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

  const [yearly, setYearly] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    setCurrency(detectCurrency());
  }, []);

  return (
    <section id="pricing">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
        <SectionHeading eyebrow="Pricing" title="Start free. Pay when it’s worth it." centered />

        <div className="mt-10">
          <p className="mx-auto max-w-xl text-center text-[15px] leading-relaxed text-fg-muted">{BLURB}</p>
          <div className="mt-6">
            <BillingControls currency={currency} onCurrency={setCurrency} yearly={yearly} onYearly={setYearly} />
          </div>
        </div>

        <div className="mt-8 sm:mt-12">
          {shared.error ? (
            <p className="text-center text-[15px] text-fg-muted">
              Couldn&apos;t load plans right now.{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-fg underline underline-offset-4">
                Contact us
              </a>{" "}
              for pricing.
            </p>
          ) : !plans ? (
            <>
              <Skeleton />
              <span className="sr-only">Loading plans…</span>
            </>
          ) : (
            <div className="rise grid gap-5 lg:grid-cols-3">
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
          )}
        </div>

        <ProviderSignup location="home_pricing" className="mt-10" />

        <div className="mt-8 text-center">
          <a
            href="/plans"
            className="group inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
          >
            Compare every feature
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 border-t border-border pt-10 sm:mt-20 sm:pt-14">
          <BillingFacts />
        </div>
      </div>
    </section>
  );
}
