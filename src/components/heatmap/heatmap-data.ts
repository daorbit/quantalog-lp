export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const HOURS = Array.from({ length: 24 }, (_, h) => h);
export const HOUR_TICKS = [0, 6, 12, 18];
export const LEVELS = 6;

const PEAK_VISITORS = 1480;
const DAY_WEIGHT = [0.92, 1, 0.97, 0.94, 0.8, 0.46, 0.4];

const bump = (h: number, at: number, width: number) => Math.exp(-((h - at) ** 2) / (2 * width ** 2));

function shape(day: number, hour: number) {
  const weekend = day >= 5;
  const work = weekend ? 0.35 * bump(hour, 12, 3) : bump(hour, 10.5, 1.8) + 0.9 * bump(hour, 14.5, 1.6);
  const evening = (weekend ? 0.8 : 0.45) * bump(hour, 20.5, 1.6);
  const jitter = (((day * 31 + hour * 17) % 7) / 7) * 0.06;
  return DAY_WEIGHT[day] * (0.04 + work + evening + jitter);
}

const RAW = DAYS.map((_, d) => HOURS.map((h) => shape(d, h)));
const MAX = Math.max(...RAW.flat());

export const GRID = RAW.map((row) => row.map((v) => Math.round((v / MAX) * PEAK_VISITORS)));

export type Cell = { day: number; hour: number; visitors: number };

export function levelOf(visitors: number) {
  return Math.min(LEVELS - 1, Math.floor((visitors / PEAK_VISITORS) * LEVELS));
}

export function hourRange(hour: number) {
  const pad = (n: number) => String(n % 24).padStart(2, "0");
  return `${pad(hour)}:00 – ${pad(hour + 1)}:00`;
}

function sum(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}

export function heatmapStats() {
  const cells = GRID.flatMap((row, day) => row.map((visitors, hour) => ({ day, hour, visitors })));
  const peak = cells.reduce((a, b) => (b.visitors > a.visitors ? b : a));
  const quiet = cells.reduce((a, b) => (b.visitors < a.visitors ? b : a));
  const weekday = sum(GRID.slice(0, 5).flat()) / 5;
  const weekend = sum(GRID.slice(5).flat()) / 2;
  const lift = Math.round((weekday / weekend - 1) * 100);
  return { peak, quiet, lift };
}
