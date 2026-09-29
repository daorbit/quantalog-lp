import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { site } from "@/lib/site";

export function Cta() {
  return (
    <section className="px-3 pb-16 sm:px-6 sm:pb-24">
      <div className="stage mx-auto max-w-7xl px-4 py-16 text-center sm:py-24 lg:py-28">
        <h2 className="text-balance text-h2 font-medium leading-[1.06] tracking-display">
          Your first pageview is
          <br className="hidden sm:block" /> three minutes away.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-pretty text-lead leading-normal text-fg-muted">
          The Free plan stays free forever. No credit card, no sales call, no
          onboarding webinar.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            href={`${site.app}/signup`}
            size="lg"
            className="group"
            track="cta_start_free"
            trackProps={{ location: "footer_cta" }}
          >
            Start free
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
          <Button
            href={site.docs}
            variant="secondary"
            size="lg"
            track="read_docs"
            trackProps={{ location: "footer_cta" }}
          >
            Read the docs
          </Button>
        </div>
      </div>
    </section>
  );
}
