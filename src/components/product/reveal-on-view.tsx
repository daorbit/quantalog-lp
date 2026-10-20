"use client";

import type { ReactNode } from "react";
import { useInView } from "../use-in-view";

export function RevealOnView({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25, true);

  return (
    <div ref={ref} className={className}>
      {inView && children}
    </div>
  );
}
