import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ProductPlanTable } from "../product/product-plan-table";
import { UNLOCK_LABEL, UNLOCK_NOTE, type AppPage } from "@/lib/quantalog-apps/types";

export function AppAvailability({ app }: { app: AppPage }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-quiet px-3 py-1 text-[13px] font-semibold text-accent">
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
          {UNLOCK_LABEL[app.unlock]}
        </span>
        <p className="mt-5 text-pretty text-[17px] leading-relaxed text-fg-muted">{UNLOCK_NOTE[app.unlock]}</p>
        <Link
          href={app.docs}
          className="mt-6 inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
        >
          Read the {app.shortName} guide
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="min-w-0">
        {app.plans ? (
          <ProductPlanTable rows={app.plans} />
        ) : (
          <p className="border-t border-border pt-6 text-[15px] leading-relaxed text-fg-muted">
            {app.shortName} works the same on Free, Starter and Pro. There are no per-plan limits to plan around.
          </p>
        )}
      </div>
    </div>
  );
}
