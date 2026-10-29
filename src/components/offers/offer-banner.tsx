"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/track";
import { isOfferLive, type Offer } from "@/lib/offers";
import { CouponCode } from "./coupon-code";

export function OfferBanner({ offer, icon, decor }: { offer: Offer; icon?: ReactNode; decor?: ReactNode }) {
  if (!isOfferLive(offer)) return null;

  return (
    <aside aria-label={offer.title} className="offer-bar">
      {decor}
      <div className="relative mx-auto flex h-12 w-full max-w-360 items-center justify-center gap-2.5 px-3 pt-1.5 text-[13px] sm:h-13 sm:gap-3.5 sm:px-6 sm:text-[14px]">
        {icon}
        <p className="min-w-0 truncate">
          <span className="offer-bar__title font-semibold">{offer.title}</span>
          <span className="sm:hidden"> · {offer.percent}% off</span>
          <span className="hidden sm:inline"> · {offer.percent}% off any Quantalog plan</span>
        </p>
        <CouponCode code={offer.code} location={`${offer.id}_banner`} />
        <a
          href={offer.claimUrl}
          onClick={() => track("cta_offer_claim", { offer: offer.id, location: "offer_banner" })}
          className="offer-claim inline-flex h-7 shrink-0 items-center gap-1 rounded-full px-3 text-[12.5px] font-semibold transition-opacity duration-200 hover:opacity-90"
        >
          Claim
          <span className="hidden sm:inline">offer</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}
