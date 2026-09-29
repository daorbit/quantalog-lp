"use client";

import { useEffect, useRef, useState } from "react";
import { SegmentedControl } from "../segmented-control";
import { useInView } from "../use-in-view";
import { useCountTo } from "../use-count-to";
import { VisitorGrid } from "./visitor-grid";

const modes = [
  {
    id: "cookie",
    label: "Cookie-based analytics",
    pct: 55,
    title: "Only the people who click Accept.",
    body: "Everyone who declines, ignores the banner or runs a blocker simply disappears from your numbers.",
  },
  {
    id: "quantalog",
    label: "Quantalog",
    pct: 100,
    title: "Every visitor. No banner.",
    body: "Nothing is written to the browser, so there is nothing to accept — and nobody goes missing.",
  },
];

export function ConsentShowcase() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const [modeId, setModeId] = useState(modes[0].id);
  const touched = useRef(false);
  const mode = modes.find((m) => m.id === modeId) ?? modes[0];
  const pct = useCountTo(inView ? mode.pct : 0, 1100);

  useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(() => {
      if (!touched.current) setModeId("quantalog");
    }, 3200);
    return () => window.clearTimeout(id);
  }, [inView]);

  const select = (id: string) => {
    touched.current = true;
    setModeId(id);
  };

  const isQuantalog = mode.id === "quantalog";

  return (
    <div ref={ref} className="rounded-(--radius-stage) bg-bg-subtle px-5 py-10 ring-1 ring-inset ring-hairline sm:px-12 sm:py-14 lg:px-16">
      <SegmentedControl
        options={modes}
        value={modeId}
        onChange={select}
        label="Compare analytics"
        idPrefix="consent-tab"
        controls="consent-panel"
      />

      <div
        id="consent-panel"
        role="tabpanel"
        aria-labelledby={`consent-tab-${modeId}`}
        className="mt-10 grid items-center gap-12 sm:mt-14 lg:grid-cols-2 lg:gap-16"
      >
        <div className="text-center lg:text-left">
          <p
            className={`text-[5.5rem] font-semibold leading-none tracking-[-0.05em] tabular-nums transition-colors duration-500 sm:text-[8rem] ${
              isQuantalog ? "text-accent" : "text-fg"
            }`}
          >
            {pct}%
          </p>
          <p className="mt-3 text-[15px] text-fg-muted">of visitors recorded</p>

          <div key={mode.id} className="rise mt-8">
            <p className="text-[1.375rem] font-medium tracking-tight text-fg">{mode.title}</p>
            <p className="mx-auto mt-2 max-w-sm text-pretty text-[16px] leading-relaxed text-fg-muted lg:mx-0">
              {mode.body}
            </p>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <VisitorGrid active={inView} showLoss={!isQuantalog} />
        </div>
      </div>
    </div>
  );
}
