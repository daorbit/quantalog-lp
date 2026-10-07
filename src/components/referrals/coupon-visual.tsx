"use client";

import { useCycle } from "../use-cycle";
import { useCountTo } from "../use-count-to";
import { VisualPill } from "../explore/visuals/visual-pill";
import { sampleRewards } from "./referral-data";

export function CouponVisual() {
  const { ref, index, inView } = useCycle<HTMLDivElement>(sampleRewards.length, 3200);
  const reward = sampleRewards[index];
  const percent = useCountTo(inView ? 20 : 0, 1100);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <VisualPill swapKey={reward.friend} live>
        {reward.friend} joined with your link
      </VisualPill>
      <p className="mt-4 text-[5rem] font-semibold leading-none tracking-[-0.06em] tabular-nums text-fg sm:text-[8.5rem]">
        {percent}
        <span className="text-[0.4em] tracking-tight">% off</span>
      </p>
      <p className="mt-3 text-[15px] text-fg-muted">
        <span key={reward.coupon} className="chat-in inline-block font-mono text-fg">
          {reward.coupon}
        </span>{" "}
        · your next plan or add-on
      </p>
    </div>
  );
}
