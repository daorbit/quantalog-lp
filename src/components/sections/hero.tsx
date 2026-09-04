import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "../ui";
import { Words } from "../words";
import { HeroFlowLazy } from "../hero-flow-lazy";
import { TrustChips } from "../trust-chips";

const trustPoints = [
  { value: "<1 KB", label: "tracker size" },
  { value: "0", label: "cookies set" },
  { value: "~3s", label: "to first data" },
  { value: "100%", label: "of visitors counted" },
];

export function Hero() {
  return (

    <section className="relative isolate overflow-hidden">

      <div className="relative mx-auto max-w-[90rem] px-4 pb-16 pt-12 sm:px-5 sm:pb-24 sm:pt-20 lg:px-6">

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-8">

        <div className="w-full text-center lg:w-[42%] lg:shrink-0 lg:text-left">
          <a
            href="/blog/introducing-quantalog"
            className="glass rise rise-1 group inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-xs text-fg-muted transition-all duration-200 hover:-translate-y-px hover:text-fg"
          >
            {/* The one place the accent stays at strength above the fold
                besides the marked word: a small, high-value mark reads as a
                signal precisely because nothing around it is competing. */}
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-wide text-accent ring-1 ring-inset ring-accent-quiet">
              New
            </span>
            <span>Introducing the Platform API</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>

          {/* The chip row used to sit here, between the badge and the headline.
              Two eyebrow elements stacked before the first line of real content
              read as throat-clearing, and pushed the headline down far enough
              that the stats fell out of the fold. It now sits under the CTAs,
              where it supports the claim instead of delaying it. */}
          <h1 className="word-rise mt-5 text-[1.625rem] font-medium leading-[1.14] tracking-display sm:mt-6 sm:text-[2.125rem] lg:text-[2.1rem] xl:text-[2.45rem]">
            <Words text="Cookieless web analytics" />{" "}
            <Words text="that counts the" offset={3} />{" "}
            <span
              className="underline-sketch text-accent"
              style={{ ["--i" as string]: 6 }}
            >
              half
            </span>{" "}
            <Words text="others miss." offset={7} />
          </h1>

          <p className="rise rise-3 mx-auto mt-4 max-w-xl text-pretty text-[0.875rem] leading-relaxed sm:mt-5 sm:text-[0.9375rem] text-fg-muted lg:mx-0 lg:text-[0.9375rem]">
            A privacy-first Google Analytics alternative with real-time
            dashboards, built-in SEO audits and an embeddable API. Cookie-based
            tools only measure the visitors who accept the banner — Quantalog
            sets no cookies and stores no personal data, so there is no banner
            to decline and nothing to miss.
          </p>

          <div className="rise rise-4 mt-6 flex flex-row flex-wrap items-center justify-center gap-2.5 sm:mt-8 sm:gap-3 lg:justify-start">
            <Button
              href={`${site.app}/signup`}
              size="lg"
              className="group sheen"
              track="cta_start_free"
              trackProps={{ location: "hero" }}
            >
              Start free — no card
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>

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

          <div className="rise rise-5 mt-7 sm:mt-8">
            <TrustChips />
          </div>

          {/* Stats sit directly under the chips with a hairline above rather
              than floating in whitespace: the four claims and the four numbers
              proving them are one block, and reading as one is the point. */}
          <ul className="mx-auto mt-7 grid max-w-2xl grid-cols-2 gap-y-5 border-t border-hairline pt-6 sm:mt-8 sm:grid-cols-4 sm:gap-y-7 lg:mx-0">
            {trustPoints.map((point, i) => (
              <li
                key={point.label}
                className={`stat-in text-center sm:border-l sm:border-border sm:first:border-l-0 ${
                  i % 2 === 1 ? "border-l border-border sm:border-l" : ""
                }`}
                style={{ animationDelay: `${0.45 + i * 0.08}s` }}
              >
                <p className="text-xl font-medium leading-none tracking-display tabular-nums sm:text-[1.75rem]">
                  {point.value}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-eyebrow text-fg-faint">
                  {point.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden w-full min-w-0 flex-1 sm:block">
          <HeroFlowLazy className="h-[380px] w-full lg:h-[520px]" />
          <p className="mt-2 text-center text-[11px] text-fg-faint">
            Drag any node — this is the whole pipeline.
          </p>
        </div>

        <div className="w-full sm:hidden">
          <HeroFlowLazy compact />
          <p className="mt-2 text-center text-[11px] text-fg-faint">
            The whole pipeline — one script tag in, three surfaces out.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}
