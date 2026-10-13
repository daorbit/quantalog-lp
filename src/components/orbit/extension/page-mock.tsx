import { stageStyle } from "@/lib/stage";

const PLANS = [
  { name: "Starter", price: "$9" },
  { name: "Growth", price: "$29", flagged: true },
  { name: "Scale", price: "$79" },
];

export function PageMock() {
  return (
    <div className="relative hidden flex-1 p-6 sm:block">
      <div className="stage-item h-3 w-28 rounded-full bg-fg/10" style={stageStyle({ delay: 0.4 })} />
      <div className="stage-item mt-3 h-6 w-2/3 rounded-lg bg-fg/12" style={stageStyle({ delay: 0.5 })} />
      <div className="stage-item mt-2 h-3 w-1/2 rounded-full bg-fg/8" style={stageStyle({ delay: 0.6 })} />

      <div className="mt-8 grid grid-cols-3 gap-3">
        {PLANS.map((plan, i) => (
          <div
            key={plan.name}
            className="stage-item relative rounded-xl border border-border bg-surface p-3"
            style={stageStyle({ delay: 0.7, i, stagger: 90, fromY: "10px" })}
          >
            <p className="text-[11px] font-medium text-fg-muted">{plan.name}</p>
            <p className="mt-1 text-[18px] font-semibold tracking-tight">{plan.price}</p>
            <div className="mt-3 h-2 w-3/4 rounded-full bg-fg/8" />
            <div className="mt-1.5 h-2 w-1/2 rounded-full bg-fg/8" />
            <div className="mt-4 h-6 rounded-md bg-fg/10" />
            {plan.flagged && <span className="orbit-flag stage-item" style={stageStyle({ delay: 3.7, fromScale: 1.06 })} />}
          </div>
        ))}
      </div>

      <div className="stage-item mt-6 h-3 w-2/3 rounded-full bg-fg/8" style={stageStyle({ delay: 0.95 })} />
      <div className="stage-item mt-2 h-3 w-1/3 rounded-full bg-fg/8" style={stageStyle({ delay: 1 })} />
    </div>
  );
}
