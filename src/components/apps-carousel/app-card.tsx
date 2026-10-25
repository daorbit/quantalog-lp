import Link from "next/link";
import { CATEGORY_LABEL, type AppEntry } from "./app-items";
import { AppMark } from "./app-marks";

export function AppCard({ app }: { app: AppEntry }) {
  const official = app.category === "quantalog";

  const body = (
    <>
      <AppMark mark={app.mark} name={app.name} />
      <h3 className="mt-5 text-[16px] font-semibold tracking-[-0.01em] text-fg">{app.name}</h3>
      <p className="mt-0.5 text-[13px] text-fg-faint">{CATEGORY_LABEL[app.category]}</p>
      <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">{app.body}</p>
      <span
        className={`mt-auto inline-flex w-max items-center rounded-full px-2.5 py-1 text-[12px] font-medium ${
          official ? "bg-accent-quiet text-accent" : "bg-bg-subtle text-fg-muted ring-1 ring-inset ring-hairline"
        }`}
      >
        {official ? "Built in" : "Integration"}
      </span>
    </>
  );

  const className =
    "apps-card flex flex-col rounded-[1.5rem] bg-surface p-6 ring-1 ring-inset ring-border transition-colors duration-200 hover:ring-border-strong dark:bg-surface-raised";

  return app.href ? (
    <Link href={app.href} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}
