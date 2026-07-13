import { Check } from "lucide-react";
import { site } from "@/lib/site";

const plans = [
  {
    name: "Hobby",
    price: "$0",
    cadence: "forever",
    blurb: "For a side project or a personal site.",
    cta: "Start free",
    href: `${site.app}/signup`,
    featured: false,
    features: [
      "10k pageviews / month",
      "1 site",
      "Real-time dashboard",
      "30-day data retention",
      "Cookieless tracking",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    cadence: "per month",
    blurb: "For products in production with a team behind them.",
    cta: "Start 14-day trial",
    href: `${site.app}/signup?plan=pro`,
    featured: true,
    features: [
      "1M pageviews / month",
      "Unlimited sites",
      "Unlimited team members",
      "2-year data retention",
      "UTM and campaign reports",
      "Email reports",
    ],
  },
  {
    name: "Platform",
    price: "Custom",
    cadence: "usage-based",
    blurb: "For platforms reselling analytics to their own users.",
    cta: "Talk to us",
    href: `mailto:${site.email}?subject=Quantalog%20Platform%20plan`,
    featured: false,
    features: [
      "Everything in Pro",
      "Platform API + API keys",
      "Unlimited end-user projects",
      "White-label tracker domain",
      "99.9% uptime SLA",
      "Priority support",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Pricing
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Priced per pageview. Not per person you track.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-fg-muted">
            Every plan includes the full dashboard. No feature is held back to sell
            you an upgrade.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border p-7 ${
                plan.featured
                  ? "border-accent bg-surface shadow-xl shadow-black/5"
                  : "border-border bg-surface"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-2.5 left-7 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-accent-fg">
                  Most popular
                </span>
              )}

              <h3 className="text-base font-semibold tracking-tight">{plan.name}</h3>
              <p className="mt-1.5 text-sm text-fg-muted">{plan.blurb}</p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                <span className="text-sm text-fg-muted">{plan.cadence}</span>
              </div>

              <a
                href={plan.href}
                className={`mt-7 rounded-lg py-2.5 text-center text-sm font-medium transition ${
                  plan.featured
                    ? "bg-accent text-accent-fg hover:opacity-90"
                    : "border border-border text-fg hover:border-border-strong"
                }`}
              >
                {plan.cta}
              </a>

              <ul className="mt-7 space-y-3 border-t border-border pt-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span className="text-fg-muted">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
