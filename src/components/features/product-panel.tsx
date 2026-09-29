import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui";
import type { Product } from "./products";

export function ProductPanel({ product }: { product: Product }) {
  const { Preview } = product;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div className="rise">
        <h3 className="text-balance text-[1.75rem] font-medium leading-[1.1] tracking-display text-fg sm:text-[2rem]">
          {product.title}
        </h3>
        <p className="mt-4 text-pretty text-[16px] leading-relaxed text-fg-muted">
          {product.body}
        </p>
        <ul className="mt-6 space-y-3">
          {product.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-[15px] text-fg">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
        <Button href={product.cta.href} variant="secondary" className="group mt-8">
          {product.cta.label}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </div>

      <div className="rise rise-2 rounded-(--radius-panel) bg-bg-subtle p-3 ring-1 ring-inset ring-hairline sm:p-8">
        <Preview />
      </div>
    </div>
  );
}
