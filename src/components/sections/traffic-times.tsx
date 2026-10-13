import { DataShowcase } from "../showcase/data-showcase";
import { TrafficHeatmap } from "../traffic-heatmap/traffic-heatmap";
import { DAYS, heatPeak, weekdayShare } from "../traffic-heatmap/heatmap-data";

export function TrafficTimes() {
  const peak = heatPeak();

  return (
    <DataShowcase
      eyebrow="Timing"
      title="Know exactly when your visitors show up."
      body="Every hour of every weekday, so you can ship, post and send email when people are actually there."
      pill="Visits by weekday and hour"
      scroll
      stats={[
        { label: "Peak hour", value: `${String(peak.hour).padStart(2, "0")}:00` },
        { label: "Busiest day", value: DAYS[peak.day] },
        { label: "On weekdays", value: `${Math.round(weekdayShare() * 100)}%` },
      ]}
    >
      <TrafficHeatmap />
    </DataShowcase>
  );
}
