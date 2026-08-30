import {
  siNextdotjs, siReact, siVuedotjs, siSvelte, siAstro, siRemix, siNuxt,
  siWordpress, siShopify, siWebflow, siAngular, siLaravel, siDjango,
  siRubyonrails, siGatsby, siHtml5, siSquarespace, siWix, siGhost, siWoocommerce,
} from "simple-icons";
import { FrameworkMark, type Framework } from "../framework-mark";

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

    <section className="py-14">
      <p className="text-center text-[11px] uppercase tracking-[0.16em] text-fg-faint">
        Verified against
      </p>

      <div className="marquee-mask mt-8 overflow-hidden">

        <ul
          className="marquee-track flex items-center gap-x-10"
          aria-label="Supported frameworks and platforms"
        >
          {frameworks.map((f) => (
            <li key={f.name}>
              <FrameworkMark framework={f} />
            </li>
          ))}

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
