import Image from "next/image";
import { Reveal } from "@/components/reveal";

/**
 * Six real screens from the form builder: four ways to start a form, two
 * places it can live. Screenshots rather than another CSS mockup — this is
 * the one section on the page that shows the product's own UI chrome rather
 * than redrawing it, so a visitor sees what they will actually click.
 */
const startMethods = [
  {
    src: "/build-with-ai.webp",
    label: "Build with Orbit",
    alt: "Orbit AI generating a form from a plain-language prompt in the Quantalog form builder",
  },
  {
    src: "/build-with-tempalte.webp",
    label: "Start from a template",
    alt: "Picking a pre-built form template in the Quantalog form builder",
  },
  {
    src: "/build-with-config.webp",
    label: "Import a config",
    alt: "Importing a form from a config file in the Quantalog form builder",
  },
];

const scopes = [
  {
    src: "/standalone.png",
    label: "Standalone link",
    alt: "A Quantalog form open on its own standalone, shareable link",
  },
  {
    src: "/embed-in-website.png",
    label: "Embedded on a site",
    alt: "A Quantalog form embedded directly inside a website's page",
  },
];

export function BuildFlowShowcase() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
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
                alt={m.alt}
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
                alt={s.alt}
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
    </div>
  );
}
