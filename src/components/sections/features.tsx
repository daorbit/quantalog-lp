import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui";
import { FeaturesShowcase } from "../features/features-showcase";

export function Features() {
  return (
    <section id="features">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="The product"
          title="One place for every number that matters."
          body="Analytics, SEO, AI and reporting built on the same data, so nothing has to be copied between tools."
          className="v-rise"
        />

        <div className="v-rise v-d2 mt-12 sm:mt-14">
          <FeaturesShowcase />
        </div>

        <p className="mt-14 text-center text-[14px] text-fg-muted">
          Funnels, retention cohorts, segments and webhooks too.{" "}
          <Link
            href="/docs"
            className="group inline-flex items-center gap-1 font-medium text-fg hover:text-fg-muted"
          >
            See everything in the docs
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </p>
      </div>
    </section>
  );
}
