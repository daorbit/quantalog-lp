import type { AppPage } from "@/lib/quantalog-apps";

const CHIP_SPOTS = [
  "left-0 top-[8%] rise-2",
  "right-0 top-[44%] rise-3",
  "left-[4%] bottom-[6%] rise-4",
] as const;

export function AppHeroVisual({ app }: { app: AppPage }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
      <img
        src={`/apps/${app.logo}?v=9`}
        alt={app.name}
        width={512}
        height={512}
        className="rise rise-1 absolute inset-[16%] h-[68%] w-[68%] object-contain"
      />
      {app.chips.slice(0, CHIP_SPOTS.length).map(({ icon: Icon, label }, i) => (
        <span
          key={label}
          className={`rise ${CHIP_SPOTS[i]} absolute inline-flex max-w-[78%] items-center gap-2 whitespace-nowrap rounded-full bg-surface px-3.5 py-2 text-[13px] font-medium text-fg shadow-[0_10px_30px_-14px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-border sm:px-4 sm:py-2.5 sm:text-[14px] dark:bg-surface-raised`}
        >
          <Icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
          <span className="truncate">{label}</span>
        </span>
      ))}
    </div>
  );
}
