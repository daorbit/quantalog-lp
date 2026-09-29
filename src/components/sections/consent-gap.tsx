import { ConsentShowcase } from "../consent/consent-showcase";
import { ConsentFacts } from "../consent/consent-facts";

export function ConsentGap() {
  return (
    <section id="consent-gap">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
        <div className="v-rise mx-auto max-w-3xl text-center">
          <p className="text-[15px] font-semibold text-accent sm:text-[17px]">The consent gap</p>
          <h2 className="mt-3 text-balance text-display font-medium leading-[1.02] tracking-display">
            Half your traffic never makes it into the report.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">
            Cookie-based analytics need permission before they record anything.
            The people who say no aren&apos;t random — they&apos;re the
            privacy-conscious, technical audience most products care about.
          </p>
        </div>

        <div className="v-rise v-d2 mt-14 sm:mt-20">
          <ConsentShowcase />
        </div>

        <div className="mt-16 sm:mt-24">
          <ConsentFacts />
        </div>

        <p className="mx-auto mt-16 max-w-2xl text-center text-[12px] leading-relaxed text-fg-faint">
          Consent rates vary widely by region and audience; published figures
          commonly land between 40% and 80%. The exact number matters less than
          the fact that one of these tools is guessing and the other is not.
        </p>
      </div>
    </section>
  );
}
