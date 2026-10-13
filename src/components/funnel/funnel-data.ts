export type FunnelStep = { label: string; count: number };

export const FUNNEL: FunnelStep[] = [
  { label: "Visited /pricing", count: 12840 },
  { label: "Started signup", count: 4210 },
  { label: "Verified email", count: 3480 },
  { label: "Installed script", count: 2140 },
  { label: "Opened dashboard", count: 1822 },
];

export function funnelRows() {
  const top = FUNNEL[0].count;
  return FUNNEL.map((step, i) => {
    const prev = FUNNEL[i - 1]?.count ?? step.count;
    return {
      ...step,
      rate: Math.round((step.count / top) * 1000) / 10,
      drop: i === 0 ? 0 : Math.round(((prev - step.count) / prev) * 100),
    };
  });
}
