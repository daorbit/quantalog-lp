import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppMark } from "../apps-carousel/app-marks";
import { integrationApps, officialApps } from "@/lib/quantalog-apps/entries";

const SHOWN_INTEGRATIONS = 10;

const LINKS = [
  { href: "/apps", label: "All Q Apps" },
  { href: "/apps#how", label: "How apps work" },
  { href: "/apps#connect", label: "Connect your tools" },
  { href: "/apps#integrations", label: "Every integration" },
];

export function AppsMenu() {
  return (
    <div className="mx-auto grid max-w-360 grid-cols-[minmax(0,2.6fr)_minmax(0,1fr)] gap-12 px-4 pb-12 pt-8 sm:px-8 lg:px-12">
      <div>
        <p className="menu-reveal text-[12px] text-fg-faint">Quantalog Apps</p>
        <ul className="mt-4 grid grid-cols-5 gap-1">
          {officialApps.map((app) => (
            <li key={app.id} className="menu-reveal">
              <Link
                href={app.href ?? "/apps"}
                className="flex items-center gap-3 rounded-2xl p-2.5 transition-colors duration-200 hover:bg-bg-subtle"
              >
                <AppMark mark={app.mark} name={app.name} size="sm" />
                <span className="min-w-0 truncate text-[14px] font-semibold tracking-tight text-fg">
                  {app.name.replace(/^Quantalog /, "")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="menu-reveal text-[12px] text-fg-faint">Connects with</p>
        <ul className="menu-reveal mt-4 flex flex-wrap gap-2">
          {integrationApps.slice(0, SHOWN_INTEGRATIONS).map((app) => (
            <li key={app.id} title={app.name}>
              <AppMark mark={app.mark} name={app.name} size="xs" />
            </li>
          ))}
        </ul>
        <ul className="mt-7 space-y-3">
          {LINKS.map((link) => (
            <li key={link.href} className="menu-reveal">
              <Link
                href={link.href}
                className="group/item inline-flex items-center gap-1.5 text-[14px] font-medium text-fg transition-colors hover:text-accent"
              >
                {link.label}
                <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover/item:opacity-100" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
