import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productNav } from "@/lib/site";
import { PRODUCT_ICONS as ICONS } from "./product-icons";

export function RelatedProducts({ hrefs }: { hrefs: readonly string[] }) {
  const items = hrefs
    .map((href) => productNav.find((p) => p.href === href))
    .filter((p): p is (typeof productNav)[number] => Boolean(p));

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
        <div>
          <p className="text-[15px] font-semibold text-accent sm:text-[17px]">Works with</p>
          <h2 className="mt-3 text-balance text-[1.75rem] font-semibold tracking-tight text-fg sm:text-[2.25rem]">
            Better together.
          </h2>
        </div>
        <ul className="mt-8 grid gap-x-10 gap-y-8 sm:mt-10 sm:grid-cols-3">
          {items.map((p) => {
            const Icon = ICONS[p.href];
            return (
              <li key={p.href} className="border-t border-border pt-6">
                <Link href={p.href} className="group flex h-full flex-col">
                  {Icon && <Icon className="h-5 w-5 text-accent" />}
                  <span className="mt-4 block text-[1.0625rem] font-semibold tracking-tight text-fg">{p.label}</span>
                  <span className="mt-1.5 block text-pretty text-[14px] leading-relaxed text-fg-muted">
                    {p.blurb}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[15px] font-medium text-accent group-hover:underline group-hover:underline-offset-4">
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
