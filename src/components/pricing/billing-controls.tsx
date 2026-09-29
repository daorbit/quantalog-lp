import { CURRENCIES, type Currency } from "@/lib/plans";

export function BillingControls({
  currency,
  onCurrency,
  yearly,
  onYearly,
}: {
  currency: Currency;
  onCurrency: (c: Currency) => void;
  yearly: boolean;
  onYearly: (v: boolean) => void;
}) {
  const pill = (active: boolean) =>
    `h-8 rounded-full px-3.5 text-[13px] transition-all duration-200 ${
      active
        ? "bg-surface font-medium text-fg shadow-soft ring-1 ring-border dark:bg-surface-raised"
        : "text-fg-muted hover:text-fg"
    }`;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className="flex gap-0.5 rounded-full bg-bg-subtle p-0.5 ring-1 ring-inset ring-hairline" aria-label="Billing cycle">
        <button type="button" aria-pressed={!yearly} onClick={() => onYearly(false)} className={pill(!yearly)}>
          Monthly
        </button>
        <button type="button" aria-pressed={yearly} onClick={() => onYearly(true)} className={pill(yearly)}>
          Yearly <span className="text-accent">· 2 months free</span>
        </button>
      </div>

      <div className="flex gap-0.5 rounded-full bg-bg-subtle p-0.5 ring-1 ring-inset ring-hairline" aria-label="Currency">
        {CURRENCIES.map((c) => (
          <button key={c} type="button" aria-pressed={currency === c} onClick={() => onCurrency(c)} className={pill(currency === c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
