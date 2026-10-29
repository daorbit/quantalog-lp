import { BUILD_DATE } from "./build-date";
import { site } from "./site";

export type Offer = {
  id: string;
  title: string;
  code: string;
  percent: number;
  endsOn: string;
  claimUrl: string;
};

export const diwaliOffer: Offer = {
  id: "diwali",
  title: "Diwali sale",
  code: "DIWALI30",
  percent: 30,
  endsOn: "2026-11-15",
  claimUrl: `${site.app}/app/billing?coupon=DIWALI30`,
};

export function isOfferLive(offer: Offer) {
  return BUILD_DATE <= offer.endsOn;
}
