import { DataShowcase } from "../showcase/data-showcase";
import { FunnelShape } from "../funnel/funnel-shape";
import { funnelRows } from "../funnel/funnel-data";

export function Funnels() {
  const rows = funnelRows();
  const last = rows[rows.length - 1];
  const worst = rows.slice(1).reduce((a, b) => (b.drop > a.drop ? b : a));

  return (
    <DataShowcase
      eyebrow="Funnels"
      title="Find the step where people give up."
      body="Build a funnel from any pages or events and see exactly what each step costs you."
      pill="Signup funnel · last 30 days"
      scroll
      stats={[
        { label: "Steps", value: String(rows.length) },
        { label: "Converted", value: `${last.rate}%` },
        { label: "Biggest drop", value: `−${worst.drop}%` },
      ]}
    >
      <FunnelShape />
    </DataShowcase>
  );
}
