import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${site.name} home`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 shrink-0 text-accent"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2" y="13" width="4" height="8" rx="1.2" fill="currentColor" opacity="0.45" />
        <rect x="9" y="8" width="4" height="13" rx="1.2" fill="currentColor" opacity="0.75" />
        <rect x="16" y="3" width="4" height="18" rx="1.2" fill="currentColor" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-fg">{site.name}</span>
    </Link>
  );
}
