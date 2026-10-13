"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LiveVisual, SiteVisual, TagVisual } from "./setup-visuals";
import { steps } from "./setup-steps";

const visuals = [SiteVisual, TagVisual, LiveVisual];

export function SetupStepper() {
  const [active, setActive] = useState(0);
  const Visual = visuals[active];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
      <div>
        <ol className="setup-steps">
          {steps.map((s, i) => (
            <li key={s.n}>
              <button
                type="button"
                className="setup-step"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
              >
                <span className="setup-step-num">0{s.n}</span>
                <span className="min-w-0">
                  <span className="block text-[1.25rem] font-semibold tracking-[-0.02em] sm:text-[1.375rem]">{s.title}</span>
                  <span className="setup-step-body">
                    <span className="min-h-0 overflow-hidden">{s.body}</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <Link href="/docs/tracking" className="mt-8 inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4">
          Read the install guide
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="setup-panel">
        <div key={active} className="setup-panel-inner">
          <Visual />
        </div>
      </div>
    </div>
  );
}
