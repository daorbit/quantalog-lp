"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

export type FlowEdge = { id: string; from: string; to: string };

export type FlowPath = { id: string; d: string; target: string };

function anchor(root: HTMLElement, id: string) {
  const el = root.querySelector<HTMLElement>(`[data-node="${id}"]`);
  if (!el) return null;
  return { left: el.offsetLeft, right: el.offsetLeft + el.offsetWidth, mid: el.offsetTop + el.offsetHeight / 2 };
}

function curve(x1: number, y1: number, x2: number, y2: number): string {
  const bend = Math.max(24, (x2 - x1) * 0.55);
  return `M${x1} ${y1} C${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
}

export function useFlowPaths(ref: RefObject<HTMLElement | null>, edges: FlowEdge[]) {
  const [paths, setPaths] = useState<FlowPath[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const measure = () => {
      const next: FlowPath[] = [];
      for (const edge of edges) {
        const a = anchor(root, edge.from);
        const b = anchor(root, edge.to);
        if (!a || !b || b.left <= a.right) continue;
        next.push({ id: edge.id, d: curve(a.right, a.mid, b.left, b.mid), target: edge.to });
      }
      setPaths(next);
      setSize({ width: root.offsetWidth, height: root.offsetHeight });
    };

    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [ref, edges]);

  return { paths, size };
}
