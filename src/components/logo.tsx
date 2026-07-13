import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline text-[15px] font-semibold tracking-tight text-fg ${className}`}
      aria-label={`${site.name} home`}
    >
      <span>{site.name}</span>
      <span
        className="ml-0.5 h-1 w-1 rounded-full bg-accent transition-opacity group-hover:opacity-60"
        aria-hidden="true"
      />
    </Link>
  );
}
