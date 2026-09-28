import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { DocMeta } from "@/lib/docs";

export function DocsPager({
  prev,
  next,
}: {
  prev: DocMeta | null;
  next: DocMeta | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="docs-pager" aria-label="Pagination">
      {prev ? (
        <Link href={`/docs/${prev.slug}`} className="docs-pager__link">
          <span className="docs-pager__label">
            <ArrowLeft aria-hidden="true" /> Previous
          </span>
          <span className="docs-pager__title">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={`/docs/${next.slug}`}
          className="docs-pager__link docs-pager__link--next"
        >
          <span className="docs-pager__label">
            Next <ArrowRight aria-hidden="true" />
          </span>
          <span className="docs-pager__title">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
