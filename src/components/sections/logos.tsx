import {
  siNextdotjs, siReact, siVuedotjs, siSvelte, siAstro, siRemix, siNuxt,
  siWordpress, siShopify, siWebflow, siAngular, siLaravel, siDjango,
  siRubyonrails, siGatsby, siHtml5, siSquarespace, siWix, siGhost, siWoocommerce,
} from "simple-icons";
import { FrameworkMark, type Framework } from "../framework-mark";

/**
 * Social proof by capability, not by customer.
 *
 * No borrowed customer logos implying an endorsement — these are the platforms
 * the tracker is verified against, which is a claim we can stand behind. The
 * marks are the official ones from simple-icons, the same source the dashboard
 * uses for its install picker.
 *
 * A marquee again, now that the list has outgrown a row. Wrapped, twenty marks
 * became four lines of logos that pushed the page's first real section below
 * the fold — and the earlier objection to a marquee was that it moved without
 * being asked, which is answered by pausing it under the pointer rather than by
 * giving up the format. Adding a platform is one line here; the track sizes
 * itself.
 */
const frameworks: Framework[] = [
  { name: "Next.js", icon: siNextdotjs },
  { name: "React", icon: siReact },
  { name: "Vue", icon: siVuedotjs },
  { name: "Svelte", icon: siSvelte },
  { name: "Astro", icon: siAstro },
  { name: "Remix", icon: siRemix },
  { name: "Nuxt", icon: siNuxt },
  { name: "Angular", icon: siAngular },
  { name: "Gatsby", icon: siGatsby },
  { name: "Laravel", icon: siLaravel },
  { name: "Django", icon: siDjango },
  { name: "Rails", icon: siRubyonrails },
  { name: "WordPress", icon: siWordpress },
  { name: "WooCommerce", icon: siWoocommerce },
  { name: "Shopify", icon: siShopify },
  { name: "Webflow", icon: siWebflow },
  { name: "Squarespace", icon: siSquarespace },
  { name: "Wix", icon: siWix },
  { name: "Ghost", icon: siGhost },
  { name: "Plain HTML", icon: siHtml5 },
];

export function Logos() {
  return (
    // No borders at all. The hero's chart line is the boundary above this, and
    // a hairline either side of the marquee would fence it in as a widget
    // rather than letting it read as a band running under the page.
    <section className="py-14">
      <p className="text-center text-[11px] uppercase tracking-[0.16em] text-fg-faint">
        Verified against
      </p>

      {/* Full width rather than inside the page's max-width: a marquee that
          stops short of the viewport edges reads as a scrolling box, not as a
          band running under the page. The mask fades both ends. */}
      <div className="marquee-mask mt-8 overflow-hidden">
        {/* Both halves are children of the one flex row, so `gap-x-10` already
            spaces the seam exactly like every other pair — nothing extra is
            needed to make the wrap invisible. */}
        <ul
          className="marquee-track flex items-center gap-x-10"
          aria-label="Supported frameworks and platforms"
        >
          {frameworks.map((f) => (
            <li key={f.name}>
              <FrameworkMark framework={f} />
            </li>
          ))}

          {/* The second pass is what makes the loop seamless — the track
              translates by exactly half its width, so the copy arrives where
              the original started. Hidden from assistive tech, which should
              hear the list once. */}
          {frameworks.map((f) => (
            <li key={`${f.name}-repeat`} aria-hidden="true">
              <FrameworkMark framework={f} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
