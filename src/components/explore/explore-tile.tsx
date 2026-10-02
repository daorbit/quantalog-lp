import Link from "next/link";
import type { ExploreItem } from "./explore-items";

function TileLink({
  href,
  children,
  primary,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  ariaLabel?: string;
}) {
  const cls = `inline-flex h-10 items-center rounded-full px-5 text-[14px] font-semibold transition-colors duration-200 ${
    primary ? "bg-cta text-cta-fg hover:bg-cta-hover" : "text-fg ring-1 ring-inset ring-border-strong hover:bg-surface"
  }`;
  return href.startsWith("/") ? (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </a>
  );
}

export function ExploreTile({ item }: { item: ExploreItem }) {
  const { Visual } = item;

  return (
    <article className={`explore-tile tone-${item.tone} flex min-h-[30rem] flex-col items-center overflow-hidden px-5 pt-10 text-center sm:min-h-[40rem] sm:pt-14`}>
      <p className="inline-flex items-center gap-2 text-[15px] font-semibold text-fg-muted">
        <item.icon className="h-[18px] w-[18px] text-accent" />
        {item.label}
      </p>
      <h3 className="mt-3 text-balance text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.03em] text-fg sm:text-[2.75rem]">
        {item.title}
      </h3>
      <p className="mt-2 text-[15px] text-fg-muted sm:mt-3 sm:text-[19px]">{item.body}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2.5 sm:mt-6 sm:gap-3">
        <TileLink href={item.primary.href} primary ariaLabel={`${item.primary.label}: ${item.label}`}>
          {item.primary.label}
        </TileLink>
        <TileLink href={item.secondary.href} ariaLabel={`${item.secondary.label}: ${item.label}`}>
          {item.secondary.label}
        </TileLink>
      </div>
      <div className="flex w-full flex-1 items-center justify-center py-10 sm:py-12">
        <Visual />
      </div>
    </article>
  );
}
