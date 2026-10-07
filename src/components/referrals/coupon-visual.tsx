import { card } from "../setup/setup-visuals";
import { SAMPLE_COUPON } from "./referral-data";

const notch = "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-bg-subtle dark:bg-surface-raised";

export function CouponVisual() {
  return (
    <div className={`${card} relative`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[2rem] font-semibold leading-none tracking-[-0.04em] tabular-nums text-fg">
            20<span className="text-[0.55em] tracking-tight">% off</span>
          </p>
          <p className="mt-1.5 text-[12px] text-fg-muted">your next plan or add-on</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[12px] font-medium text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          Ready
        </span>
      </div>
      <div className="relative -mx-4 my-4 border-t border-dashed border-border" aria-hidden="true">
        <span className={`${notch} -left-2`} />
        <span className={`${notch} -right-2`} />
      </div>
      <div className="flex items-center justify-between text-[12px]">
        <span className="font-mono text-fg">{SAMPLE_COUPON}</span>
        <span className="text-fg-faint">90 days left</span>
      </div>
    </div>
  );
}
