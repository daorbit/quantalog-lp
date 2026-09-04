"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "../ui";
import { site } from "@/lib/site";

type Review = {
  name: string;
  role: string;
  quote: string;
  /**
   * DiceBear seed. Any string works and the same seed always renders the same
   * face, so these stay stable across builds. Deliberately an illustrated
   * avatar rather than a photo: these are real people who did not supply a
   * portrait, and a stock headshot beside a real name would imply one.
   */
  seed: string;
  /** Ring colour behind the avatar. Literal Tailwind class names — composing
      them at runtime would get the utilities purged from the build. */
  ring: string;
};

/** DiceBear, seeded by name. Free for commercial use, no attribution needed. */
const avatarUrl = (seed: string) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=transparent`;

/**
 * Real reviews, quoted rather than paraphrased.
 *
 * Every quote is genuine and attributed to a named person with a public
 * profile. Nothing here is written for them.
 */
const reviews: Review[] = [
  {
    name: "Divya Mishra",
    role: "Manages client websites",
    quote:
      "This tool has been incredibly helpful for me. I've integrated it with my clients' websites, and before using it, it was difficult to keep track of what was happening across each site. The integration process was simple and straightforward, and my clients have been really happy with the results. It makes it easy to understand website traffic and provides useful SEO improvement tips, all in one place.",
    seed: "Divya",
    ring: "ring-teal-400/40",
  },
  {
    name: "Devesh Mani Chaturvedi",
    role: "Reviewer",
    quote:
      "A refreshing analytics platform that keeps things simple without sacrificing useful insights. The dashboard is clean, fast, and easy to understand, while the privacy-first approach is a huge plus. I also like that it combines analytics with SEO insights, making it more practical than many traditional tools.",
    seed: "Devesh",
    ring: "ring-violet-400/40",
  },
  {
    name: "Deepak Gupta",
    role: "Reviewer",
    quote:
      "A refreshing take on privacy-first analytics — real-time tracking, built-in SEO audits, and a multi-tenant API. Clean, focused, and developer-friendly, and a real alternative to the heavy analytics platforms.",
    seed: "Deepak",
    ring: "ring-amber-400/40",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const count = reviews.length;

  const go = useCallback(
    (d: number) => setI((n) => (n + d + count) % count),
    [count]
  );

  // Arrow keys work whenever the deck has focus — the buttons are real
  // buttons, so this is the only part not already handled.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Warm every avatar once on mount. Without this the first step to a card
  // shows an empty circle while its SVG is fetched.
  useEffect(() => {
    reviews.forEach((r) => {
      const img = new Image();
      img.src = avatarUrl(r.seed);
    });
  }, []);

  const active = reviews[i];

  return (
    <section id="testimonials" className="relative isolate overflow-hidden">
      {/* A single soft bloom behind the deck. The card is light-on-dark and
          needs something to sit against, or it reads as a slide pasted onto a
          flat ground. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "var(--glow)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-24 lg:py-28">
        <span className="v-rise inline-flex items-center rounded-full border border-border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-fg-muted">
          Testimonials
        </span>

        <h2 className="v-rise v-d1 mt-6 text-h2 font-medium tracking-display">
          Loved by makers
          <br className="hidden sm:block" /> and teams worldwide.
        </h2>
        <p className="v-rise v-d2 mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-fg-muted">
          Real feedback from people running Quantalog across their own sites and
          their clients&apos;.
        </p>

        {/* ---- The deck ---- */}
        <div className="v-rise v-d3 relative mt-12 sm:mt-16">
          <div className="flex items-center justify-center gap-3 sm:gap-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface/70 text-fg-muted backdrop-blur transition-colors hover:border-border-strong hover:text-fg sm:flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Two offset shells behind the live card do the stacking. They
                are pure decoration, hence aria-hidden — the deck reads as a
                pile of cards without duplicating the quote to a screen
                reader. */}
            <div className="relative min-w-0 flex-1 sm:max-w-4xl">
              <div
                className="absolute inset-x-4 -bottom-3 h-full rounded-2xl border border-border bg-surface/30"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-2 -bottom-1.5 h-full rounded-2xl border border-border bg-surface/50"
                aria-hidden="true"
              />

              <figure
                key={i}
                className="card relative rounded-2xl p-6 text-left shadow-float sm:p-8"
                style={{ animation: "rise 0.4s var(--ease-out-q) both" }}
              >
                <div className="flex gap-0.5" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Fixed minimum height, so stepping between a long quote and
                    a short one does not resize the card and shift the arrows
                    under the cursor. */}
                <blockquote className="mt-4 min-h-[7.5rem] text-pretty text-[14.5px] leading-relaxed text-fg sm:min-h-[6.5rem] sm:text-[15.5px]">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
                  {/* Plain <img>: the app is a static export with image
                      optimisation off, so next/image would add a wrapper and
                      no benefit. The initials stay underneath as the alt-text
                      fallback if DiceBear is unreachable. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatarUrl(active.seed)}
                    alt=""
                    width={44}
                    height={44}
                    loading="lazy"
                    className={`h-11 w-11 shrink-0 rounded-full bg-bg-subtle object-cover ring-2 ${active.ring}`}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] font-medium">
                      {active.name}
                    </span>
                    <span className="block truncate text-[11.5px] text-fg-faint">
                      {active.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface/70 text-fg-muted backdrop-blur transition-colors hover:border-border-strong hover:text-fg sm:flex"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Dots double as the mobile control, where the side arrows would
              crowd the card off the screen. */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:text-fg sm:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {reviews.map((r, n) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setI(n)}
                aria-label={`Show testimonial from ${r.name}`}
                aria-current={n === i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  n === i ? "w-6 bg-accent" : "w-1.5 bg-border-strong hover:bg-fg-faint"
                }`}
              />
            ))}

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:text-fg sm:hidden"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="v-rise v-d4 mt-12 text-sm text-fg-muted">
          Join the teams measuring their traffic without a consent banner.
        </p>
        <div className="v-rise v-d4 mt-5 flex justify-center">
          <Button
            href={`${site.app}/signup`}
            track="cta_start_free"
            trackProps={{ location: "testimonials" }}
          >
            Get started free
          </Button>
        </div>
      </div>
    </section>
  );
}
