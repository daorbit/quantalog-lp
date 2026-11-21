import type { InvoiceDraft } from "./types";

export const GST_STATES: { value: string; label: string }[] = [
  ["01", "Jammu and Kashmir"],
  ["02", "Himachal Pradesh"],
  ["03", "Punjab"],
  ["04", "Chandigarh"],
  ["05", "Uttarakhand"],
  ["06", "Haryana"],
  ["07", "Delhi"],
  ["08", "Rajasthan"],
  ["09", "Uttar Pradesh"],
  ["10", "Bihar"],
  ["11", "Sikkim"],
  ["12", "Arunachal Pradesh"],
  ["13", "Nagaland"],
  ["14", "Manipur"],
  ["15", "Mizoram"],
  ["16", "Tripura"],
  ["17", "Meghalaya"],
  ["18", "Assam"],
  ["19", "West Bengal"],
  ["20", "Jharkhand"],
  ["21", "Odisha"],
  ["22", "Chhattisgarh"],
  ["23", "Madhya Pradesh"],
  ["24", "Gujarat"],
  ["26", "Dadra and Nagar Haveli and Daman and Diu"],
  ["27", "Maharashtra"],
  ["29", "Karnataka"],
  ["30", "Goa"],
  ["31", "Lakshadweep"],
  ["32", "Kerala"],
  ["33", "Tamil Nadu"],
  ["34", "Puducherry"],
  ["35", "Andaman and Nicobar Islands"],
  ["36", "Telangana"],
  ["37", "Andhra Pradesh"],
  ["38", "Ladakh"],
  ["97", "Other Territory"],
].map(([value, label]) => ({ value, label: `${label} (${value})` }));

const STATE_NAMES = new Map(GST_STATES.map((state) => [state.value, state.label]));

export const GST_RATES = [0, 0.25, 3, 5, 18, 28, 40];

export const GSTIN_PATTERN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;

export function isValidGstin(gstin: string): boolean {
  return GSTIN_PATTERN.test(gstin);
}

export function stateLabel(code: string): string {
  return STATE_NAMES.get(code) ?? "";
}

export function stateOfGstin(gstin: string): string {
  const code = gstin.slice(0, 2);
  return STATE_NAMES.has(code) ? code : "";
}

export function rateLabel(rate: number): string {
  return `${Number(rate.toFixed(2))}%`;
}

export type SupplyStates = {
  sellerState: string;
  placeOfSupply: string;
  interState: boolean;
};

export function supplyStates(draft: Pick<InvoiceDraft, "seller" | "buyer">): SupplyStates {
  const sellerState = draft.seller.state || stateOfGstin(draft.seller.gstin);
  const placeOfSupply = draft.buyer.state || stateOfGstin(draft.buyer.gstin) || sellerState;
  return {
    sellerState,
    placeOfSupply,
    interState: Boolean(sellerState && placeOfSupply && sellerState !== placeOfSupply),
  };
}
