"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "../ui";

/**
 * The consent gap, shown rather than asserted.
 *
 * Two bars: what a cookie-based tool records versus what actually happened.
 * The numbers are illustrative of a well-known range, not a measurement of a
 * specific customer — the copy says so, because a made-up precise statistic is
 * the fastest way to lose a technical reader.
 */
const bars = [
  {
    label: "Cookie-based analytics",
    caption: "Only visitors who accept the banner",
    pct: 55,
    tone: "muted" as const,
  },
  {
    label: "Quantalog",
    caption: "Every visitor — no banner to accept",
    pct: 100,
    tone: "accent" as const,
  },
];

export function ConsentGap() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  // The bars grow from zero the first time the panel is seen. A pre-filled
  // bar is just a picture; watching the gap open is the whole argument.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="The consent gap"
              title={
                <>
                  Half your traffic never
                  <br className="hidden sm:block" /> makes it into the report.
                </>
              }
              body="Analytics that rely on cookies need permission before they can record anything. Everyone who ignores the banner, declines it, or runs a blocker becomes invisible — and the gap is not random. It skews toward exactly the privacy-conscious, technical audience most products care about."
            />

            <p className="mt-6 text-sm leading-relaxed text-fg-muted">
              Quantalog identifies visitors with a rotating daily hash of IP and
              user agent. Nothing is written to the browser, nothing personal is
              stored, and no consent is required — so there is no gap to correct
              for.
            </p>
          </div>

          <div ref={ref} className="panel p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-fg-faint">
              Share of visitors recorded
            </p>

            <div className="mt-8 space-y-8">
              {bars.map((bar, i) => (
                <div key={bar.label}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-medium">{bar.label}</span>
                    <span
                      className={`text-[1.75rem] font-semibold leading-none tabular-nums tracking-[-0.02em] ${
                        bar.tone === "accent" ? "text-accent" : "text-fg-faint"
                      }`}
                    >
                      {bar.pct}%
                    </span>
                  </div>

                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-bg-subtle">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: shown ? `${bar.pct}%` : "0%",
                        background:
                          bar.tone === "accent"
                            ? "var(--accent)"
                            : "var(--border-strong)",
                        transition:
                          "width 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
                        // The second bar trails the first, so the eye reads
                        // them in order instead of as one block.
                        transitionDelay: `${i * 0.18}s`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-fg-faint">{bar.caption}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-fg-faint">
              Consent rates vary widely by region and audience; published figures
              commonly land between 40% and 80%. The point is not the exact
              number — it is that one of these tools is guessing and the other
              is not.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
