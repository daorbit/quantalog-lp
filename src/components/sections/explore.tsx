import { TileSection } from "../explore/tile-section";
import { measureItems } from "../explore/explore-items";

export function Explore() {
  return (
    <TileSection
      id="features"
      eyebrow="Platform"
      title="See every visit. Keep every lead."
      body="Live analytics, forms that show where people drop off, the source behind every lead, reports that reach the right people, and the SEO to bring more of them in."
      items={measureItems}
    />
  );
}
