import { ChartDivider } from "../chart-divider";
import { DashboardPreview } from "../dashboard-preview";
import { MockLabels } from "../mock-labels";

/* The product shot, on its own. It follows the hero's argument rather than
   belonging to it: the claims are made above, this is what they look like. */
export function DashboardShowcase() {
  return (
    <section className="relative isolate overflow-hidden mt-20">
      <div className="relative mx-auto max-w-[90rem] px-4 pb-16 sm:px-5 sm:pb-24 lg:px-6">
        <div className="relative">
          <MockLabels />
          <div className="rise rise-5 panel relative overflow-hidden">
            <DashboardPreview />
          </div>
        </div>
      </div>

      <ChartDivider variant="observed" filled className="-mb-px" />
    </section>
  );
}
