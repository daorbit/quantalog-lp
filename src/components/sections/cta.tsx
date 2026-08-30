import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { site } from "@/lib/site";

export function Cta() {
  return (

    <section className="relative overflow-hidden border-t border-border bg-bg-subtle">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-160 w-160 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        aria-hidden="true"
      >
        <div className="aurora h-full w-full rounded-full" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:py-28 lg:py-32">
        <h2 className="headline-live text-balance text-h2 font-medium leading-[1.08] tracking-[-0.035em]">
          Your first pageview is
          <br className="hidden sm:block" /> three minutes away.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-pretty text-lead leading-relaxed text-fg-muted">
          Free forever on the Hobby plan. No credit card, no sales call, no
          onboarding webinar.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
            className=""
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
