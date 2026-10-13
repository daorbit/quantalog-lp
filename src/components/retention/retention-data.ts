export const WEEKS = 8;

const COHORT_SIZES = [1840, 2210, 1960, 2480, 2920, 2610, 3140, 3380];
const COHORT_LIFT = [0, 2, -3, 4, 7, 3, 6, 5];

function retained(week: number, lift: number) {
  if (week === 0) return 100;
  return Math.round(18 + lift * 0.6 + 26 * Math.exp(-(week - 1) / 2.4));
}

export const COHORTS = COHORT_SIZES.map((size, c) => ({
  label: `Week ${c + 1}`,
  size,
  retention: Array.from({ length: WEEKS - c }, (_, w) => retained(w, COHORT_LIFT[c])),
}));

export function retentionStats() {
  const firstWeek = COHORTS.filter((c) => c.retention.length > 1).map((c) => c.retention[1]);
  const average = Math.round(firstWeek.reduce((a, b) => a + b, 0) / firstWeek.length);
  const best = COHORTS.reduce((a, b) => ((b.retention[1] ?? 0) > (a.retention[1] ?? 0) ? b : a));
  return { average, best: best.label, cohorts: COHORTS.length };
}
