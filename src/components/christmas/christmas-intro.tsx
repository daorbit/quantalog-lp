"use client";

import { christmas } from "@/lib/christmas";
import { SnowCanvas } from "./snow-canvas";
import styles from "./christmas-intro.module.css";

const GIFTS = [0, 1, 2, 3, 4, 5];

export function ChristmasIntro() {
  return (
    <div className={styles.overlay} aria-hidden="true">
      <SnowCanvas max={220} fromTop className={styles.snow} />

      {GIFTS.map((gift) => (
        <img key={gift} src="/christmas/gift.svg" alt="" width={64} height={68} className={styles.gift} />
      ))}

      <div className={styles.flight}>
        <div className={styles.bob}>
          <p className={styles.ribbon}>
            <span className={styles.merry}>Merry Christmas!</span>
            <span className={styles.offer}>
              {christmas.percentOff}% off with <b translate="no">{christmas.code}</b>
            </span>
          </p>
          <span className={styles.rope} />
          <img src="/christmas/sleigh.svg" alt="" width={700} height={240} className={styles.sleigh} />
        </div>
      </div>
    </div>
  );
}
