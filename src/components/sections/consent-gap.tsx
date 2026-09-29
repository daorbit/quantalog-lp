import { Cookie, ShieldCheck } from "lucide-react";
import { ConsentTile } from "../consent/consent-tile";
import { ConsentFacts } from "../consent/consent-facts";

const LOST = [1, 3, 6, 8, 10, 13, 15, 16, 19];

export function ConsentGap() {
  return (
    <section id="consent-gap">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28 lg:py-36">
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

        <div className="mt-10 grid gap-2 sm:mt-16 lg:grid-cols-2">
          <div className="v-rise v-d1">
            <ConsentTile
              tone="slate"
              label="Cookie-based analytics"
              title="Counts only who clicks Accept."
              lost={LOST}
              legend
              caption="of visitors recorded. Decline, ignore the banner or block the script, and you disappear."
              badge={
                <div className="inline-flex items-center gap-3 rounded-full bg-surface py-1.5 pl-4 pr-1.5 text-[13px] text-fg shadow-soft ring-1 ring-border dark:bg-bg-subtle">
                  <Cookie className="h-4 w-4 text-accent" aria-hidden="true" />
                  Accept cookies?
                  <span className="rounded-full px-3 py-1 font-medium ring-1 ring-border-strong">Decline</span>
                  <span className="rounded-full bg-cta px-3 py-1 font-medium text-cta-fg">Accept</span>
                </div>
              }
            />
          </div>
          <div className="v-rise v-d2">
            <ConsentTile
              tone="teal"
              label="Quantalog"
              title="Counts every visitor."
              lost={[]}
              caption="of visitors recorded. Nothing is written to the browser, so nobody is asked and nobody goes missing."
              badge={
                <div className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-[13px] font-medium text-fg shadow-soft ring-1 ring-border dark:bg-bg-subtle">
                  <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
                  No banner. Nothing to accept.
                </div>
              }
            />
          </div>
        </div>

        <div className="mt-12 sm:mt-24">
          <ConsentFacts />
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-[12px] sm:mt-16 leading-relaxed text-fg-faint">
          Consent rates vary widely by region and audience; published figures
          commonly land between 40% and 80%. The exact number matters less than
          the fact that one of these tools is guessing and the other is not.
        </p>
      </div>
    </section>
  );
}
