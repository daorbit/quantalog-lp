import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  progress: number;
  ratio: number;
  atStart: boolean;
  atEnd: boolean;
  onPrev: () => void;
  onNext: () => void;
};

const arrow =
  "grid h-10 w-10 place-items-center rounded-full bg-surface text-fg ring-1 ring-inset ring-border transition-colors duration-200 hover:bg-bg-subtle disabled:cursor-default disabled:opacity-35 disabled:hover:bg-surface dark:bg-surface-raised";

export function ShelfControls({ progress, ratio, atStart, atEnd, onPrev, onNext }: Props) {
  if (atStart && atEnd) return null;

  const thumb = {
    "--thumb-width": `${Math.max(ratio * 100, 12)}%`,
    "--thumb-left": `${progress * (100 - Math.max(ratio * 100, 12))}%`,
  } as CSSProperties;

  return (
    <div className="mx-auto mt-8 flex max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-10">
      <div className="apps-progress" style={thumb} aria-hidden>
        <span className="apps-progress-thumb" />
      </div>
      <div className="flex shrink-0 items-center gap-2.5">
        <button type="button" onClick={onPrev} disabled={atStart} aria-label="Previous apps" className={arrow}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button type="button" onClick={onNext} disabled={atEnd} aria-label="More apps" className={arrow}>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
