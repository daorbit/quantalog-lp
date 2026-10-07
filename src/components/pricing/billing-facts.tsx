import { CalendarCheck, Globe, Infinity as InfinityIcon, ReceiptText, RefreshCcw } from "lucide-react";
import { IconFacts } from "../icon-facts";

const facts = [
  { icon: RefreshCcw, title: "Nothing auto-renews", body: "One-time payments. No card is stored." },
  { icon: CalendarCheck, title: "12 months for 10", body: "Yearly billing includes two free months." },
  { icon: Globe, title: "INR or USD", body: "Cards, UPI, netbanking and wallets." },
  { icon: ReceiptText, title: "Instant receipts", body: "A PDF lands in your inbox on payment." },
  { icon: InfinityIcon, title: "Packs never expire", body: "Top-up credits carry across periods." },
];

export function BillingFacts() {
  return <IconFacts facts={facts} className="sm:grid-cols-3 lg:grid-cols-5" />;
}
