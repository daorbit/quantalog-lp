import { DocsToc } from "./docs-toc";
import { LegalContact } from "./legal/legal-contact";
import { LegalHighlights } from "./legal/legal-highlights";
import { LegalSwitch } from "./legal/legal-switch";
import type { LegalHighlight } from "./legal/legal-data";

export function LegalPage({
  path,
  title,
  lead,
  updated,
  highlights,
  children,
}: {
  path: string;
  title: string;
  lead: string;
  updated: string;
  highlights: readonly LegalHighlight[];
  children: React.ReactNode;
}) {
  return (
    <div className="legal-shell">
      <header className="mx-auto max-w-3xl px-4 pb-10 pt-16 text-center sm:px-6 sm:pb-14 sm:pt-24">
        <p className="text-[15px] font-semibold text-accent sm:text-[17px]">Legal</p>
        <h1 className="mt-3 text-balance text-h2 font-medium leading-[1.06] tracking-display">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">{lead}</p>
        <p className="mt-5 text-[13px] text-fg-faint">Last updated {updated}</p>
        <div className="mt-8">
          <LegalSwitch current={path} />
        </div>
      </header>

      <div className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="docs-page">
          <article className="docs-article">
            <LegalHighlights items={highlights} />
            <div className="prose-q">{children}</div>
            <LegalContact />
          </article>
          <DocsToc />
        </div>
      </div>
    </div>
  );
}
