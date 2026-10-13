import { ArrowRight, PanelRight, Globe } from "lucide-react";
import { Button } from "../ui";
import { OrbitMark } from "../orbit/orbit-mark";
import { OrbitExtensionPreview } from "../orbit/orbit-extension-preview";
import { site } from "@/lib/site";

const points = [
  {
    icon: PanelRight,
    title: "Lives in the side panel",
    body: "Orbit opens beside whatever tab you are on, so you never leave the page to ask about it.",
  },
  {
    icon: Globe,
    title: "Follows the site you're on",
    body: "Suggestions change with the tab, and your saved conversations come with you.",
  },
];

export function OrbitExtension({ location = "home" }: { location?: string }) {
  return (
    <section id="orbit-extension" className="tone-rose section-y">
      <div className="mx-auto grid w-full max-w-400 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:px-10">
        <div className="min-w-0">
          <div className="v-rise flex items-center gap-3">
            <OrbitMark size={40} />
            <span className="orbit-new rounded-full px-2 py-0.5 text-[11px] font-semibold">New</span>
            <span className="orbit-tone text-[15px] font-semibold">Orbit AI for Chrome</span>
          </div>

          <h2 className="text-reveal text-reveal-d1 mt-6 text-balance text-h2 font-medium leading-[1.06] tracking-display">
            Orbit, on every tab you open.
          </h2>
          <p className="text-reveal text-reveal-d2 mt-5 max-w-xl text-pretty text-lead leading-normal text-fg-muted">
            The same assistant from your dashboard, now in Chrome&apos;s side panel. Install it, paste your workspace ID
            and an API key from the Developers page, and ask away.
          </p>

          <ul className="mt-9 space-y-5">
            {points.map((p, i) => (
              <li key={p.title} className={`v-rise v-d${i + 2} flex gap-3.5`}>
                <span className="orbit-point-icon grid h-9 w-9 shrink-0 place-items-center rounded-xl">
                  <p.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{p.title}</h3>
                  <p className="mt-0.5 text-[14px] leading-relaxed text-fg-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="v-rise v-d5 mt-10 flex flex-wrap items-center gap-3">
            <Button href={site.orbitExtension} size="lg" track="cta_orbit_extension" trackProps={{ location }}>
              Add to Chrome
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/docs/orbit-ai" variant="secondary" size="lg">
              How Orbit works
            </Button>
          </div>
          <p className="v-rise v-d5 mt-3 text-[12px] text-fg-faint">Free. Works in Chrome, Edge and Brave.</p>
        </div>

        <div className="min-w-0">
          <OrbitExtensionPreview />
        </div>
      </div>
    </section>
  );
}
