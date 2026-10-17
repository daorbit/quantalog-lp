import { TileSection } from "../explore/tile-section";
import { growItems } from "../explore/explore-items";

export function Grow() {
  return (
    <TileSection
      id="grow"
      eyebrow="Growth"
      title="Get found. Then keep showing up."
      body="Audits you can track over time, and Search Console inside your analytics."
      items={growItems}
    />
  );
}
