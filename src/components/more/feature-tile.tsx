import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeatureTile({
  href,
  label,
  title,
  body,
  children,
}: {
  href: string;
  label: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="tile group flex h-full flex-col p-7 sm:p-9">
      <span className="text-[14px] font-semibold text-accent">{label}</span>
      <span className="mt-2 block text-balance text-[1.625rem] font-semibold leading-[1.15] tracking-tight text-fg sm:text-[2rem]">
        {title}
      </span>
      <span className="mt-3 block max-w-md text-pretty text-[15px] leading-relaxed text-fg-muted">
        {body}
      </span>
      <span className="mt-8 block">{children}</span>
      <span className="mt-auto inline-flex items-center gap-1 pt-8 text-[15px] font-medium text-fg">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
