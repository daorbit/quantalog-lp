import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { ShowcaseTile } from "../dashboards/showcase-tile";
import { FactTile } from "../dashboards/fact-tile";
import { DashboardVisual } from "../dashboards/dashboard-visual";
import { GoalsVisual } from "../dashboards/goals-visual";
import { dashboardFacts } from "../dashboards/dashboard-facts";
import { site } from "@/lib/site";

export function DashboardsGoals() {
  return (
    <section id="dashboards">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28">
        <div className="v-rise mx-auto max-w-3xl text-center">
          <p className="text-[15px] font-semibold text-accent sm:text-[17px]">Dashboards &amp; goals</p>
          <h2 className="mt-3 text-balance text-h2 font-medium leading-[1.06] tracking-display">
            Every number you care about, on one screen.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">
            Build focused dashboards for each job, set the targets you&apos;re working towards, and see
            at a glance whether you&apos;re on pace.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-5">
          <div className="v-rise v-d1 lg:col-span-3">
            <ShowcaseTile
              label="Dashboards"
              title="A dashboard for every job, in a minute."
              body="Start from a template or a blank canvas, then move, resize and swap widgets. Mix site analytics with Google Search data on one grid."
            >
              <DashboardVisual />
            </ShowcaseTile>
          </div>
          <div className="v-rise v-d2 lg:col-span-2">
            <ShowcaseTile
              label="Goals"
              title="Set a target. Watch it fill."
              body="Monthly and quarterly targets for visitors, signups or conversions, with pace tracking that flags a miss before the month is over."
            >
              <GoalsVisual />
            </ShowcaseTile>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {dashboardFacts.map((fact, i) => (
            <div key={fact.title} className={`v-rise v-d${i + 1}`}>
              <FactTile fact={fact} />
            </div>
          ))}
        </div>

        <div className="v-rise mt-10 flex flex-col items-center gap-4 text-center sm:mt-12">
          <p className="text-[15px] text-fg-muted">Free to start — no card needed.</p>
          <Button
            href={`${site.app}/signup`}
            className="group"
            track="cta_start_free"
            trackProps={{ location: "dashboards" }}
          >
            Build your first dashboard
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
