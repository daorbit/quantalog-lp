import { Mail } from "lucide-react";
import { site } from "@/lib/site";

export function LegalContact() {
  return (
    <aside className="mt-14 rounded-(--radius-card) border border-border bg-surface p-6 sm:p-7">
      <p className="text-[17px] font-semibold tracking-tight text-fg">Questions about this document?</p>
      <p className="mt-2 text-pretty text-[14.5px] leading-relaxed text-fg-muted">
        {site.name} is operated by {site.legalName}. Write to us and a person will reply.
      </p>
      <div className="mt-5 flex flex-col gap-2.5 text-[14px] sm:flex-row sm:gap-6">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 font-medium text-fg transition-colors hover:text-accent"
        >
          <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
          {site.email}
        </a>
      </div>
    </aside>
  );
}
