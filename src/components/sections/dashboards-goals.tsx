import { ArrowRight } from "lucide-react";
import { Button, SectionHeading } from "../ui";
import { ExploreTile } from "../explore/explore-tile";
import { dashboardItems } from "../dashboards/dashboard-items";
import { site } from "@/lib/site";

export function DashboardsGoals() {
  return (
    <section id="dashboards" className="section-y">
      <div className="px-4">
        <SectionHeading
          eyebrow="Dashboards & goals"
          title="Every number you care about, on one screen."
          body="Build focused dashboards for each job, set the targets you’re working towards, and see at a glance whether you’re on pace."
          centered
        />
      </div>

      <div className="mt-10 grid gap-3 px-3 sm:mt-16 sm:px-4 lg:grid-cols-2">
        {dashboardItems.map((item) => (
          <div key={item.label}>
            <ExploreTile item={item} />
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 px-4 text-center sm:mt-14">
        <p className="text-[15px] text-fg-muted">Free to start — no card needed.</p>
        <Button
          href={`${site.app}/signup`}
          track="cta_start_free"
          trackProps={{ location: "dashboards" }}
        >
          Build your first dashboard
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </section>
  );
}
