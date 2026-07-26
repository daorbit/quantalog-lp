"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { SectionHeading } from "../ui";
import { site } from "@/lib/site";
import { track } from "@/lib/track";

type ResolvedPlan = {
  slug: string;
  name: string;
  description: string;
  maxWorkspaces: number;
  maxSitesPerWorkspace: number;
  monthlyAuditQuota: number;
  monthlyCrawlQuota: number;
  features: string[];
  sortOrder: number;
  priceMonthly: number;
  priceYearly: number;
};

const FEATURED_SLUG = "pro";

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

function planFeatures(plan: ResolvedPlan): string[] {
  return [
    plural(plan.maxWorkspaces, "workspace"),
    `${plan.maxSitesPerWorkspace} sites per workspace`,
    `${plan.monthlyAuditQuota} SEO audits / month`,
    `${plural(plan.monthlyCrawlQuota, "site crawl")} / month`,
    ...plan.features,
  ];
}

function formatPrice(amountPaise: number) {
  if (amountPaise === 0) return "₹0";
  return `₹${(amountPaise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export function Pricing() {
  const [plans, setPlans] = useState<ResolvedPlan[] | null>(null);
  const [error, setError] = useState(false);
  const [yearly, setYearly] = useState(false);

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
          <div className="mt-10 flex justify-center">
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
              const price = yearly ? plan.priceYearly : plan.priceMonthly;
              const monthlyEquivalent = yearly && plan.priceYearly > 0 ? Math.round(plan.priceYearly / 12) : null;

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
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-accent-fg shadow-soft">
                        Most popular
                      </span>
                    </>
                  )}

                  <h3 className="text-[15px] font-semibold tracking-tight">{plan.name}</h3>
                  <p className="mt-1.5 min-h-10 text-sm leading-relaxed text-fg-muted">
                    {plan.description}
                  </p>

                  <div className="mt-7">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[2.75rem] font-bold leading-none tracking-[-0.03em]">
                        {formatPrice(price)}
                      </span>
                      <span className="text-sm text-fg-muted">
                        {price === 0 ? "forever" : yearly ? "per year" : "per month"}
                      </span>
                    </div>
                    <div className="mt-1.5 h-4 text-xs text-fg-faint">
                      {monthlyEquivalent !== null && `≈ ${formatPrice(monthlyEquivalent)} / month billed yearly`}
                    </div>
                  </div>

                  <a
                    href={`${site.app}/signup?plan=${plan.slug}${yearly ? "&cycle=yearly" : ""}`}
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

        <p className="mt-10 text-center text-xs text-fg-faint">
          All prices in INR. Cancel any time — no exit interview.
        </p>
      </div>
    </section>
  );
}
