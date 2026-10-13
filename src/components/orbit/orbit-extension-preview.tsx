import { Lock } from "lucide-react";
import { stageStyle } from "@/lib/stage";
import { OrbitMark } from "./orbit-mark";
import { PageMock } from "./extension/page-mock";
import { ShortcutKeys } from "./extension/shortcut-keys";
import { PREVIEW_HOST, SidePanel } from "./extension/side-panel";

export function OrbitExtensionPreview() {
  return (
    <div className="data-stage" aria-hidden="true">
      <div className="orbit-window stage-item" style={stageStyle({ fromY: "24px", fromScale: 0.98 })}>
        <div className="flex items-center gap-3 border-b border-border bg-bg-subtle px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[11.5px] text-fg-muted ring-1 ring-border">
            <Lock className="h-3 w-3 shrink-0" />
            <span className="truncate">{PREVIEW_HOST}/pricing</span>
          </div>
          <span className="orbit-ext-icon grid h-7 w-7 place-items-center rounded-md">
            <OrbitMark size={15} />
          </span>
        </div>

        <div className="relative flex min-h-104">
          <PageMock />
          <ShortcutKeys />
          <SidePanel />
        </div>
      </div>
    </div>
  );
}
