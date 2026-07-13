import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

export function Cta() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "var(--glow)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Your first pageview is three minutes away.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-fg-muted">
          Free forever on the Hobby plan. No credit card, no sales call, no
          onboarding webinar.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`${site.app}/signup`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition hover:opacity-90 sm:w-auto"
          >
            Start free
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={site.docs}
            className="inline-flex w-full items-center justify-center rounded-lg border border-border bg-surface px-6 py-3 text-sm font-medium text-fg transition hover:border-border-strong sm:w-auto"
          >
            Read the docs
          </a>
        </div>
      </div>
    </section>
  );
}
