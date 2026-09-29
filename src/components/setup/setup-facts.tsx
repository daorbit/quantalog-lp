import { BigStats } from "../big-stats";
import { setupFacts } from "./setup-steps";

export function SetupFacts() {
  return <BigStats stats={setupFacts} />;
}
