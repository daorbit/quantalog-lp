import { TileSection } from "../explore/tile-section";
import { measureItems } from "../explore/explore-items";

export function Explore() {
  return (
    <TileSection
      id="features"
      eyebrow="Platform"
      title="See every visit. Keep every lead."
      body="Live analytics, forms that show where people drop off, and reports that reach the people who need them."
      items={measureItems}
    />
  );
}
