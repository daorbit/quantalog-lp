import Link from "next/link";
import { Bell, ChevronLeft } from "lucide-react";

export function StatusHeader({ title, back, subscribe }: { title: string; back?: boolean; subscribe?: boolean }) {
  return (
    <header className="mb-8">
      {back && (
        <Link href="/status" className="mb-4 inline-flex items-center gap-1 text-[14px] font-medium text-accent hover:underline">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Current status
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          {!back && <p className="text-[15px] font-semibold text-accent">Quantalog</p>}
          <h1 className="mt-1 text-balance text-[2rem] font-semibold leading-tight tracking-tight text-fg sm:text-[2.5rem]">{title}</h1>
        </div>
        {subscribe && (
          <a
            href="#subscribe"
            className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-border bg-surface px-4 text-[14px] font-medium text-fg transition-colors hover:border-border-strong"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            Get updates
          </a>
        )}
      </div>
    </header>
  );
}
