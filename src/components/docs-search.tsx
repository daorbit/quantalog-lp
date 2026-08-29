"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import type { DocNavGroup } from "@/lib/docs";

/**
 * The docs index list, filterable by a query.
 *
 * The site's JSON-LD advertises a `SearchAction` at `/docs?q={term}` — Google's
 * sitelinks searchbox points there — and until now that URL rendered the full
 * list and ignored the parameter, which is a broken promise a crawler acts on.
 * This reads `?q=` on load so a linked search lands on results, and gives a box
 * so someone on the page can filter without leaving it.
 *
 * Client-only and cheap: the whole doc set is a few dozen short entries passed
 * in from the server, so filtering is a substring match in memory with no
 * request.
 */
export function DocsSearch({ groups }: { groups: DocNavGroup[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return groups;
    return groups
      .map((group) => ({
        ...group,
        docs: group.docs.filter(
          (d) =>
            d.title.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q) ||
            d.slug.includes(q),
        ),
      }))
      .filter((group) => group.docs.length > 0);
  }, [groups, q]);

  const total = filtered.reduce((n, g) => n + g.docs.length, 0);

  return (
    <>
      <div className="relative mt-10 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-faint" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the docs"
          aria-label="Search the documentation"
          className="w-full rounded-lg border border-border bg-bg-subtle py-2.5 pl-9 pr-3 text-sm outline-none focus:border-accent"
        />
      </div>

      {q && (
        <p className="mt-3 text-sm text-fg-muted">
          {total === 0
            ? `Nothing matches “${query.trim()}”.`
            : `${total} page${total === 1 ? "" : "s"} matching “${query.trim()}”.`}
        </p>
      )}

      <div className="mt-10 space-y-12">
        {filtered.map((group) => (
          <section key={group.category}>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-muted">
              {group.category}
            </h2>
            <div className="card mt-4 divide-y divide-border overflow-hidden">
              {group.docs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className="group block p-6 transition hover:bg-bg-subtle"
                >
                  <h3 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight transition group-hover:text-accent">
                    {doc.title}
                    <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                    {doc.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
