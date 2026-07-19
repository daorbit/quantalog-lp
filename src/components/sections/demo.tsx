import { Reveal } from "../reveal";
import { SectionHeading } from "../ui";
import { site } from "@/lib/site";

/**
 * Interactive product walkthrough, hosted by Page Pilot.
 *
 * The embed is a third-party iframe, so it is deliberately below the fold and
 * lazy-loaded: it must never sit in front of the hero's paint or block the
 * primary CTA.
 *
 * The frame markup below is Page Pilot's, copied as-is. Their viewer sizes
 * itself against those exact values, so it is left alone rather than rewritten
 * into utility classes — only the surrounding section is ours.
 */
const DEMO_SRC =
  "https://pagepilot-demo-viewer-prod.web.app//?tid=6a5501b48fdeaf4af8705f6f&did=6a5cd02f6af3fd60a69b0bc8&type=demo&status=live";

export function Demo() {
  return (
    <section id="demo" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-28">
        <Reveal>
          <SectionHeading
            centered
            eyebrow="Product tour"
            title={
              <>
                See it before
                <br />
                you sign up.
              </>
            }
            body="Click through the real thing — landing page to live dashboard, in about a minute. No account needed."
          />
        </Reveal>

        <Reveal delay={1}>
          {/* Page Pilot's own embed markup, kept verbatim — the padding ratio,
              aspect-ratio and box-sizing all come from their viewer and the
              player mis-scales if any of them are swapped for utility classes. */}
          <div
            style={{
              position: "relative",
              paddingBottom: "calc(54.75% + 25px)",
              width: "100%",
              height: 0,
              marginTop: 40,
            }}
          >
            <iframe
              loading="lazy"
              src={DEMO_SRC}
              title="Quantalog interactive product tour"
              allow="fullscreen"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "1px solid rgba(63,95,172,0.35)",
                boxShadow: "0px 0px 18px rgba(26, 19, 72, 0.15)",
                borderRadius: 10,
                boxSizing: "border-box",
                aspectRatio: "16/9",
                margin: "0 auto",
              }}
            />
          </div>
        </Reveal>

        <Reveal delay={2}>
          <p className="mt-5 text-center text-sm text-fg-faint">
            Prefer the real thing?{" "}
            <a
              href={`${site.app}/signup`}
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Start free
            </a>{" "}
            — no card, live in about three seconds.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
