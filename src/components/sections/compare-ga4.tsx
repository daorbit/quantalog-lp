import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getComparison } from "@/lib/comparisons";
import { site } from "@/lib/site";
import { SectionHeading } from "../ui";
import { BrandGlyph } from "../compare/brand-badge";
import { GA4_ROWS } from "../compare-home/ga4-rows";
import { Ga4RowItem } from "../compare-home/ga4-row";

const GA4_SLUG = "google-analytics-alternative";

export function CompareGa4() {
  const comparison = getComparison(GA4_SLUG);
  if (!comparison) return null;

  return (
    <section id="compare" className="section-y">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Compared"
          title="Why teams leave Google Analytics."
          body="The honest differences, including the one where GA4 is the better fit."
          centered
        />

        <div className="mt-12 sm:mt-16">
          <div
            className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-6 border-b border-border-strong pb-4 sm:grid"
            aria-hidden="true"
          >
            <span />
            <span className="flex items-center gap-2 text-[14px] font-semibold text-fg">
              <Image src="/favicon.png" alt="" width={16} height={16} />
              {site.name}
            </span>
            <span className="flex items-center gap-2 text-[14px] font-semibold text-fg-muted">
              <BrandGlyph icon={comparison.logo} />
              {comparison.rival}
            </span>
          </div>

          <ul className="divide-y divide-border">
            {GA4_ROWS.map((row) => (
              <Ga4RowItem key={row.point} row={row} rival={comparison.rival} />
            ))}
          </ul>
        </div>

        <div className="mt-10 text-center">
          <a
            href={`/compare/${comparison.slug}`}
            className="inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
          >
            See the full comparison
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
