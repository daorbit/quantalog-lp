"use client";

import { useEffect, useState } from "react";

export function useAtTop(threshold = 4): boolean {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      setAtTop(window.scrollY <= threshold);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return atTop;
}
