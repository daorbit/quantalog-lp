import type { Offer } from "@/lib/offers";
import { CouponCode } from "./coupon-code";

export function PlanOfferRow({ offer, slug, free }: { offer: Offer; slug: string; free: boolean }) {
  if (free) return <div className="relative mt-3 h-7" aria-hidden="true" />;

  return (
    <div className="relative mt-3 flex h-7 items-center gap-2 text-[12.5px] text-fg-muted">
      <CouponCode code={offer.code} location={`pricing_${slug}`} tone="plain" />
      <span className="truncate">
        {offer.title} · until {offer.endsLabel}
      </span>
    </div>
  );
}
