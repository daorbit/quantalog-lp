import { HeroOverviewPanel } from "./hero-overview-panel";
import { HeroOrbitThread } from "./hero-orbit-thread";
import { HeroAgentLog } from "./hero-agent-log";

export function HeroShowcase() {
  return (
    <div
      className="mx-auto mt-16 grid w-full max-w-6xl gap-4 text-left sm:mt-20 lg:grid-cols-[minmax(0,1fr)_20rem]"
      aria-hidden="true"
    >
      <HeroOverviewPanel />
      <div className="hidden flex-col gap-4 lg:flex">
        <HeroOrbitThread />
        <HeroAgentLog />
      </div>
    </div>
  );
}
