import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function StatusHeader({ title, back }: { title: string; back?: boolean }) {
  return (
    <header className="mb-8">
      {back && (
        <Link href="/status" className="mb-4 inline-flex items-center gap-1 text-[14px] font-medium text-accent hover:underline">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Current status
        </Link>
      )}
      <h1 className="text-balance text-[2rem] font-semibold leading-tight tracking-tight text-fg sm:text-[2.5rem]">{title}</h1>
    </header>
  );
}
