import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { AnnouncementPill } from "../announcement-pill";
import { Button } from "../ui";
import { Words } from "../words";
import { BookDemoButton } from "../book-demo-button";
import { ProviderSignup } from "../provider-signup";
import { TrustChips } from "../trust-chips";
import { HeroVisual } from "../hero-visual";
import { diwaliOffer, liveOffer } from "@/lib/offers";

const OFFER = liveOffer(diwaliOffer);

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto grid w-full max-w-360 items-center gap-10 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10 lg:py-20">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {OFFER ? (
            <AnnouncementPill
              href="#pricing"
              label="Offer"
              event="cta_offer_pill"
              external={false}
              className="rise rise-1"
            >
              {OFFER.title} · {OFFER.percent}% off
            </AnnouncementPill>
          ) : (
            <AnnouncementPill
              href="/invoicing"
              label="New"
              event="cta_invoicing_pill"
              external={false}
              className="rise rise-1"
            >
              Quotations and invoices are here
            </AnnouncementPill>
          )}

          <h1 className="word-rise mt-7 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[3.25rem] xl:text-[3.75rem]">
            <Words text="From first visit" />{" "}
            <Words text="to paid invoice." offset={3} />
          </h1>

          <p className="rise rise-3 mt-6 max-w-lg text-pretty text-[1.0625rem] leading-[1.6] text-fg-muted sm:text-[1.1875rem]">
            Cookieless analytics, lead forms, SEO, social posts and GST-ready invoicing in one workspace, with
            Orbit AI to help. No cookie banner.
          </p>

          <div className="rise rise-4 mt-9 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
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

          <ProviderSignup location="hero" align="responsiveLg" className="rise rise-5 mt-7" />

          <TrustChips className="rise rise-5 mt-10 justify-center lg:justify-start" />
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
