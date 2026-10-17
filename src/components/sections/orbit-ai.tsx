import { TileSection } from "../explore/tile-section";
import { aiItems } from "../explore/explore-items";

export function OrbitAi() {
  return (
    <TileSection
      id="orbit-ai"
      eyebrow="Orbit AI & API"
      title="An assistant on every tab. An API for your product."
      body="Ask Orbit in the dashboard or from Chrome's side panel, let it draft and schedule your social posts, and build Quantalog analytics into the product you sell."
      items={aiItems}
    />
  );
}
