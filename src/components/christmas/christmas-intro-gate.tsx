"use client";

import dynamic from "next/dynamic";
import { useChristmasIntro } from "./use-christmas-intro";

const ChristmasIntro = dynamic(() => import("./christmas-intro").then((m) => m.ChristmasIntro), { ssr: false });

export function ChristmasIntroGate() {
  const playing = useChristmasIntro();
  return playing ? <ChristmasIntro /> : null;
}
