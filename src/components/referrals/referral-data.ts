import { BellRing, ShieldCheck, ShoppingCart, Users } from "lucide-react";
import type { IconFact } from "../icon-facts";

export const SAMPLE_CODE = "MAYA7Q4K";
export const SAMPLE_COUPON = "REF-H3KQ8WZP";

export const shareChannels = ["WhatsApp", "Email", "LinkedIn"] as const;

export const referralFacts: IconFact[] = [
  { icon: Users, title: "On every plan", body: "Free accounts get a link too." },
  { icon: ShoppingCart, title: "Plans or add-ons", body: "Apply the coupon at checkout." },
  { icon: BellRing, title: "Told right away", body: "In-app and by email when you earn." },
  { icon: ShieldCheck, title: "Fair by design", body: "Self-referrals never count." },
];
