export const BOOKING_MONTH = { year: 2026, month: 9, label: "October 2026" };

export const TODAY = 13;
export const SELECTED_DAY = 16;
export const OPEN_DAYS = new Set([14, 15, 16, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30]);

export const SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30"];
export const PICKED_SLOT = "10:30";

export const BOOKING = {
  title: "Product demo",
  duration: "30 min",
  when: "Friday, October 16",
  range: "10:30 – 11:00",
  zone: "India Standard Time",
  meet: "meet.google.com/qtl-demo-x7p",
};

export const LEAD = {
  name: "Priya Sharma",
  email: "priya@northwind.io",
  company: "Northwind",
  source: "Pricing page",
};

export const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function monthCells() {
  const { year, month } = BOOKING_MONTH;
  const lead = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return [...Array.from({ length: lead }, () => null), ...Array.from({ length: days }, (_, i) => i + 1)];
}
