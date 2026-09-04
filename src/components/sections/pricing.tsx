"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { PlanIcon } from "../plan-icons";
import { PlanCard } from "../plan-card";
import { usePlans } from "../plans-provider";
import { site } from "@/lib/site";
import {
  CURRENCIES, allFeatures, detectCurrency,
} from "@/lib/plans";
import type { Currency, ResolvedPlan } from "@/lib/plans";

/** Feature rows shown on a pricing card, quotas included. */
const CARD_FEATURE_ROWS = 8;

export function Pricing() {

  const shared = usePlans();
  const plans = shared.plans as ResolvedPlan[] | null;
  const error = shared.error;

  const [yearly, setYearly] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");

  // The union of every plan's named features, so each card can show what it
  // does not include rather than only what it does. Capped on the card: the
  // full matrix is its own page, linked below the grid.
  const features = plans ? allFeatures(plans) : [];

  useEffect(() => {
    setCurrency(detectCurrency());
  }, []);

  return (
    <section id="pricing">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        {/* Eyebrow, then a two-line display heading whose second line carries
            the accent — the section's one coloured element besides the plan
            marks, now that the CTAs are monochrome. */}
        <div className="v-rise">
          <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-medium text-fg-muted">
            <PlanIcon slug="pro" size={13} uid="pricing-eyebrow" />
            Pricing
          </span>
          <h2 className="mt-5 max-w-3xl text-h2 font-medium leading-[1.08] tracking-[-0.03em]">
            Plans that scale
            <br />
            <span className="pricing-display-accent">with your sites.</span>
          </h2>
          <p className="mt-4 max-w-xl text-lead leading-relaxed text-fg-muted">
            Every plan includes the full dashboard and SEO audit suite. No
            feature is held back to sell you an upgrade.
          </p>
        </div>

        {plans && (
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

            {/* A real switch rather than a second pill pair: two segmented
                controls side by side read as one four-way choice. */}
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
            {plans.map((plan) => (
              <PlanCard
                key={plan.slug}
                plan={plan}
                features={features}
                currency={currency}
                yearly={yearly}
                maxRows={CARD_FEATURE_ROWS}
                location="home"
              />
            ))}
          </div>
        )}

        {/* The cards show the first few features only; the full matrix lives
            on its own page rather than making this section scroll past the
            fold. */}
        {plans && (
          <div className="mt-10 text-center">
            <a
              href="/plans"
              className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-fg transition hover:text-accent"
            >
              Compare every feature
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        )}

        <p className="mt-10 text-center text-xs text-fg-faint">
          Prices in {currency}. Cancel any time — no exit interview.
        </p>
      </div>
    </section>
  );
}
