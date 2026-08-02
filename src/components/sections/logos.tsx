import {
  siNextdotjs, siReact, siVuedotjs, siSvelte, siAstro,
  siRemix, siNuxt, siWordpress, siShopify, siWebflow,
} from "simple-icons";

/**
 * Social proof by capability, not by customer.
 *
 * No borrowed customer logos implying an endorsement — these are the frameworks
 * the tracker is verified against, which is a claim we can stand behind. The
 * marks are the official ones from simple-icons, the same source the dashboard
 * uses for its install picker.
 */

/**
 * Brands whose official colour is pure black, which vanishes on a dark
 * surface. They inherit the current text colour instead, so the mark stays
 * legible in both themes.
 */
const MONOCHROME = new Set(["Next.js", "Remix"]);

const frameworks = [
  { name: "Next.js", icon: siNextdotjs },
  { name: "React", icon: siReact },
  { name: "Vue", icon: siVuedotjs },
  { name: "Svelte", icon: siSvelte },
  { name: "Astro", icon: siAstro },
  { name: "Remix", icon: siRemix },
  { name: "Nuxt", icon: siNuxt },
  { name: "WordPress", icon: siWordpress },
  { name: "Shopify", icon: siShopify },
  { name: "Webflow", icon: siWebflow },
];

export function Logos() {
  // Two identical sets: the track scrolls exactly one set's width and resets,
  // so the loop has no visible seam.
  const track = [...frameworks, ...frameworks];

  return (
    <section className="overflow-hidden border-y border-border bg-bg-subtle py-10">
      <p className="text-center text-xs uppercase tracking-[0.14em] text-fg-faint">
        Verified against
      </p>

      <div className="marquee-mask mt-6">
        <ul className="marquee-track flex items-center" aria-label="Supported frameworks">
          {track.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              // The second set is decoration; a screen reader should hear the
              // list once, not twice.
              aria-hidden={i >= frameworks.length}
              // Spacing lives on the item rather than as a flex gap. A gap adds
              // one trailing space the duplicate set does not account for, so
              // half the track is wider than one set — which is the visible
              // blank stretch that appeared on every loop.
              className="group flex shrink-0 items-center gap-2.5 px-6"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
                className="shrink-0 opacity-60 transition-opacity duration-200 group-hover:opacity-100"
                fill={MONOCHROME.has(f.name) ? "currentColor" : `#${f.icon.hex}`}
              >
                <path d={f.icon.path} />
              </svg>
              <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-fg-faint transition-colors duration-200 group-hover:text-fg">
                {f.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
