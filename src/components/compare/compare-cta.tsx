import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { ProviderSignup } from "../provider-signup";
import { site } from "@/lib/site";

export function CompareCta({ rival }: { rival: string }) {
  return (
    <section className="px-3 pb-16 sm:px-6 sm:pb-24">
      <div className="stage mx-auto max-w-7xl px-4 py-16 text-center sm:py-24">
        <h2 className="text-balance text-h2 font-medium leading-[1.06] tracking-display">
          Try it against your own traffic.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-pretty text-lead leading-normal text-fg-muted">
          Run {site.name} alongside {rival} for a couple of weeks and compare the numbers yourself.
          The Free plan needs no card.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            href={`${site.app}/signup`}
            size="lg"
            className="group"
            track="cta_start_free"
            trackProps={{ location: "compare_cta" }}
          >
            Start free
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
          <Button href="/docs/demo" variant="secondary" size="lg">
            See the live demo
          </Button>
        </div>
        <ProviderSignup location="compare_cta" className="mt-6" />
      </div>
    </section>
  );
}
