import { HeroFlowLazy } from "./hero-flow-lazy";

export function HeroVisual() {
  return (
    <div className="hero-visual w-full min-w-0">
      <div className="hidden sm:block">
        <HeroFlowLazy className="h-110 w-full xl:h-140" />
      </div>
      <div className="sm:hidden">
        <HeroFlowLazy compact className="h-[300px] w-full" />
      </div>
    </div>
  );
}
