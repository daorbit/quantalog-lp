import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDocNav } from "@/lib/docs";
import { DocsNav } from "@/components/docs-nav";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Everything you need to install Quantalog, track custom events, and embed analytics into your own product with the Platform API.",
  alternates: { canonical: "/docs" },
};

export default function DocsIndexPage() {
  const groups = getDocNav();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <DocsNav groups={groups} />
        </aside>

        <main className="min-w-0">
          <header className="max-w-2xl">
            <Eyebrow>Documentation</Eyebrow>
            <h1 className="mt-4 text-balance text-[2.5rem] font-bold leading-[1.1] tracking-[-0.03em]">
              Ship analytics in an afternoon
            </h1>
            <p className="mt-4 text-pretty leading-relaxed text-fg-muted">
              Install the tracker, track the events that matter, and — when
              you&apos;re ready — embed the whole thing into your own product.
            </p>
          </header>

          <div className="mt-14 space-y-12">
            {groups.map((group) => (
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
        </main>
      </div>
    </div>
  );
}
