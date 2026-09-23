"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { SectionHeading } from "../ui";
import { site } from "@/lib/site";

const VIDEO_SRC = "/videos/onboarding.mp4";

export function Demo() {
  const [muted, setMuted] = useState(true);

  return (
    <section id="demo">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-24 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Product tour"
          className="v-rise"
          title={
            <>
              See it before
              <br />
              you sign up.
            </>
          }
          body="Watch how Quantalog goes from a blank workspace to a live dashboard, in about a minute. No account needed."
        />

        <div className="v-rise v-d2 mx-auto mt-10 max-w-5xl">
          <div className="panel overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-(--glass-border) bg-bg-subtle px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
              <span className="ml-3 text-xs text-fg-faint">quantalog.in/app</span>
            </div>

            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <video
                className="h-full w-full object-cover"
                src={VIDEO_SRC}
                autoPlay
                loop
                muted={muted}
                preload="auto"
                playsInline
              />
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="v-rise v-d3">
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
        </div>
      </div>
    </section>
  );
}
