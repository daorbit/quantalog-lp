import { ArrowRight, PanelRight, Globe, KeyRound } from "lucide-react";
import { Button } from "../ui";
import { OrbitMark } from "../orbit/orbit-mark";
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
  {
    icon: KeyRound,
    title: "Set up in a minute",
    body: "Paste your workspace ID and an API key from the Developers page, and ask away.",
  },
];

export function OrbitExtension({ location = "home" }: { location?: string }) {
  return (
    <section id="orbit-extension" className="tone-rose section-y">
      <div className="mx-auto max-w-360 px-4 text-center sm:px-6">
        <div className="flex justify-center">
          <OrbitMark size={56} />
        </div>
        <div className="mt-6 flex items-center justify-center gap-2.5">
          <span className="orbit-new rounded-full px-2 py-0.5 text-[11px] font-semibold">New</span>
          <span className="orbit-tone text-[15px] font-semibold">Orbit AI for Chrome</span>
        </div>

        <h2 className="mx-auto mt-4 max-w-3xl text-balance text-h2 font-medium leading-[1.06] tracking-display">
          Orbit, on every tab you open.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">
          The same assistant from your dashboard, now in Chrome&apos;s side panel.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href={site.orbitExtension} size="lg" track="cta_orbit_extension" trackProps={{ location }}>
            Add to Chrome
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/docs/orbit-ai" variant="secondary" size="lg">
            How Orbit works
          </Button>
        </div>
        <p className="mt-3 text-[12px] text-fg-faint">Free. Works in Chrome, Edge and Brave.</p>

        <ul className="mx-auto mt-16 grid max-w-5xl gap-10 border-t border-border pt-12 text-left sm:grid-cols-3 sm:gap-8">
          {points.map((p) => (
            <li key={p.title}>
              <span className="orbit-point-icon grid h-10 w-10 place-items-center rounded-xl">
                <p.icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.01em]">{p.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-fg-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
