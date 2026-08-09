import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import { SectionHeading } from "../ui";

const namedComparisons = [
  { href: "/compare/google-analytics-alternative", label: "vs Google Analytics" },
  { href: "/compare/plausible-alternative", label: "vs Plausible" },
  { href: "/compare/matomo-alternative", label: "vs Matomo" },
];

/**
 * How Quantalog sits against the two things it actually replaces.
 *
 * Deliberately no competitor names and no claims about their products —
 * "cookie-based suites" is the honest category, and every row here is a fact
 * about Quantalog that a reader can verify in the docs. A comparison table
 * that overstates is worse than none.
 */
type Support = "yes" | "no" | "partial";

const columns = ["Quantalog", "Cookie-based suites", "Simple page counters"];

const rows: { feature: string; values: [Support, Support, Support] }[] = [
  { feature: "Works without a consent banner", values: ["yes", "no", "yes"] },
  { feature: "Counts every visitor", values: ["yes", "no", "partial"] },
  { feature: "Real-time — no batch delay", values: ["yes", "partial", "partial"] },
  { feature: "Funnels and retention cohorts", values: ["yes", "yes", "no"] },
  { feature: "Scroll depth and engaged time", values: ["yes", "partial", "no"] },
  { feature: "Custom events with revenue", values: ["yes", "yes", "no"] },
  { feature: "SEO audits in the same dashboard", values: ["yes", "no", "no"] },
  { feature: "Broken link and schema checks", values: ["yes", "no", "no"] },
  { feature: "Raw event export (CSV / XLSX)", values: ["yes", "partial", "no"] },
  { feature: "Multi-tenant API for your own users", values: ["yes", "no", "no"] },
  { feature: "Under 1 KB on the page", values: ["yes", "no", "yes"] },
];

function Cell({ value }: { value: Support }) {
  if (value === "yes") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-bg-subtle text-fg-faint">
        <Minus className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
        <span className="sr-only">Partial</span>
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center text-fg-faint">
      <span aria-hidden="true" className="h-px w-3 bg-current" />
      <span className="sr-only">No</span>
    </span>
  );
}

export function Compare() {
  return (
    <section id="compare" className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-32">
        <SectionHeading
          eyebrow="Comparison"
          title="Where Quantalog fits"
          body="Most teams are choosing between a heavyweight suite that needs a consent banner and a counter that only shows pageviews. Quantalog is the middle: product depth without the compliance surface."
          align="center"
          className="v-rise"
        />

        <div className="v-rise v-d2 panel mt-16 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="px-6 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-fg-faint">
                    Capability
                  </th>
                  {columns.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className={`px-6 py-4 text-center text-[11px] font-medium uppercase tracking-[0.14em] ${
                        i === 0 ? "bg-accent/6 text-accent" : "text-fg-faint"
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((row) => (
                  <tr key={row.feature} className="transition-colors hover:bg-bg-subtle">
                    <th scope="row" className="px-6 py-3.5 text-sm font-normal text-fg">
                      {row.feature}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={i}
                        // Tint the whole Quantalog column, so the eye tracks
                        // one line down the table instead of scanning rows.
                        className={`px-6 py-3.5 text-center ${
                          i === 0 ? "bg-accent/4" : ""
                        }`}
                      >
                        <span className="inline-flex justify-center">
                          <Cell value={value} />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-fg-faint">
          Categories, not specific products — capabilities vary between vendors
          in each column.
        </p>

        {/* Named comparisons live on their own pages, where a claim about one
            product can be specific enough to be checked. */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-sm">
          <span className="text-fg-muted">Comparing a specific tool?</span>
          {namedComparisons.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 font-medium transition hover:border-accent hover:text-accent"
            >
              {c.label}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
