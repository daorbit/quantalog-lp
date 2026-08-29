import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "../ui";
import { Words } from "../words";
import { HeroFlow } from "../hero-flow";
import { TrustChips } from "../trust-chips";

/* Each claim is a number a visitor can check, not an adjective. */
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
        {/* The copy column is the narrower of the two: it is text, so it stops
            being readable past a certain measure, while the diagram only gets
            better with the room. */}
        <div className="w-full text-center lg:w-[42%] lg:shrink-0 lg:text-left">
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

          {/* Above the headline rather than below it: these are the facts that
              decide whether the claim in the H1 is worth reading, and a reader
              who needs them needs them first. */}
          <div className="rise rise-2 mt-5 sm:mt-7">
            <TrustChips />
          </div>

      
          <h1 className="word-rise mt-6 text-[1.625rem] font-medium leading-[1.18] tracking-[-0.03em] sm:mt-8 sm:text-[2.125rem] lg:text-[2rem] xl:text-[2.35rem]">
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

          <p className="rise rise-3 mx-auto mt-4 max-w-xl text-pretty text-[0.875rem] leading-relaxed sm:mt-6 sm:text-[0.9375rem] text-fg-muted lg:mx-0 lg:text-[0.9375rem]">
            A privacy-first Google Analytics alternative with real-time
            dashboards, built-in SEO audits and an embeddable API. Cookie-based
            tools only measure the visitors who accept the banner — Quantalog
            sets no cookies and stores no personal data, so there is no banner
            to decline and nothing to miss.
          </p>

          {/* Side by side at every width, sized to their labels. Stacked and
              stretched edge to edge, the pair read as two slabs rather than a
              choice between two actions. */}
          <div className="rise rise-4 mt-6 flex flex-row flex-wrap items-center justify-center gap-2.5 sm:mt-10 sm:gap-3 lg:justify-start">
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
          <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-y-5 sm:mt-14 sm:gap-y-7 sm:grid-cols-4 lg:mx-0">
            {trustPoints.map((point, i) => (
              <li
                key={point.label}
                className={`stat-in text-center sm:border-l sm:border-border sm:first:border-l-0 ${
                  i % 2 === 1 ? "border-l border-border sm:border-l" : ""
                }`}
                style={{ animationDelay: `${0.45 + i * 0.08}s` }}
              >
                <p className="text-xl font-medium leading-none tracking-[-0.04em] tabular-nums sm:text-[1.75rem]">
                  {point.value}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-fg-faint">
                  {point.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

     
        <div className="hidden w-full min-w-0 flex-1 sm:block">
          <HeroFlow />
          <p className="mt-2 text-center text-[11px] text-fg-faint">
            Drag any node — this is the whole pipeline.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}
