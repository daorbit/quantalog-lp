"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DocCategory, DocMeta } from "@/lib/docs";

/**
 * Sidebar navigation for the docs. Groups pages by category and highlights the
 * page currently open. Rendered client-side only for the active-link state; the
 * nav data itself is passed in from the server component.
 */
export function DocsNav({
  groups,
}: {
  groups: { category: DocCategory; docs: DocMeta[] }[];
}) {
  const pathname = usePathname();

  return (
    <nav className="docs-nav" aria-label="Documentation">
      {groups.map((group) => (
        <div key={group.category} className="docs-nav-group">
          <p className="docs-nav-heading">{group.category}</p>
          <ul>
            {group.docs.map((doc) => {
              const href = `/docs/${doc.slug}`;
              const active = pathname === href;
              return (
                <li key={doc.slug}>
                  <Link
                    href={href}
                    className={`docs-nav-link${active ? " is-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {doc.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
