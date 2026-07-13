import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { site } from "@/lib/site";

export function Cta() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-bg-subtle">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{ background: "var(--glow)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-5 py-28 text-center">
        <h2 className="headline text-balance text-[2rem] font-bold leading-[1.15] tracking-[-0.025em] sm:text-[2.75rem]">
          Your first pageview is
          <br className="hidden sm:block" /> three minutes away.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-pretty leading-relaxed text-fg-muted">
          Free forever on the Hobby plan. No credit card, no sales call, no
          onboarding webinar.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={`${site.app}/signup`} size="lg" className="group w-full sm:w-auto">
            Start free
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
          <Button href={site.docs} variant="secondary" size="lg" className="w-full sm:w-auto">
            Read the docs
          </Button>
        </div>
      </div>
    </section>
  );
}
