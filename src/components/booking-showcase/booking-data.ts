export const BOOKING_MONTH = { year: 2026, month: 9, label: "October 2026" };

export const TODAY = 13;
export const DEFAULT_DAY = 16;
export const OPEN_DAYS = new Set([14, 15, 16, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30]);

export const AUTOPLAY_SCENES = [
  { day: 23, slot: "14:30" },
  { day: 28, slot: "10:30" },
  { day: 20, slot: "15:00" },
  { day: 16, slot: "10:00" },
];

const ALL_SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "16:30"];

export const HOST = {
  initials: "QL",
  name: "Quantalog team",
  url: "yoursite.com/book-a-demo",
};

export const BOOKING = {
  title: "Product demo",
  summary: "A 30 minute walkthrough of your analytics and forms, set up for your site.",
  duration: "30 min",
  minutes: 30,
  zone: "India Standard Time",
};

export const LEAD = {
  name: "Priya Sharma",
  company: "Northwind",
  source: "Pricing page",
};

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function monthCells() {
  const { year, month } = BOOKING_MONTH;
  const lead = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return [...Array.from({ length: lead }, () => null), ...Array.from({ length: days }, (_, i) => i + 1)];
}

export function slotsFor(day: number) {
  return ALL_SLOTS.filter((_, i) => (i + day) % 4 !== 0).slice(0, 7);
}

const dateOf = (day: number) => new Date(Date.UTC(BOOKING_MONTH.year, BOOKING_MONTH.month, day));

export function longDay(day: number) {
  return dateOf(day).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });
}

export function shortDay(day: number) {
  return dateOf(day).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
}

export function slotRange(slot: string) {
  const [h, m] = slot.split(":").map(Number);
  const end = h * 60 + m + BOOKING.minutes;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${slot} – ${pad(Math.floor(end / 60))}:${pad(end % 60)}`;
}
