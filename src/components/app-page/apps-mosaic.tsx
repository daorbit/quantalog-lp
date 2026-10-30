import { AppMark } from "../apps-carousel/app-marks";
import type { AppEntry } from "../apps-carousel/app-items";

const STAGGER = ["rise-1", "rise-2", "rise-3", "rise-4", "rise-5"] as const;

export function AppsMosaic({ apps }: { apps: readonly AppEntry[] }) {
  return (
    <ul className="mx-auto grid w-full max-w-[30rem] grid-cols-5 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-9" aria-label="Quantalog Apps">
      {apps.map((app, i) => (
        <li key={app.id} className={`rise ${STAGGER[i % STAGGER.length]} flex flex-col items-center gap-2 text-center`}>
          <AppMark mark={app.mark} name={app.name} />
          <span className="line-clamp-1 text-[11px] font-medium text-fg-muted sm:text-[12px]">
            {app.name.replace(/^Quantalog /, "")}
          </span>
        </li>
      ))}
    </ul>
  );
}
