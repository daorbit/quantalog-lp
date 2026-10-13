import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { AnnouncementPill } from "../announcement-pill";
import { Button } from "../ui";
import { Words } from "../words";
import { BookDemoButton } from "../book-demo-button";
import { ProviderSignup } from "../provider-signup";
import { TrustChips } from "../trust-chips";
import { HeroShowcase } from "../hero/hero-showcase";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto w-full max-w-360 px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <AnnouncementPill
            href={site.orbitExtension}
            label="New"
            event="cta_orbit_extension"
            className="rise rise-1"
          >
            Orbit AI is now on Chrome
          </AnnouncementPill>

          <h1 className="word-rise mt-8 text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-[4.25rem] lg:text-[5rem]">
            <Words text="Cookieless analytics" className="text-fg-faint" />{" "}
            <br className="hidden sm:block" />
            <Words text="that counts the" offset={2} />{" "}
            <span className="text-accent" style={{ ["--i" as string]: 5 }}>
              half
            </span>{" "}
            <Words text="others miss." offset={6} />
          </h1>

          <p className="rise rise-3 mt-7 max-w-2xl text-pretty text-[1.0625rem] leading-[1.55] text-fg-muted sm:text-[1.25rem]">
            Real-time dashboards, SEO audits and AI insights in one place.
            No cookies. No consent banner.
          </p>

          <div className="rise rise-4 mt-10 flex flex-wrap items-center justify-center gap-3">
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

          <ProviderSignup location="hero" className="rise rise-5 mt-7" />
        </div>

        <HeroShowcase />

        <TrustChips className="mt-10 justify-center" />
      </div>
    </section>
  );
}
