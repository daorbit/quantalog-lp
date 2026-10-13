import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { TileSection } from "../explore/tile-section";
import { dashboardItems } from "../dashboards/dashboard-items";
import { site } from "@/lib/site";

export function DashboardsGoals() {
  return (
    <TileSection
      id="dashboards"
      eyebrow="Dashboards & goals"
      title="Every number you care about, on one screen."
      body="Build focused dashboards for each job, set the targets you’re working towards, and see at a glance whether you’re on pace."
      items={dashboardItems}
    >
      <div className="mt-10 flex flex-col items-center gap-4 px-4 text-center sm:mt-14">
        <p className="text-[15px] text-fg-muted">Free to start. No card needed.</p>
        <Button href={`${site.app}/signup`} track="cta_start_free" trackProps={{ location: "dashboards" }}>
          Build your first dashboard
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </TileSection>
  );
}
