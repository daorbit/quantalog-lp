import {
  siNextdotjs, siReact, siVuedotjs, siSvelte, siAstro, siRemix, siNuxt,
  siWordpress, siShopify, siWebflow, siAngular, siLaravel, siDjango,
  siRubyonrails, siGatsby, siHtml5, siSquarespace, siWix, siGhost, siWoocommerce,
} from "simple-icons";
import { FrameworkMark, type Framework } from "../framework-mark";

const rows: { label: string; items: Framework[] }[] = [
  {
    label: "Supported frameworks",
    items: [
      { name: "Next.js", icon: siNextdotjs },
      { name: "React", icon: siReact },
      { name: "Vue", icon: siVuedotjs },
      { name: "Svelte", icon: siSvelte },
      { name: "Astro", icon: siAstro },
      { name: "Remix", icon: siRemix },
      { name: "Nuxt", icon: siNuxt },
      { name: "Angular", icon: siAngular },
      { name: "Gatsby", icon: siGatsby },
      { name: "Plain HTML", icon: siHtml5 },
    ],
  },
  {
    label: "Supported platforms and back ends",
    items: [
      { name: "WordPress", icon: siWordpress },
      { name: "WooCommerce", icon: siWoocommerce },
      { name: "Shopify", icon: siShopify },
      { name: "Webflow", icon: siWebflow },
      { name: "Squarespace", icon: siSquarespace },
      { name: "Wix", icon: siWix },
      { name: "Ghost", icon: siGhost },
      { name: "Laravel", icon: siLaravel },
      { name: "Django", icon: siDjango },
      { name: "Rails", icon: siRubyonrails },
    ],
  },
];

export function Logos() {
  return (
    <section className="py-14 sm:py-20">
      <div className="v-rise mx-auto max-w-2xl px-4 text-center">
        <h2 className="text-balance text-[1.5rem] font-medium leading-[1.1] tracking-display text-fg sm:text-[2rem]">
          Works with every stack.
        </h2>
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-fg-muted sm:text-[17px]">
          A framework, a CMS or plain HTML — one script tag is the whole install.
        </p>
      </div>

      <div className="marquee-mask mt-10 space-y-6 overflow-hidden sm:mt-12 sm:space-y-8">
        {rows.map((row, r) => (
          <div key={row.label} className={`v-rise ${r ? "v-d2" : "v-d1"}`}>
            <ul
              className={`marquee-track flex items-center gap-x-12 py-2 sm:gap-x-16 ${r ? "marquee-track--reverse" : ""}`}
              aria-label={row.label}
            >
              {[...row.items, ...row.items].map((f, i) => (
                <li key={`${f.name}-${i}`} aria-hidden={i >= row.items.length || undefined}>
                  <FrameworkMark framework={f} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
