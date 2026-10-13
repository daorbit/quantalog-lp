import { SidePanel } from "./extension/side-panel";

export function OrbitExtensionPreview() {
  return (
    <div className="data-stage mx-auto w-full max-w-md" aria-hidden="true">
      <SidePanel />
    </div>
  );
}
