import Image from "next/image";
import { Reveal } from "@/components/reveal";

/**
 * Six real screens from the form builder: four ways to start a form, two
 * places it can live. Screenshots rather than another CSS mockup — this is
 * the one section on the page that shows the product's own UI chrome rather
 * than redrawing it, so a visitor sees what they will actually click.
 */
const startMethods = [
  { src: "/build-with-ai.webp", label: "Build with Orbit" },
  { src: "/build-with-tempalte.webp", label: "Start from a template" },
  { src: "/build-with-config.webp", label: "Import a config" },
];

const scopes = [
  { src: "/standalone.png", label: "Standalone link" },
  { src: "/embed-in-website.png", label: "Embedded on a site" },
];

export function BuildFlowShowcase() {
  return (
    <section className="mt-16">
      <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
        However you start it, however it lives
      </h2>
      <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-fg-muted">
        Describe it to Orbit, pick a template, or paste a config copied from
        another form. Then decide where it lives — a page of its own, or a
        card embedded in one you already have.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {startMethods.map((m, i) => (
          <Reveal
            key={m.label}
            delay={((i % 3) + 1) as 1 | 2 | 3}
            className="card card-hover overflow-hidden"
          >
            {/* Dark render, so it keeps its own ground rather than the
                theme's — a light-mode card behind a transparent-cornered
                screenshot would show through as a mismatched frame. */}
            <div className="relative h-44 w-full bg-[#0b0b0d]">
              <Image
                src={m.src}
                alt=""
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="border-t border-border px-4 py-3 text-sm font-medium">
              {m.label}
            </p>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {scopes.map((s, i) => (
          <Reveal
            key={s.label}
            delay={((i % 3) + 1) as 1 | 2 | 3}
            className="card card-hover overflow-hidden"
          >
            {/* These renders sit on a pale cream ground of their own, kept
                as-is for the same reason as the dark set above. */}
            <div className="relative h-52 w-full bg-[#fdf8f1]">
              <Image
                src={s.src}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="border-t border-border px-4 py-3 text-sm font-medium">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
