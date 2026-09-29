import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "../ui";
import { Words } from "../words";
import { HeroFlowLazy } from "../hero-flow-lazy";
import { TrustChips } from "../trust-chips";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative mx-auto max-w-360 px-4 pb-16 pt-12 sm:px-5 sm:pb-24 sm:pt-20 lg:px-6">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-8">
          <div className="w-full text-center lg:w-[44%] lg:shrink-0 lg:text-left">
            <a
              href="/platform-api"
              className="rise rise-1 group inline-flex h-7 items-center gap-2 rounded-full border border-border-warm bg-surface py-1 pl-1 pr-3 text-[12px] font-medium text-fg-muted transition-colors duration-200 hover:border-border-strong hover:text-fg"
            >
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                New
              </span>
              Introducing the Platform API
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            <h1 className="word-rise mt-7 text-[2.125rem] font-medium leading-[1.02] tracking-display sm:text-[2.75rem] lg:text-[2.875rem] xl:text-[3.375rem]">
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

            <p className="rise rise-3 mx-auto mt-6 max-w-xl text-pretty text-[1rem] leading-normal text-fg-muted sm:text-[1.125rem] lg:mx-0">
              A privacy-first Google Analytics alternative with real-time
              dashboards, built-in SEO audits and an embeddable API — plus
              Orbit, an AI assistant that explains what changed. No cookies, no
              banner, nothing to miss.
            </p>

            <div className="rise rise-4 mt-8 flex flex-row flex-wrap items-center justify-center gap-3 lg:justify-start">
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

            <div className="rise rise-5 mt-8">
              <TrustChips />
            </div>
          </div>

          <div className="hidden w-full min-w-0 flex-1 sm:block">
            <HeroFlowLazy className="h-[380px] w-full lg:h-[520px]" />
            <p className="mt-2 text-center text-[12px] text-fg-faint">
              Drag any node — this is the whole pipeline.
            </p>
          </div>

          <div className="w-full sm:hidden">
            <HeroFlowLazy compact />
            <p className="mt-2 text-center text-[12px] text-fg-faint">
              The whole pipeline — one script tag in, three surfaces out.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
