import { RotateCcw, X } from "lucide-react";
import { OrbitMark } from "./orbit-mark";

export function OrbitHeader({
  onReset,
  onClose,
}: {
  onReset: () => void;
  onClose: () => void;
}) {
  return (
    <header className="orbit-panel__header flex items-center justify-between border-b border-hairline px-4 py-3 sm:px-5">
      <div className="flex items-center gap-3">
        <OrbitMark size={32} />
        <span className="leading-tight">
          <span className="block text-[15px] font-semibold text-fg">Orbit AI</span>
          <span className="block text-[12px] text-fg-muted">Answers about Quantalog</span>
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          onClick={onReset}
          aria-label="Start over"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-subtle text-fg-muted transition-colors hover:bg-border hover:text-fg"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          onClick={onClose}
          aria-label="Close Orbit"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-subtle text-fg-muted transition-colors hover:bg-border hover:text-fg"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
