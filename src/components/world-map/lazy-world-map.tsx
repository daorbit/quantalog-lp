"use client";

import { useEffect, useState } from "react";
import { useInView } from "../use-in-view";

const WORLD_MAP_SRC = "/world-map.svg";

export function LazyWorldMap() {
  const { ref, inView } = useInView<HTMLDivElement>(0);
  const [markup, setMarkup] = useState<string | null>(null);

  useEffect(() => {
    if (!inView || markup) return;
    const controller = new AbortController();
    fetch(WORLD_MAP_SRC, { signal: controller.signal })
      .then((res) => (res.ok ? res.text() : null))
      .then((text) => text && setMarkup(text))
      .catch(() => {});
    return () => controller.abort();
  }, [inView, markup]);

  return (
    <div
      ref={ref}
      className="world-map-slot"
      dangerouslySetInnerHTML={markup ? { __html: markup } : undefined}
    />
  );
}
