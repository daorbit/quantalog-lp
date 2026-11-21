"use client";

import { useEffect, useState } from "react";
import { UPI_ID_PATTERN, upiPaymentUri } from "@/lib/gst-invoice/upi";

const RENDER_DELAY_MS = 250;
const QR_SIZE_PX = 240;

export function useUpiQr({
  upiId,
  payee,
  amount,
  note,
}: {
  upiId: string;
  payee: string;
  amount: number;
  note: string;
}): string | null {
  const uri = UPI_ID_PATTERN.test(upiId) && amount > 0 ? upiPaymentUri({ upiId, payee, amount, note }) : "";
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!uri) {
      setSrc(null);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(() => {
      import("qrcode")
        .then((QRCode) =>
          QRCode.toDataURL(uri, {
            margin: 0,
            width: QR_SIZE_PX,
            errorCorrectionLevel: "M",
            color: { dark: "#111827", light: "#ffffff" },
          })
        )
        .then((url) => {
          if (!cancelled) setSrc(url);
        })
        .catch(() => {
          if (!cancelled) setSrc(null);
        });
    }, RENDER_DELAY_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [uri]);

  return src;
}
