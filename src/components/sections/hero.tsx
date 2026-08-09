import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "../ui";
import { Words } from "../words";
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
      {/* One slowly rotating conic sweep, in place of the pair of static
          blurred blobs. A blob that never moves is a gradient; a sweep that
          turns reads as light in the room. This is now the only ambient glow
          on the page — it was on six sections, which made it a template
          rather than a choice. */}
      <div
        className="pointer-events-none absolute left-1/2 -top-112 h-184 w-184 -translate-x-1/2 rounded-full opacity-70"
        aria-hidden="true"
      >
        <div className="aurora h-full w-full rounded-full" /></div>

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <a
            href="/blog/introducing-quantalog"
            className="glass rise rise-1 group inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-xs text-fg-muted transition-all duration-200 hover:-translate-y-px hover:text-fg"
          >
            <span className="rounded-full bg-accent/12 px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-wide text-accent">
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
          {/* Words arrive in sequence rather than the whole block fading in
              at once — the headline resolves the way it would be read. The
              markup is still one plain sentence, so selection, wrapping and
              crawlers are unaffected. */}
          <h1 className="word-rise headline-live mt-7 text-balance text-display font-medium leading-[1.06] tracking-[-0.035em] sm:mt-9">
            <Words text="Cookieless web analytics" />
            <br className="hidden sm:block" />{" "}
            <Words text="that counts the" offset={3} />{" "}
            <span
              className="underline-sketch text-accent"
              style={{ ["--i" as string]: 6 }}
            >
              half
            </span>{" "}
            <Words text="others miss." offset={7} />
          </h1>

          <p className="rise rise-3 mx-auto mt-7 max-w-xl text-pretty text-lead leading-relaxed text-fg-muted">
            A privacy-first Google Analytics alternative with real-time
            dashboards, built-in SEO audits and an embeddable API. Cookie-based
            tools only measure the visitors who accept the banner — Quantalog
            sets no cookies and stores no personal data, so there is no banner
            to decline and nothing to miss.
          </p>

          {/* Side by side at every width, sized to their labels. Stacked and
              stretched edge to edge, the pair read as two slabs rather than a
              choice between two actions. */}
          <div className="rise rise-4 mt-9 flex flex-row flex-wrap items-center justify-center gap-3 sm:mt-10">
            <Button
              href={`${site.app}/signup`}
              size="lg"
              className="group"
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
              track="try_demo"
              trackProps={{ location: "hero" }}
            >
              Try the live demo
            </Button>
          </div>

          {/* Read as a spec strip rather than a bullet list: on an analytics
              page the numbers are the argument, so they get the weight, and
              hairlines between them bind the four figures into one object. */}
          <ul className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-y-7 sm:mt-14 sm:grid-cols-4">
            {trustPoints.map((point, i) => (
              <li
                key={point.label}
                className={`stat-in text-center sm:border-l sm:border-border sm:first:border-l-0 ${
                  i % 2 === 1 ? "border-l border-border sm:border-l" : ""
                }`}
                style={{ animationDelay: `${0.45 + i * 0.08}s` }}
              >
                <p className="text-2xl font-medium leading-none tracking-[-0.04em] tabular-nums sm:text-[1.75rem]">
                  {point.value}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-fg-faint">
                  {point.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* The product shot is the proof, so it gets the page's deepest
            elevation and an inset hairline — it should sit on the page rather
            than in it. The separate blurred glow underneath is gone; the
            aurora above already lights this area. */}
        <div className="rise rise-5 panel relative mt-16 overflow-hidden sm:mt-24">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
