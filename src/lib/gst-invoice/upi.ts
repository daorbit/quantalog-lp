export const UPI_ID_PATTERN = /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z][a-zA-Z0-9.-]{1,63}$/;

export function upiPaymentUri({
  upiId,
  payee,
  amount,
  note,
}: {
  upiId: string;
  payee: string;
  amount: number;
  note: string;
}): string {
  const params = new URLSearchParams({ pa: upiId, pn: payee, am: amount.toFixed(2), cu: "INR", tn: note });
  return `upi://pay?${params.toString()}`;
}
