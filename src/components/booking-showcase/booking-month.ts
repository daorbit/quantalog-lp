import { buildDateParts } from "@/lib/build-date";

const MIN_OPEN_DAYS = 8;

const daysIn = (year: number, month: number) => new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
const weekday = (year: number, month: number, day: number) => new Date(Date.UTC(year, month, day)).getUTCDay();

function openDays(year: number, month: number, after: number) {
  const days: number[] = [];
  for (let day = after + 1; day <= daysIn(year, month); day++) {
    const w = weekday(year, month, day);
    if (w !== 0 && w !== 6) days.push(day);
  }
  return days;
}

function pickMonth() {
  const { year, month, day } = buildDateParts();
  const current = openDays(year, month, day);
  if (current.length >= MIN_OPEN_DAYS) return { year, month, today: day, open: current };
  const next = new Date(Date.UTC(year, month + 1, 1));
  const nextYear = next.getUTCFullYear();
  const nextMonth = next.getUTCMonth();
  return { year: nextYear, month: nextMonth, today: null, open: openDays(nextYear, nextMonth, 0) };
}

const picked = pickMonth();

export const BOOKING_MONTH = {
  year: picked.year,
  month: picked.month,
  label: new Date(Date.UTC(picked.year, picked.month, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
};

export const TODAY: number | null = picked.today;
export const OPEN_DAYS = new Set(picked.open);
export const DEFAULT_DAY = picked.open[2] ?? picked.open[0];
export const OPEN_DAY_LIST = picked.open;
