import type { ReactNode } from "react";
import { Check, Inbox, Mail, Wallet } from "lucide-react";
import { BookingNote } from "../booking-showcase/booking-note";
import { CLIENT, INVOICE_NUMBER, QUOTE_NUMBER, TOTAL } from "./invoice-data";
import type { InvoiceStage } from "./use-invoice-demo";

type StepState = "done" | "active" | "todo";

type Step = { title: string; body: string; state: StepState; note: ReactNode };

function stateAt(stage: InvoiceStage, step: number): StepState {
  if (stage > step) return "done";
  return stage === step ? "active" : "todo";
}

function stepsFor(stage: InvoiceStage): Step[] {
  return [
    {
      title: "They accept the quotation",
      body: stage === 0 ? "Open the link and press Accept." : "On the link, with their name and a note.",
      state: stateAt(stage, 0),
      note: (
        <BookingNote
          icon={Inbox}
          tone="violet"
          app="Quantalog"
          title={`${QUOTE_NUMBER} accepted`}
          body={`${CLIENT.name}: "${CLIENT.note}"`}
        />
      ),
    },
    {
      title: "It becomes an invoice",
      body: "Converted in one click, every line and tax copied over.",
      state: stateAt(stage, 1),
      note: (
        <BookingNote
          icon={Mail}
          tone="blue"
          app="Email"
          title={`${INVOICE_NUMBER} sent to ${CLIENT.name}`}
          body="From your business name, with the PDF attached."
        />
      ),
    },
    {
      title: "They pay by UPI",
      body: "A QR code for the exact amount, on the PDF and the link.",
      state: stateAt(stage, 2),
      note: (
        <BookingNote
          icon={Wallet}
          tone="green"
          app="Invoices"
          title={`${TOTAL} collected`}
          body={`${INVOICE_NUMBER} marked Paid and moved to Collected.`}
        />
      ),
    },
  ];
}

export function InvoiceSteps({ stage, announce }: { stage: InvoiceStage; announce: boolean }) {
  return (
    <ol aria-live={announce ? "polite" : "off"}>
      {stepsFor(stage).map(({ title, body, state, note }, i) => (
        <li key={title} className="bm-step" data-state={state}>
          <span className="bm-step-mark">{state === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}</span>
          <div className="min-w-0 flex-1 pb-8">
            <p className="text-[15px] font-semibold tracking-[-0.01em]">{title}</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-fg-muted">{body}</p>
            <div className="bm-step-note" data-live={state === "done" || undefined}>
              <div className="min-h-0 overflow-hidden">
                <div className="pt-3">{note}</div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
