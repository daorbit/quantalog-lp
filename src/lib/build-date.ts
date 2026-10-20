export const BUILD_DATE = process.env.BUILD_DATE ?? new Date().toISOString().slice(0, 10);

export function buildDateParts() {
  const [year, month, day] = BUILD_DATE.split("-").map(Number);
  return { year, month: month - 1, day };
}
