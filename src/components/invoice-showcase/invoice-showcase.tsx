"use client";

import { InvoiceWindow } from "./invoice-window";
import { InvoiceSteps } from "./invoice-steps";
import { useInvoiceDemo } from "./use-invoice-demo";

export function InvoiceShowcase() {
  const demo = useInvoiceDemo();

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
      <div ref={demo.ref} className="min-w-0">
        <InvoiceWindow demo={demo} />
      </div>
      <div className="lg:pt-6">
        <p className="mb-6 text-[12px] font-semibold uppercase tracking-wide text-fg-faint">
          What your client sees, and what you get
        </p>
        <InvoiceSteps stage={demo.stage} announce={!demo.playing} />
      </div>
    </div>
  );
}
