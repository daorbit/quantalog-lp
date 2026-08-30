"use client";

import { useEffect, useRef } from "react";

/**
 * An iframe that grows or shrinks to match the embedded da-forms page's own
 * height, via the `da-forms:height` message it posts on every resize —
 * without this the iframe keeps a fixed height and either clips the form or
 * leaves dead space beneath a short one.
 */
export function EmbeddedForm({
  src,
  title,
  eager = false,
}: {
  src: string;
  title: string;
  /** Skip `loading="lazy"` when the form is the reason the page was opened —
   *  lazy only delays a fetch the visitor is already waiting on. */
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
