"use client";

import { useEffect, useRef } from "react";

export function EmbeddedForm({
  src,
  title,
  eager = false,
}: {
  src: string;
  title: string;

  eager?: boolean;
}) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type !== "da-forms:height") return;
      if (ref.current) ref.current.style.height = `${e.data.height}px`;
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      scrolling="no"
      className="w-full rounded-[8px] border-none"
      style={{ height: 630, overflow: "hidden" }}
      loading={eager ? "eager" : "lazy"}
    />
  );
}
