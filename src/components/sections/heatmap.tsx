import { DataShowcase } from "../showcase/data-showcase";
import { HeatmapView } from "../heatmap/heatmap-view";
import { DAYS, heatmapStats } from "../heatmap/heatmap-data";

const pad = (h: number) => `${String(h).padStart(2, "0")}:00`;

export function Heatmap() {
  const { peak, quiet, lift } = heatmapStats();

  return (
    <DataShowcase
      eyebrow="Heatmap"
      title="Know the hours your visitors show up."
      body="Every visit is placed on a weekday and hour grid, so you can see when to post, send the newsletter or ship a release."
      pill="Visitors by weekday and hour · last 30 days"
      stats={[
        { label: "Busiest hour", value: `${DAYS[peak.day]} ${pad(peak.hour)}` },
        { label: "Quietest hour", value: `${DAYS[quiet.day]} ${pad(quiet.hour)}` },
        { label: "Weekdays vs weekends", value: `+${lift}%` },
      ]}
    >
      <HeatmapView peak={peak} />
    </DataShowcase>
  );
}
