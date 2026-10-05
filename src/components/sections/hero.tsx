import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Button } from "../ui";
import { Words } from "../words";
import { BookDemoButton } from "../book-demo-button";
import { ProviderSignup } from "../provider-signup";
import { HeroVisual } from "../hero-visual";
import { TrustChips } from "../trust-chips";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-360 px-4 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-20 xl:pt-24">
        <div className="grid items-center gap-14 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center xl:mx-0 xl:items-start xl:text-left">
            <Link
              href="/platform-api"
              className="rise rise-1 group inline-flex items-center gap-2.5 rounded-full border border-border py-1 pl-1 pr-3 text-[13px] text-fg-muted transition-colors duration-200 hover:border-border-strong hover:text-fg"
            >
              <span className="rounded-full bg-accent/12 px-2 py-0.5 text-[11px] font-semibold text-accent">New</span>
              Introducing the Platform API
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>

            <h1 className="word-rise mt-8 text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-[3.5rem] xl:text-[3.25rem] 2xl:text-[3.75rem]">
              <Words text="Cookieless analytics" />{" "}
              <br className="hidden sm:block" />
              <Words text="that counts the" offset={2} />{" "}
              <span className="text-accent" style={{ ["--i" as string]: 5 }}>
                half
              </span>{" "}
              <br className="hidden sm:block" />
              <Words text="others miss." offset={6} />
            </h1>

            <p className="rise rise-3 mt-7 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-fg-muted sm:text-[1.1875rem]">
              Real-time dashboards, SEO audits and AI insights in one place.
              No cookies. No consent banner.
            </p>

            <div className="rise rise-4 mt-9 flex flex-wrap items-center justify-center gap-3 xl:justify-start">
              <Button
                href={`${site.app}/signup`}
                size="lg"
                track="cta_start_free"
                trackProps={{ location: "hero" }}
              >
                Start free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <BookDemoButton location="hero" />
            </div>

            <ProviderSignup location="hero" variant="buttons" className="rise rise-5 mt-10 max-w-lg" />

            <TrustChips className="rise rise-5 mt-10 justify-center xl:justify-start" />
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
