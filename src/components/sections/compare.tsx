import { Check, Minus } from "lucide-react";
import { SectionHeading } from "../ui";
import { Reveal } from "../reveal";

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
    <section id="compare" className="relative border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-28">
        <SectionHeading
          eyebrow="Comparison"
          title="Where Quantalog fits"
          body="Most teams are choosing between a heavyweight suite that needs a consent banner and a counter that only shows pageviews. Quantalog is the middle: product depth without the compliance surface."
          centered
        />

        <Reveal className="panel mt-16 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-fg-faint">
                    Capability
                  </th>
                  {columns.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className={`px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.1em] ${
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
        </Reveal>

        <p className="mt-5 text-center text-xs text-fg-faint">
          Categories, not specific products — capabilities vary between vendors
          in each column.
        </p>
      </div>
    </section>
  );
}
