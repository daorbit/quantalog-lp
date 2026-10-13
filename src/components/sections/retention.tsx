import { DataShowcase } from "../showcase/data-showcase";
import { RetentionGrid } from "../retention/retention-grid";
import { retentionStats } from "../retention/retention-data";

export function Retention() {
  const { average, best, cohorts } = retentionStats();

  return (
    <DataShowcase
      eyebrow="Retention"
      title="See who comes back, week after week."
      body="Weekly cohorts show whether last month's visitors are still coming back today."
      pill="Weekly cohorts · last 8 weeks"
      scroll
      stats={[
        { label: "Cohorts", value: String(cohorts) },
        { label: "Back in week 1", value: `${average}%` },
        { label: "Stickiest cohort", value: best },
      ]}
    >
      <RetentionGrid />
    </DataShowcase>
  );
}
