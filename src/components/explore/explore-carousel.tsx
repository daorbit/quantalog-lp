"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { exploreItems } from "./explore-items";
import { ExploreCard } from "./explore-card";
import { useAutoScroll } from "../use-auto-scroll";

const loop = [...exploreItems, ...exploreItems];

export function ExploreCarousel() {
  const { ref, step } = useAutoScroll<HTMLUListElement>({ speed: 32 });

  return (
    <div>
      <ul ref={ref} className="gallery" aria-label="Product pages">
        {loop.map((item, i) => {
          const copy = i >= exploreItems.length;
          return (
            <li key={`${item.href}-${i}`} aria-hidden={copy || undefined}>
              <ExploreCard item={item} focusable={!copy} />
            </li>
          );
        })}
      </ul>

      <div className="mx-auto mt-4 flex max-w-6xl justify-end gap-3 px-4 sm:px-6">
        {([-1, 1] as const).map((dir) => {
          const Icon = dir === -1 ? ChevronLeft : ChevronRight;
          return (
            <button
              key={dir}
              type="button"
              onClick={() => step(dir)}
              aria-label={dir === -1 ? "Previous" : "Next"}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-subtle text-fg ring-1 ring-inset ring-hairline transition-colors duration-200 hover:bg-border dark:bg-surface-raised"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
