export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DAY_WEIGHT = [0.92, 1, 0.97, 0.93, 0.8, 0.45, 0.5];
const PEAK_VIEWS = 1284;

const bell = (x: number, mid: number, width: number) => Math.exp(-((x - mid) ** 2) / (2 * width * width));

function hourWeight(h: number) {
  return 0.05 + bell(h, 10.5, 2.4) * 0.95 + bell(h, 15.5, 2.3) * 0.72 + bell(h, 21, 1.7) * 0.34;
}

const MAX_HOUR = Math.max(...Array.from({ length: 24 }, (_, h) => hourWeight(h)));

export const HEAT: number[][] = DAY_WEIGHT.map((day) =>
  Array.from({ length: 24 }, (_, h) => Math.round((PEAK_VIEWS * day * hourWeight(h)) / MAX_HOUR)),
);

export function heatPeak() {
  let best = { day: 0, hour: 0, views: 0 };
  HEAT.forEach((row, day) =>
    row.forEach((views, hour) => {
      if (views > best.views) best = { day, hour, views };
    }),
  );
  return best;
}

export function weekdayShare() {
  const sum = (rows: number[][]) => rows.flat().reduce((a, b) => a + b, 0);
  return sum(HEAT.slice(0, 5)) / sum(HEAT);
}
