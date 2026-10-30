import { AppCard } from "../apps-carousel/app-card";
import type { AppEntry } from "../apps-carousel/app-items";

const COLUMNS = {
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export function AppCardGrid({ apps, columns = 3 }: { apps: readonly AppEntry[]; columns?: keyof typeof COLUMNS }) {
  return (
    <ul className={`grid gap-4 sm:gap-5 ${COLUMNS[columns]}`}>
      {apps.map((app) => (
        <li key={app.id} className="grid">
          <AppCard app={app} />
        </li>
      ))}
    </ul>
  );
}
