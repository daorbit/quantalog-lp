import { BUILD_DATE } from "./build-date";

export const christmas = {
  code: "SANTA50",
  percentOff: 50,
  endsOn: "2026-12-31",
} as const;

export const isChristmasLive = BUILD_DATE <= christmas.endsOn;
