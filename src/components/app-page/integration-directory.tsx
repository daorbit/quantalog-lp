import { APP_CATEGORIES, type AppCategory } from "../apps-carousel/app-items";
import { AppMark } from "../apps-carousel/app-marks";
import { GroupedList } from "./grouped-list";
import { MarkRowList } from "./mark-row";
import { integrationApps } from "@/lib/quantalog-apps/entries";

const CATEGORY_BODY: Partial<Record<AppCategory, string>> = {
  ai: "Ask about your workspace from the assistant you already use. Read-only, approved by you.",
  notifications: "New responses, reports and alerts in the chat your team already watches.",
  social: "Publish on schedule and bring your search data next to your traffic.",
  payments: "Collect payments on your forms through your own merchant account.",
  email: "Send form emails from your own account and domain.",
  workflow: "Bookings, spreadsheets and anything else that takes a webhook.",
};

export function IntegrationDirectory() {
  const categories = APP_CATEGORIES.filter(
    (c): c is { id: AppCategory; label: string } => c.id !== "all" && c.id !== "quantalog",
  );

  return (
    <GroupedList
      groups={categories.map((category) => ({
        key: category.id,
        title: category.label,
        body: CATEGORY_BODY[category.id] ?? "",
        content: (
          <MarkRowList
            items={integrationApps
              .filter((app) => app.category === category.id)
              .map((app) => ({
                key: app.id,
                name: app.name,
                href: app.href,
                mark: <AppMark mark={app.mark} name={app.name} />,
                body: app.body,
              }))}
          />
        ),
      }))}
    />
  );
}
