import { SectionHeading } from "../ui";
import { SetupFacts } from "../setup/setup-facts";
import { SetupStepper } from "../setup/setup-stepper";

export function HowItWorks() {
  return (
    <section id="setup">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
        <SectionHeading
          eyebrow="Setup"
          title={
            <>
              Three steps.
              <br />
              Roughly two minutes.
            </>
          }
          body="No SDK to install, no build step to change, no cookie policy to rewrite. Single-page apps report route changes on their own."
          centered
        />

        <div className="mt-12 sm:mt-16">
          <SetupStepper />
        </div>

        <div className="mt-10 border-t border-border pt-8 sm:mt-20 sm:pt-12">
          <SetupFacts />
        </div>
      </div>
    </section>
  );
}
