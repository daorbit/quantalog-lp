import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { ProviderSignup } from "../provider-signup";
import { comparisonCategory, type Comparison } from "@/lib/comparisons";
import { site } from "@/lib/site";

export function CompareCta({ comparison }: { comparison: Comparison }) {
  const { cta } = comparisonCategory(comparison.category);
  return (
    <section className="px-3 pb-16 sm:px-6 sm:pb-24">
      <div className="stage mx-auto max-w-7xl px-4 py-16 text-center sm:py-24">
        <h2 className="text-balance text-h2 font-semibold leading-[1.1] tracking-display">
          {cta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-pretty text-lead leading-normal text-fg-muted">
          {cta.body(comparison.rival)}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            href={`${site.app}/signup`}
            size="lg"
            className="group"
            track="cta_start_free"
            trackProps={{ location: "compare_cta", rival: comparison.rival }}
          >
            Start free
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href={`${site.app}/login`} variant="secondary" size="lg">
            See the live demo
          </Button>
        </div>
        <ProviderSignup location="compare_cta" className="mt-6" />
      </div>
    </section>
  );
}
