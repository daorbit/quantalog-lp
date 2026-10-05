import { ArrowRight } from "lucide-react";
import { Button, Eyebrow } from "../ui";
import { ProviderSignup } from "../provider-signup";
import { site } from "@/lib/site";
import { ABOUT_DESCRIPTION } from "./about-data";

export function AboutHero() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-28">
      <div className="v-rise">
        <Eyebrow>About Quantalog</Eyebrow>
        <h1 className="mt-4 text-balance text-display font-medium leading-[1.02] tracking-display">
          Analytics that counts everyone.
          <br className="hidden sm:block" />{" "}
          <span className="text-accent">And follows no one.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">
          {ABOUT_DESCRIPTION}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            href={`${site.app}/signup`}
            size="lg"
            className="group"
            track="cta_start_free"
            trackProps={{ location: "about_hero" }}
          >
            Start free
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact us
          </Button>
        </div>
        <ProviderSignup location="about_hero" className="mt-6" />
      </div>
    </section>
  );
}
