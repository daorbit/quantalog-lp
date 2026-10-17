"use client";

import { useEffect, useRef } from "react";

export function EmbeddedForm({
  src,
  title,
  eager = false,
  className = "rounded-lg",
}: {
  src: string;
  title: string;
  eager?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const frame = ref.current;
      if (!frame || e.source !== frame.contentWindow) return;
      if (e.data?.type === "da-forms:height") frame.style.height = `${e.data.height}px`;
      if (e.data?.type === "da-forms:ready") {
        frame.contentWindow?.postMessage(
          { type: "da-forms:context", page: window.location.href, referrer: document.referrer },
          "*",
        );
      }
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
      className={`w-full border-none ${className}`}
      style={{ height: 630, overflow: "hidden" }}
      loading={eager ? "eager" : "lazy"}
    />
  );
}
