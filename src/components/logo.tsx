import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline text-[19px] font-semibold tracking-[-0.02em] text-fg ${className}`}
      aria-label={`${site.name} home`}
    >
      <span>{site.name}</span>

      <span
        className="ml-1 h-1.5 w-1.5 rounded-full bg-accent transition-opacity group-hover:opacity-60"
        aria-hidden="true"
      />
    </Link>
  );
}
