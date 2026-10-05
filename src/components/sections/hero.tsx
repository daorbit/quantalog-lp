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
      <div className="mx-auto max-w-360 px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 xl:pt-28">
        <div className="grid items-center gap-16 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-14">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center xl:mx-0 xl:items-start xl:text-left">
            <Link
              href="/platform-api"
              className="rise rise-1 group inline-flex items-center gap-1 text-[14px] font-medium text-accent"
            >
              Introducing the Platform API
              <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>

            <h1 className="word-rise mt-6 text-balance text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-[3.5rem] xl:text-[4rem]">
              <Words text="Cookieless analytics" />{" "}
              <Words text="that counts the" offset={2} />{" "}
              <span className="text-accent" style={{ ["--i" as string]: 5 }}>
                half
              </span>{" "}
              <Words text="others miss." offset={6} />
            </h1>

            <p className="rise rise-3 mt-6 max-w-xl text-pretty text-[1.0625rem] leading-relaxed text-fg-muted sm:text-[1.1875rem]">
              Real-time dashboards, SEO audits and AI insights in one place.
              No cookies. No consent banner.
            </p>

            <div className="rise rise-4 mt-10 flex flex-wrap items-center justify-center gap-3 xl:justify-start">
              <Button
                href={`${site.app}/signup`}
                size="lg"
                className="group"
                track="cta_start_free"
                trackProps={{ location: "hero" }}
              >
                Start free
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
              <BookDemoButton location="hero" />
            </div>

            <ProviderSignup location="hero" align="responsive" className="rise rise-5 mt-7" />

            <div className="rise rise-5 mt-12 w-full border-t border-border pt-6">
              <TrustChips className="justify-center xl:justify-start" />
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
