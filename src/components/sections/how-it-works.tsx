import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SetupFacts } from "../setup/setup-facts";
import { SetupStepTile } from "../setup/setup-step-tile";
import { LiveVisual, SiteVisual, TagVisual } from "../setup/setup-visuals";
import { steps } from "../setup/setup-steps";

const visuals = [SiteVisual, TagVisual, LiveVisual];

export function HowItWorks() {
  return (
    <section id="setup">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28 lg:py-32">
        <div className="v-rise mx-auto max-w-3xl text-center">
          <p className="text-[15px] font-semibold text-accent sm:text-[17px]">Setup</p>
          <h2 className="mt-3 text-balance text-display font-medium leading-[1.02] tracking-display">
            Three steps.
            <br />
            Roughly two minutes.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">
            No SDK to install, no build step to change, no cookie policy to rewrite.
          </p>
        </div>

        <ol className="mt-10 grid gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-3">
          {steps.map((s, i) => {
            const Visual = visuals[i];
            return (
              <li key={s.n} className={`v-rise v-d${i + 1}`}>
                <SetupStepTile n={s.n} title={s.title} body={s.body}>
                  <Visual />
                </SetupStepTile>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 text-center">
          <Link
            href="/docs/tracking"
            className="group inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
          >
            Read the install guide
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-14 border-t border-border pt-10 sm:mt-20 sm:pt-14">
          <SetupFacts />
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-[12px] leading-relaxed text-fg-faint sm:mt-16">
          The tracker patches history.pushState, so single-page apps built with React, Next.js or
          Vue report route changes on their own.
        </p>
      </div>
    </section>
  );
}
