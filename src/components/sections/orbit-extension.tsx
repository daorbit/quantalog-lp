import { ArrowRight, Keyboard, PanelRight, Globe } from "lucide-react";
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
    icon: Keyboard,
    title: "One shortcut away",
    body: "Ctrl+Shift+O on Windows and Linux, Cmd+Shift+O on a Mac.",
  },
  {
    icon: Globe,
    title: "Follows the site you're on",
    body: "Suggestions change with the tab, and your saved conversations come with you.",
  },
];

export function OrbitExtension({ location = "home" }: { location?: string }) {
  return (
    <section id="orbit-extension" className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
      <div className="v-rise explore-tile tone-rose grid gap-10 p-7 sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <OrbitMark size={40} />
            <span className="rounded-full bg-accent/12 px-2 py-0.5 text-[11px] font-semibold text-accent">
              New
            </span>
            <span className="text-[15px] font-semibold text-accent">Orbit AI for Chrome</span>
          </div>

          <h2 className="mt-5 text-balance text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-[2.25rem]">
            Orbit, on every tab you open.
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
            The same assistant from your dashboard, now in Chrome&apos;s side panel. Install it, paste
            your workspace ID and an API key from the Developers page, and ask away.
          </p>

          <ul className="mt-7 space-y-4">
            {points.map((p) => (
              <li key={p.title} className="flex gap-3">
                <p.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <h3 className="text-[14px] font-medium tracking-[-0.01em]">{p.title}</h3>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-fg-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href={site.orbitExtension}
              size="lg"
              className="group"
              track="cta_orbit_extension"
              trackProps={{ location }}
            >
              Add to Chrome
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
            <Button href="/docs/orbit-ai" variant="secondary" size="lg">
              How Orbit works
            </Button>
          </div>
          <p className="mt-3 text-[12px] text-fg-faint">Free. Works in Chrome, Edge and Brave.</p>
        </div>

        <OrbitExtensionPreview />
      </div>
    </section>
  );
}
