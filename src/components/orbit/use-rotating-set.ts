"use client";

import { useEffect, useState } from "react";

export function useRotatingSet<T>(items: T[], size: number, interval: number, paused: boolean) {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const [page, setPage] = useState(() => Math.floor(Math.random() * pages));

  useEffect(() => {
    if (paused || pages < 2) return;
    const id = window.setInterval(() => setPage((p) => (p + 1) % pages), interval);
    return () => window.clearInterval(id);
  }, [paused, pages, interval, page]);

  const current = page % pages;
  const visible = Array.from(
    { length: Math.min(size, items.length) },
    (_, i) => items[(current * size + i) % items.length],
  );

  return { visible, page: current, pages, setPage };
}
