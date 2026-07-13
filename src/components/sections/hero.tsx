import { ArrowRight, Zap } from "lucide-react";
import { site } from "@/lib/site";
import { DashboardPreview } from "../dashboard-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[52rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "var(--glow)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="/blog/introducing-quantalog"
            className="rise inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-fg-muted transition hover:border-border-strong"
          >
            <Zap className="h-3.5 w-3.5 text-accent" />
            <span>Introducing the Quantalog Platform API</span>
            <ArrowRight className="h-3 w-3" />
          </a>

          <h1 className="rise mt-7 text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
            Real-time analytics
            <br />
            <span className="text-accent">you can embed.</span>
          </h1>

          <p className="rise mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
            Cookieless web analytics with a live dashboard — plus a multi-tenant
            REST API so you can ship analytics to your own users. One script tag,
            zero consent banners.
          </p>

          <div className="rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`${site.app}/signup`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition hover:opacity-90 sm:w-auto"
            >
              Start free — no card
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#platform"
              className="inline-flex w-full items-center justify-center rounded-lg border border-border bg-surface px-6 py-3 text-sm font-medium text-fg transition hover:border-border-strong sm:w-auto"
            >
              See the API
            </a>
          </div>

          <p className="mt-5 text-xs text-fg-muted">
            &lt; 1 KB tracker · no cookies · data live in under 3 seconds
          </p>
        </div>

        <div className="rise mt-16">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
