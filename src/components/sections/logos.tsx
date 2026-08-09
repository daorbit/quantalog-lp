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
  return (
    // No border-t: this sits directly under the hero's dashboard frame, and a
    // hairline there cuts the product shot off from its own proof.
    <section className="border-b border-border py-14">
      <div className="mx-auto max-w-5xl px-5">
        <p className="text-center text-[11px] uppercase tracking-[0.16em] text-fg-faint">
          Verified against
        </p>

        {/* A static wrapped row, replacing the infinite marquee. The marquee
            moved without being asked and read as a stock landing-page device;
            wrapped, the same ten marks are scannable at a glance and each one
            responds to the pointer individually. */}
        <ul
          className="mt-8 flex flex-wrap items-center justify-center gap-x-9 gap-y-6"
          aria-label="Supported frameworks"
        >
          {frameworks.map((f, i) => (
            <li
              key={f.name}
              className="v-rise lift-item group flex items-center gap-2.5 text-fg-faint hover:text-fg"
              style={{ animationDelay: `${i * 35}ms` }}
            >
              <svg
                viewBox="0 0 24 24"
                width="19"
                height="19"
                aria-hidden="true"
                className="shrink-0 opacity-55 transition-opacity duration-300 group-hover:opacity-100"
                fill={MONOCHROME.has(f.name) ? "currentColor" : `#${f.icon.hex}`}
              >
                <path d={f.icon.path} />
              </svg>
              <span className="whitespace-nowrap text-sm font-medium tracking-tight transition-colors duration-300">
                {f.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
