import type { ExoticComponent } from "react";
import type {} from "react/canary";

declare module "react" {
  export const unstable_ViewTransition: ExoticComponent<ViewTransitionProps>;
}
