import { Check } from "lucide-react";
import { SectionHeading } from "../ui";
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
      "Scheduled email reports",
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
    <section id="pricing" className="border-t border-border bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-5 py-28">
        <SectionHeading
          centered
          eyebrow="Pricing"
          title="Priced per pageview. Not per person you track."
          body="Every plan includes the full dashboard. No feature is held back to sell you an upgrade."
        />

        <div className="mt-16 grid items-start gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card relative flex flex-col p-7 ${
                plan.featured
                  ? "border-accent/60 shadow-float lg:-mt-4 lg:pb-10 lg:pt-10"
                  : "card-hover"
              }`}
            >
              {plan.featured && (
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
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{plan.blurb}</p>

              <div className="mt-7 flex items-baseline gap-1.5">
                <span className="text-[2.75rem] font-bold leading-none tracking-[-0.03em]">
                  {plan.price}
                </span>
                <span className="text-sm text-fg-muted">{plan.cadence}</span>
              </div>

              <a
                href={plan.href}
                className={`mt-8 rounded-lg py-2.5 text-center text-sm font-medium transition duration-200 ${
                  plan.featured
                    ? "bg-accent text-accent-fg shadow-soft hover:brightness-110"
                    : "border border-border bg-surface text-fg hover:border-border-strong hover:bg-surface-raised"
                }`}
              >
                {plan.cta}
              </a>

              <ul className="mt-8 space-y-3 border-t border-border pt-8">
                {plan.features.map((f) => (
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
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-fg-faint">
          All prices in USD. Cancel any time — no exit interview.
        </p>
      </div>
    </section>
  );
}
