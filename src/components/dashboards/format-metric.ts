export type Metric = { value: number; decimals?: number; prefix?: string; suffix?: string };

export function formatMetric(n: number, { decimals = 0, prefix = "", suffix = "" }: Omit<Metric, "value">) {
  const scaled = n / 10 ** decimals;
  const text = scaled.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${text}${suffix}`;
}
