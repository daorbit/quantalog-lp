import { ArrowRight } from "lucide-react";
import { Button, Eyebrow } from "../ui";
import { ProviderSignup } from "../provider-signup";
import { BookDemoButton } from "../book-demo-button";
import { site } from "@/lib/site";
import { WHY_DESCRIPTION } from "./why-data";

export function WhyHero() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-28">
      <Eyebrow>Why Quantalog</Eyebrow>
      <h1 className="mt-4 text-balance text-display font-medium leading-[1.02] tracking-display">
        One workspace to understand,
        <br className="hidden sm:block" /> <span className="text-accent">win and keep customers.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">{WHY_DESCRIPTION}</p>
      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <BookDemoButton location="why_hero" variant="primary" />
        <Button
          href={`${site.app}/signup`}
          variant="secondary"
          size="lg"
          className="group"
          track="cta_start_free"
          trackProps={{ location: "why_hero" }}
        >
          Start free
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <ProviderSignup location="why_hero" className="mt-6" />
    </section>
  );
}
