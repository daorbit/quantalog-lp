import { allApps } from "../apps-carousel/app-items";
import { AppMark } from "../apps-carousel/app-marks";
import { PRODUCT_ICONS } from "../product/product-icons";
import { MarkRowList, type MarkRowItem } from "./mark-row";
import { productNav } from "@/lib/site";
import type { AppConnection } from "@/lib/quantalog-apps/types";

function resolve(item: AppConnection): MarkRowItem | null {
  if (item.kind === "app") {
    const app = allApps.find((a) => a.id === item.id);
    if (!app) return null;
    return { key: app.id, name: app.name, href: app.href, mark: <AppMark mark={app.mark} name={app.name} />, body: item.how };
  }
  const product = productNav.find((p) => p.href === item.href);
  if (!product) return null;
  const Icon = PRODUCT_ICONS[product.href];
  return {
    key: product.href,
    name: product.label,
    href: product.href,
    mark: (
      <span className="grid h-14 w-14 place-items-center rounded-[22%] bg-accent-quiet text-accent">
        {Icon && <Icon className="h-6 w-6" />}
      </span>
    ),
    body: item.how,
  };
}

export function AppConnections({ items }: { items: readonly AppConnection[] }) {
  return <MarkRowList items={items.map(resolve).filter((r): r is MarkRowItem => Boolean(r))} />;
}
