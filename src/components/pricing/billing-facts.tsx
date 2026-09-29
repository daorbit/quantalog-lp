import { CalendarCheck, Globe, Infinity as InfinityIcon, ReceiptText, RefreshCcw } from "lucide-react";

const facts = [
  { icon: RefreshCcw, title: "Nothing auto-renews", body: "One-time payments. No card is stored." },
  { icon: CalendarCheck, title: "12 months for 10", body: "Yearly billing includes two free months." },
  { icon: Globe, title: "INR or USD", body: "Cards, UPI, netbanking and wallets." },
  { icon: ReceiptText, title: "Instant receipts", body: "A PDF lands in your inbox on payment." },
  { icon: InfinityIcon, title: "Packs never expire", body: "Top-up credits carry across periods." },
];

export function BillingFacts() {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
      {facts.map((f) => (
        <li key={f.title} className="text-center">
          <f.icon className="mx-auto h-6 w-6 text-accent" strokeWidth={1.6} aria-hidden="true" />
          <p className="mt-3 text-[15px] font-semibold tracking-tight text-fg">{f.title}</p>
          <p className="mt-1 text-[13px] leading-snug text-fg-muted">{f.body}</p>
        </li>
      ))}
    </ul>
  );
}
