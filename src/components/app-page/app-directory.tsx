import { AppCardGrid } from "./app-card-grid";
import { GroupedList } from "./grouped-list";
import { APP_GROUPS } from "@/lib/quantalog-apps";
import { groupOfEntry, officialApps } from "@/lib/quantalog-apps/entries";

export function AppDirectory() {
  return (
    <GroupedList
      groups={APP_GROUPS.map(({ group, title, body }) => ({
        key: group,
        title,
        body,
        content: <AppCardGrid apps={officialApps.filter((app) => groupOfEntry(app) === group)} />,
      }))}
    />
  );
}
