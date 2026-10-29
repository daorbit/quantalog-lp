import { Firework } from "./firework";
import { Lantern } from "./lantern";
import { StringLights } from "./string-lights";

export function DiwaliDecor() {
  return (
    <>
      <StringLights />
      <Firework tone="gold" delay={0} className="left-[1%] md:left-[15%]" />
      <Firework tone="rose" delay={2} className="right-[1%] md:right-[15%]" />
      <Firework tone="marigold" delay={1} className="right-[21%] hidden md:block" />
      <Firework tone="gold" delay={3} className="left-[21%] hidden md:block" />
      <Lantern tone="marigold" className="left-[3%] hidden md:block" />
      <Lantern tone="rose" size="sm" className="left-[8.5%] hidden lg:block" />
      <Lantern tone="rose" size="sm" className="right-[8.5%] hidden lg:block" />
      <Lantern tone="marigold" className="right-[3%] hidden md:block" />
    </>
  );
}
