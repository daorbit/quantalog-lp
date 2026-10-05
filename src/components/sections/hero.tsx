import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "../ui";
import { Words } from "../words";
import { TrustChips } from "../trust-chips";
import { BookDemoButton } from "../book-demo-button";
import { ProviderSignup } from "../provider-signup";
import { HeroWindow } from "../hero-window";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="hero-backdrop" aria-hidden="true" />

      <div className="mx-auto max-w-360 px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-24 lg:pt-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <a
            href="/platform-api"
            className="rise rise-1 group inline-flex h-8 items-center gap-2 rounded-full border border-border bg-surface/80 py-1 pl-1 pr-3.5 text-[12.5px] font-medium text-fg-muted shadow-soft backdrop-blur transition-colors duration-200 hover:border-border-strong hover:text-fg"
          >
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
              New
            </span>
            Introducing the Platform API
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </a>

          <h1 className="word-rise mt-8 text-balance text-[2.375rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[4.75rem]">
            <Words text="Cookieless web analytics" />
            <br className="hidden sm:block" />{" "}
            <Words text="that counts the" offset={3} />{" "}
            <span className="underline-sketch text-accent" style={{ ["--i" as string]: 6 }}>
              half
            </span>{" "}
            <Words text="others miss." offset={7} />
          </h1>

          <p className="rise rise-3 mt-7 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-fg-muted sm:text-[1.25rem]">
            Real-time dashboards, built-in SEO audits and an embeddable API — with
            Orbit AI to explain what changed. No cookies, no banner, nothing to miss.
          </p>

          <div className="rise rise-4 mt-10 flex flex-wrap items-center justify-center gap-3">
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
            <BookDemoButton location="hero" />
          </div>

          <ProviderSignup location="hero" className="rise rise-5 mt-9" />

          <div className="rise rise-5 mt-10">
            <TrustChips className="justify-center" />
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <HeroWindow />
        </div>
      </div>
    </section>
  );
}
