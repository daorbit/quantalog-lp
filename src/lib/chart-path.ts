export type Point = readonly [number, number];

export function linePath(pts: readonly Point[]) {
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [x, y] = pts[i];
    d += ` Q ${px},${py} ${(px + x) / 2},${(py + y) / 2}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  return `${d} L ${lx},${ly}`;
}

export function plot(values: number[], width: number, height: number, max = Math.max(...values), pad = 0): Point[] {
  const step = width / (values.length - 1);
  return values.map((v, i) => [i * step, pad + (height - 2 * pad) * (1 - v / max)] as const);
}
