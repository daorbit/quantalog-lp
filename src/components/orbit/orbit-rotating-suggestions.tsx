"use client";

import { useState } from "react";
import { OrbitSuggestion } from "./orbit-suggestion";
import { SUGGESTION_ROTATE_MS, SUGGESTIONS_PER_SET } from "./orbit-home-data";
import { useRotatingSet } from "./use-rotating-set";

export function OrbitRotatingSuggestions({
  questions,
  onPick,
}: {
  questions: string[];
  onPick: (q: string) => void;
}) {
  const [paused, setPaused] = useState(false);
  const { visible, page, pages, setPage } = useRotatingSet(
    questions,
    SUGGESTIONS_PER_SET,
    SUGGESTION_ROTATE_MS,
    paused,
  );

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div key={page} className="orbit-rotate space-y-2">
        {visible.map((q) => (
          <OrbitSuggestion key={q} question={q} onPick={onPick} />
        ))}
      </div>

      {pages > 1 && (
        <div className="orbit-dots" role="group" aria-label="More suggestions">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className="orbit-dot"
              aria-label={`Show suggestion set ${i + 1}`}
              aria-current={i === page || undefined}
              onClick={() => setPage(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
