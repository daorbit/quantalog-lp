import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllDocs, getDocNav, type DocMeta } from "@/lib/docs";

const POPULAR = ["tracking", "custom-events", "funnels", "goals", "segments-markers"];
const DEVELOPERS = ["platform-api", "api-reference", "script-options", "mobile-tracking"];

function pick(docs: DocMeta[], slugs: string[]) {
  return slugs.map((slug) => docs.find((doc) => doc.slug === slug)).filter((doc): doc is DocMeta => !!doc);
}

export function DocsMenu() {
  const docs = getAllDocs();
  const columns = [
    { title: "Popular guides", links: pick(docs, POPULAR) },
    { title: "Build & integrate", links: pick(docs, DEVELOPERS) },
  ];

  return (
    <div className="mx-auto grid max-w-360 grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-12 px-4 pb-14 pt-8 sm:px-8 lg:px-12">
      <div>
        <p className="menu-reveal text-[12px] text-fg-faint">Documentation</p>
        <ul className="mt-4 space-y-2.5">
          {getDocNav().map((group) => (
            <li key={group.category} className="menu-reveal">
              <Link
                href={`/docs/${group.docs[0].slug}`}
                className="inline-flex items-baseline gap-3 text-[24px] font-semibold leading-tight tracking-tight text-fg transition-colors hover:text-accent"
              >
                {group.category}
                <span className="text-[13px] font-normal tracking-normal text-fg-faint">
                  {group.docs.length} guides
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/docs"
          className="menu-reveal mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent"
        >
          Browse all {docs.length} guides
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>

      {columns.map((col) => (
        <div key={col.title}>
          <p className="menu-reveal text-[12px] text-fg-faint">{col.title}</p>
          <ul className="mt-4 space-y-3">
            {col.links.map((doc) => (
              <li key={doc.slug} className="menu-reveal">
                <Link
                  href={`/docs/${doc.slug}`}
                  className="text-[14px] font-medium text-fg transition-colors hover:text-accent"
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
