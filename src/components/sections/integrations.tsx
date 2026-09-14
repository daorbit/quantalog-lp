import { Webhook } from "lucide-react";
import { Eyebrow } from "../ui";
import { IntegrationLogo, type IntegrationId } from "../integration-logos";

type Integration = {
  id: IntegrationId | "webhook";
  name: string;
  body: string;
};

/**
 * The apps a form can be connected to, in the order the app's own
 * Integrations panel lists them: payments first, then email delivery, then the
 * catch-all webhook.
 */
const payments: Integration[] = [
  {
    id: "razorpay",
    name: "Razorpay",
    body: "Cards, UPI, netbanking and wallets, collected on the form itself.",
  },
  {
    id: "cashfree",
    name: "Cashfree",
    body: "The same checkout through a Cashfree merchant account, INR.",
  },
  {
    id: "payu",
    name: "PayU",
    body: "A third gateway for the accounts already settled through PayU.",
  },
];

const delivery: Integration[] = [
  {
    id: "brevo",
    name: "Brevo",
    body: "Notification emails sent from your own Brevo account and domain.",
  },
  {
    id: "smtp",
    name: "Custom SMTP",
    body: "Any mail server you already run — host, port, credentials, done.",
  },
  {
    id: "webhook",
    name: "Webhook",
    body: "Every submission POSTed to your endpoint, Zapier or Make included.",
  },
];

function IntegrationCard({ item }: { item: Integration }) {
  return (
    <li className="glass flex flex-col gap-3 rounded-2xl p-5">
      <span className="flex h-8 items-center text-fg">
        {item.id === "webhook" ? (
          <Webhook className="h-5 w-5 text-fg-muted" aria-label="Webhook" />
        ) : (
          <IntegrationLogo id={item.id} height={20} />
        )}
      </span>
      <div>
        <h3 className="text-[14px] font-medium text-fg">{item.name}</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">
          {item.body}
        </p>
      </div>
    </li>
  );
}

export function Integrations() {
  return (
    <section id="integrations" className="border-y border-border bg-bg-subtle">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="v-rise max-w-2xl">
          <Eyebrow>Integrations</Eyebrow>
          <h2 className="mt-5 text-balance text-h2 font-medium leading-[1.08] tracking-[-0.03em]">
            Your forms, wired
            <br />
            into what you already use.
          </h2>
          <p className="mt-4 leading-relaxed text-fg-muted">
            Connect a gateway and a form takes payments. Connect a mailer and
            every submission is delivered from your own domain. Keys stay in
            your workspace — we never hold a merchant account on your behalf.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-fg-faint">
              Take payments on a form
            </p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {payments.map((item) => (
                <IntegrationCard key={item.id} item={item} />
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-fg-faint">
              Deliver and forward responses
            </p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {delivery.map((item) => (
                <IntegrationCard key={item.id} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
