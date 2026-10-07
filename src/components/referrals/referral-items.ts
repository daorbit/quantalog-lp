import { Gift, Link2 } from "lucide-react";
import type { ExploreItem } from "../explore/explore-items";
import { InviteVisual } from "./invite-visual";
import { CouponVisual } from "./coupon-visual";
import { site } from "@/lib/site";

export const referralItems: ExploreItem[] = [
  {
    icon: Link2,
    tone: "blue",
    label: "Your link",
    title: "One link. Every channel.",
    body: "Copy it, or send it straight to WhatsApp, email or LinkedIn.",
    primary: { label: "Get your link", href: `${site.app}/app/billing?tab=referrals` },
    secondary: { label: "Docs", href: "/docs/referrals" },
    Visual: InviteVisual,
  },
  {
    icon: Gift,
    tone: "amber",
    label: "Your reward",
    title: "A coupon, the moment they join.",
    body: "Single-use, yours alone, ready at checkout.",
    primary: { label: "How it works", href: "/docs/referrals#how" },
    secondary: { label: "Using coupons", href: "/docs/referrals#coupons" },
    Visual: CouponVisual,
  },
];
