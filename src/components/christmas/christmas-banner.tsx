import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { christmas } from "@/lib/christmas";
import { ChristmasCode } from "./christmas-code";
import { SnowCanvas } from "./snow-canvas";
import styles from "./christmas-banner.module.css";

export function ChristmasBanner() {
  return (
    <aside className={styles.banner} aria-label="Christmas offer">
      <SnowCanvas max={90} className={styles.snow} />
      <span className={styles.lights} aria-hidden="true" />

      <div className={styles.inner}>
        <img src="/christmas/santa.svg" alt="" width={184} height={130} className={styles.santa} />

        <div className={styles.text}>
          <p className={styles.title}>
            <span className={styles.merry}>Merry Christmas!</span>{" "}
            <span className={styles.offer}>{christmas.percentOff}% off any paid plan</span>
          </p>
          <p className={styles.note}>Enter the code at checkout, monthly or yearly. It applies to that payment.</p>
        </div>

        <div className={styles.actions}>
          <ChristmasCode />
          <Link href="/plans" className={styles.cta}>
            See plans
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <span className={styles.scene} aria-hidden="true">
          <img src="/christmas/gift.svg" alt="" width={64} height={68} className={styles.gift} />
          <img src="/christmas/tree.svg" alt="" width={120} height={150} className={styles.tree} />
        </span>
      </div>

      <svg className={styles.drift} viewBox="0 0 1200 32" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 32V16C120 2 260 4 400 14S700 26 860 12S1100 4 1200 14V32Z" />
      </svg>
    </aside>
  );
}
