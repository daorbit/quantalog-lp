import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "../ui";
import { DashboardPreview } from "../dashboard-preview";

const trustPoints = ["Under 1 KB", "No cookies", "Live in ~3s", "GDPR-ready"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* Two offset glows rather than one centred blob — an asymmetric wash
          reads as lighting, a single circle reads as a gradient. */}
      <div
        className="pointer-events-none absolute left-1/2 -top-24 h-[26rem] w-[60rem] -translate-x-1/2 rounded-full blur-[100px]"
        style={{ background: "var(--glow)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 top-40 h-88 w-136 rounded-full opacity-70 blur-[120px]"
        style={{ background: "var(--glow)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-16 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="/blog/introducing-quantalog"
            className="rise rise-1 group inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 py-1 pl-1 pr-3 text-xs text-fg-muted shadow-soft backdrop-blur transition hover:border-border-strong hover:text-fg"
          >
            <span className="rounded-full bg-accent px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-accent-fg">
              New
            </span>
            <span>Introducing the Platform API</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>

          {/* The visible headline is a hook and says nothing about what the
              product is, which leaves a crawler with no topic for the page's
              most important element. The screen-reader-only span gives the H1
              that context without altering what a visitor sees. */}
          <h1 className="rise rise-2 headline mt-8 text-balance text-[2.75rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[4.25rem]">
            Your analytics miss up to{" "}
            <span className="underline-sketch text-accent">half</span>
            <br className="hidden sm:block" /> your traffic.
            <span className="sr-only">
              {" "}
              Quantalog is privacy-first, cookieless web analytics with a
              real-time dashboard and an embeddable multi-tenant API.
            </span>
          </h1>

          <p className="rise rise-3 mx-auto mt-7 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-fg-muted sm:text-lg">
            Cookie-based tools only measure the visitors who accept the banner.
            The rest stay invisible. Quantalog sets no cookies and stores no
            personal data — so there is no banner to decline, and nothing to
            miss.
          </p>

          <div className="rise rise-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={`${site.app}/signup`}
              size="lg"
              className="group w-full sm:w-auto"
              track="cta_start_free"
              trackProps={{ location: "hero" }}
            >
              Start free — no card
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
            {/* The demo asks for nothing, so it earns the second slot ahead of
                the API tour — a visitor who wants the API will find it in the
                Platform section either way. */}
            <Button
              href={`${site.app}/login`}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              track="try_demo"
              trackProps={{ location: "hero" }}
            >
              Try the live demo
            </Button>
          </div>

          <ul className="rise rise-5 mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-1.5 text-xs text-fg-faint">
                <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="rise rise-5 relative mt-20">
          {/* Grounding glow so the dashboard sits on the page instead of floating. */}
          <div
            className="pointer-events-none absolute -inset-x-8 -bottom-8 top-12 rounded-[2rem] blur-3xl"
            style={{ background: "var(--glow)" }}
            aria-hidden="true"
          />
          {/* The product shot is the proof — give it real elevation and an
              inset hairline so it sits on the page rather than in it. */}
          <div className="panel relative overflow-hidden">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
