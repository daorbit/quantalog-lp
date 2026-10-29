import { Lock } from "lucide-react";
import { SHARE_URL } from "./invoice-data";
import { InvoiceDocument } from "./invoice-document";
import { InvoicePayPane } from "./invoice-pay-pane";
import type { InvoiceDemo } from "./use-invoice-demo";

export function InvoiceWindow({ demo }: { demo: InvoiceDemo }) {
  return (
    <div className="bm-window">
      <div className="bm-window-bar">
        <span className="bm-url">
          <Lock className="h-3 w-3" />
          {SHARE_URL}
        </span>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_17rem]">
        <InvoiceDocument stage={demo.stage} />
        <InvoicePayPane
          stage={demo.stage}
          cue={demo.cue}
          onAccept={demo.accept}
          onPay={demo.pay}
          onReset={demo.reset}
        />
      </div>
    </div>
  );
}
