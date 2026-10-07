import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { ExploreTile } from "../explore/explore-tile";
import { dashboardItems } from "../dashboards/dashboard-items";
import { site } from "@/lib/site";

export function DashboardsGoals() {
  return (
    <section id="dashboards" className="py-14 sm:py-28">
      <div className="v-rise mx-auto max-w-3xl px-4 text-center">
        <p className="text-[15px] font-semibold text-accent sm:text-[17px]">Dashboards &amp; goals</p>
        <h2 className="mt-3 text-balance text-h2 font-medium leading-[1.06] tracking-display">
          Every number you care about, on one screen.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">
          Build focused dashboards for each job, set the targets you&apos;re working towards, and see
          at a glance whether you&apos;re on pace.
        </p>
      </div>

      <div className="mt-8 grid gap-2 sm:mt-16 lg:grid-cols-2">
        {dashboardItems.map((item, i) => (
          <div key={item.label} className={`v-rise ${i % 2 ? "v-d2" : "v-d1"}`}>
            <ExploreTile item={item} />
          </div>
        ))}
      </div>

      <div className="v-rise mt-10 flex flex-col items-center gap-4 px-4 text-center sm:mt-14">
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
    </section>
  );
}
