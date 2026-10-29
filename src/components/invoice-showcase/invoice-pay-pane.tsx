import { Check, Download, FileCheck2, QrCode, RotateCcw } from "lucide-react";
import { CLIENT, INVOICE_NUMBER, SELLER, TOTAL } from "./invoice-data";
import type { InvoiceCue, InvoiceStage } from "./use-invoice-demo";

type Props = {
  stage: InvoiceStage;
  cue: InvoiceCue;
  onAccept: () => void;
  onPay: () => void;
  onReset: () => void;
};

function QuotePane({ cue, onAccept }: { cue: InvoiceCue; onAccept: () => void }) {
  return (
    <div className="inv-swap">
      <p className="text-[12px] font-medium text-fg-faint">Quotation from {SELLER.name}</p>
      <p className="mt-1 text-[1.75rem] font-semibold leading-none tracking-tight tabular-nums text-fg">{TOTAL}</p>
      <p className="mt-2 text-[13px] text-fg-muted">Valid for 15 days</p>
      <div className="mt-6 grid gap-2">
        <button
          type="button"
          className="bm-slot bm-slot--confirm"
          data-cue={cue === "accept" || undefined}
          onClick={onAccept}
        >
          Accept quotation
        </button>
        <button type="button" className="bm-slot inv-decline" disabled>
          Decline
        </button>
      </div>
    </div>
  );
}

function AcceptedPane() {
  return (
    <div className="inv-swap">
      <span className="inv-check">
        <Check className="h-5 w-5" strokeWidth={2.8} />
      </span>
      <p className="mt-4 text-[17px] font-semibold tracking-[-0.01em]">Accepted</p>
      <p className="mt-1 text-[13px] text-fg-muted">by {CLIENT.name}</p>
      <p className="bm-confirmed-row mt-4">&ldquo;{CLIENT.note}&rdquo;</p>
      <p className="mt-4 text-[12.5px] text-fg-faint">{SELLER.name} is preparing your invoice.</p>
    </div>
  );
}

function PayPane({ cue, onPay }: { cue: InvoiceCue; onPay: () => void }) {
  return (
    <div className="inv-swap">
      <p className="text-[12px] font-medium text-fg-faint">Amount due</p>
      <p className="mt-1 text-[1.75rem] font-semibold leading-none tracking-tight tabular-nums text-emerald-600 dark:text-emerald-400">
        {TOTAL}
      </p>
      <p className="mt-2 text-[13px] text-fg-muted">Due in 15 days</p>
      <button type="button" className="inv-qr mt-6" data-cue={cue === "pay" || undefined} onClick={onPay}>
        <QrCode className="h-20 w-20 text-fg" strokeWidth={1.1} aria-hidden="true" />
        <span className="text-[12.5px] font-medium text-fg">Scan to pay with any UPI app</span>
        <span className="text-[11.5px] text-fg-faint">Note: {INVOICE_NUMBER}</span>
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-fg-faint">
        <Download className="h-3.5 w-3.5" aria-hidden="true" />
        Download PDF
      </p>
    </div>
  );
}

function PaidPane({ onReset }: { onReset: () => void }) {
  return (
    <div className="inv-swap flex flex-col items-center text-center">
      <span className="bm-confirmed-check">
        <FileCheck2 className="h-7 w-7" strokeWidth={2.2} />
      </span>
      <p className="mt-5 text-[20px] font-semibold tracking-[-0.02em]">Paid in full</p>
      <p className="mt-1 text-[13px] text-fg-muted">
        {TOTAL} received for {INVOICE_NUMBER}.
      </p>
      <button type="button" className="bm-reset" onClick={onReset}>
        <RotateCcw className="h-3.5 w-3.5" />
        Play it again
      </button>
    </div>
  );
}

export function InvoicePayPane({ stage, cue, onAccept, onPay, onReset }: Props) {
  return (
    <div className="bm-pane border-t border-border p-6 sm:p-8 lg:border-l lg:border-t-0">
      {stage === 0 && <QuotePane cue={cue} onAccept={onAccept} />}
      {stage === 1 && <AcceptedPane />}
      {stage === 2 && <PayPane cue={cue} onPay={onPay} />}
      {stage === 3 && <PaidPane onReset={onReset} />}
    </div>
  );
}
