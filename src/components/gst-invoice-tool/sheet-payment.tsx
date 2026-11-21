import Image from "next/image";
import { formatRupees } from "@/lib/gst-invoice/format";

export function SheetPayment({
  qrSrc,
  upiId,
  total,
  bankDetails,
  notes,
  notesLabel,
}: {
  qrSrc: string | null;
  upiId: string;
  total: number;
  bankDetails: string;
  notes: string;
  notesLabel: string;
}) {
  if (!qrSrc && !bankDetails.trim() && !notes.trim()) return null;

  return (
    <div className="mt-8 grid gap-6 border-t border-border pt-6 break-inside-avoid @md:grid-cols-2">
      {qrSrc && (
        <div className="flex items-center gap-4">
          <Image src={qrSrc} alt={`UPI QR code to pay ${formatRupees(total)}`} width={96} height={96} unoptimized />
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-fg-faint">Scan to pay</p>
            <p className="mt-1 text-fg">{formatRupees(total)} with any UPI app</p>
            <p className="text-[12px] text-fg-muted">{upiId}</p>
          </div>
        </div>
      )}
      {(bankDetails.trim() || notes.trim()) && (
        <div className="space-y-4">
          {bankDetails.trim() && (
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-fg-faint">Bank transfer</p>
              <p className="mt-1 whitespace-pre-line text-fg-muted">{bankDetails}</p>
            </div>
          )}
          {notes.trim() && (
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-fg-faint">{notesLabel}</p>
              <p className="mt-1 whitespace-pre-line text-fg-muted">{notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
