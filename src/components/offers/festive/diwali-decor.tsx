import { Lantern } from "./lantern";
import { StringLights } from "./string-lights";

export function DiwaliDecor() {
  return (
    <>
      <StringLights />
      <Lantern tone="marigold" className="left-[3%] hidden md:block" />
      <Lantern tone="rose" size="sm" className="left-[8.5%] hidden lg:block" />
      <Lantern tone="rose" size="sm" className="right-[8.5%] hidden lg:block" />
      <Lantern tone="marigold" className="right-[3%] hidden md:block" />
    </>
  );
}
