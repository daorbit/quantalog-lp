import { TileSection } from "../explore/tile-section";
import { aiItems } from "../explore/explore-items";
import { AiAssistants } from "./ai-assistants";

export function OrbitAi() {
  return (
    <TileSection
      id="orbit-ai"
      eyebrow="Orbit AI & API"
      title="An assistant on every tab. An API for your product."
      body="Ask Orbit in the dashboard or from Chrome's side panel, let it draft and schedule your social posts, connect Claude or ChatGPT, and build Quantalog analytics into the product you sell."
      items={aiItems}
    >
      <AiAssistants />
    </TileSection>
  );
}
