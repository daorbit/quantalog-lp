import { FeatureTile } from "../more/feature-tile";
import { MoreTile } from "../more/more-tile";
import { ShareVisual } from "../more/share-visual";
import { ReportVisual } from "../more/report-visual";
import { moreItems } from "../more/more-items";

export function MoreFeatures() {
  return (
    <section id="more">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28">
        <div className="v-rise mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-h2 font-medium leading-[1.06] tracking-display">
            And a lot more, built in.
          </h2>
          <p className="mt-4 text-pretty text-lead leading-normal text-fg-muted">
            The smaller things that would otherwise each be another tool, another
            login and another bill.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-16 sm:gap-4 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-4">
          <div className="v-rise sm:col-span-2 lg:row-span-2">
            <FeatureTile
              href="/docs/public-dashboards"
              label="Public dashboards"
              title="Give a client their numbers with a link."
              body="Publish a read-only view of a workspace that anyone can open — no account, no login. You choose which panels show."
            >
              <ShareVisual />
            </FeatureTile>
          </div>

          {moreItems.slice(0, 4).map((item, i) => (
            <div key={item.title} className={`v-rise v-d${i + 1}`}>
              <MoreTile item={item} />
            </div>
          ))}

          <div className="v-rise sm:col-span-2 lg:row-span-2 lg:col-start-3">
            <FeatureTile
              href="/reports"
              label="Reports"
              title="The numbers, delivered to people who never log in."
              body="Headline numbers, an SEO summary and a spreadsheet of the detail — by email or WhatsApp, on the schedule you choose."
            >
              <ReportVisual />
            </FeatureTile>
          </div>

          {moreItems.slice(4).map((item, i) => (
            <div key={item.title} className={`v-rise v-d${i + 1}`}>
              <MoreTile item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
