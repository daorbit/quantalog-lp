import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "../ui";
import { DashboardPreview } from "../dashboard-preview";

/* Each claim is a number a visitor can check, not an adjective. */
const trustPoints = [
  { value: "<1 KB", label: "tracker size" },
  { value: "0", label: "cookies set" },
  { value: "~3s", label: "to first data" },
  { value: "100%", label: "of visitors counted" },
];

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

          {/* The H1 states the category in words a visitor actually sees.
              An earlier version kept the hook visible and appended the
              keywords in an `sr-only` span — text written for crawlers and
              hidden from people, which is what Google's spam policy calls
              hidden text, and it sat in the most important element on the
              site. The hook survives in the second line; the first line now
              does the work the hidden span was doing. */}
          <h1 className="rise rise-2 headline mt-8 text-balance text-[2.75rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[4.25rem]">
            Cookieless web analytics
            <br className="hidden sm:block" /> that counts the{" "}
            <span className="underline-sketch text-accent">half</span> others
            miss.
          </h1>

          <p className="rise rise-3 mx-auto mt-7 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-fg-muted sm:text-lg">
            A privacy-first Google Analytics alternative with real-time
            dashboards, built-in SEO audits and an embeddable API. Cookie-based
            tools only measure the visitors who accept the banner — Quantalog
            sets no cookies and stores no personal data, so there is no banner
            to decline and nothing to miss.
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

          {/* Read as a spec strip rather than a bullet list: on an analytics
              page the numbers are the argument, so they get the weight. */}
          <ul className="rise rise-5 mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
            {trustPoints.map((point) => (
              <li key={point.label} className="text-center">
                <p className="text-[1.5rem] font-semibold leading-none tracking-[-0.03em] text-accent">
                  {point.value}
                </p>
                <p className="mt-1.5 text-[11px] uppercase tracking-[0.08em] text-fg-faint">
                  {point.label}
                </p>
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
