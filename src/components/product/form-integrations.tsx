import { Webhook } from "lucide-react";
import { IntegrationLogo } from "../integration-logos";

const GATEWAYS = [
  { id: "razorpay", name: "Razorpay" },
  { id: "cashfree", name: "Cashfree" },
  { id: "payu", name: "PayU" },
] as const;

export function FormIntegrations() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      <div className="tile tile--static p-6 sm:p-9">
        <p className="text-[14px] font-semibold text-accent">Payment gateways</p>
        <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
          Charges go through your own account and land with you.
        </p>
        <ul className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5 text-fg">
          {GATEWAYS.map((g) => (
            <li key={g.id} className="flex h-7 items-center">
              <IntegrationLogo id={g.id} height={20} />
              <span className="sr-only">{g.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="tile tile--static p-6 sm:p-9">
        <p className="text-[14px] font-semibold text-accent">Email and forwarding</p>
        <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
          Notifications through your mailer, submissions to your tools.
        </p>
        <ul className="mt-8 space-y-4 text-[15px] text-fg">
          <li className="flex items-center gap-3">
            <IntegrationLogo id="brevo" height={20} />
            Brevo
          </li>
          <li className="flex items-center gap-3">
            <IntegrationLogo id="smtp" height={20} />
            Custom SMTP
          </li>
          <li className="flex items-center gap-3">
            <Webhook className="h-5 w-5 text-fg-muted" aria-hidden="true" />
            Webhook — Zapier, Make, or your own endpoint
          </li>
        </ul>
      </div>
    </div>
  );
}
