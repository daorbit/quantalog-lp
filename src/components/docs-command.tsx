"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import type { DocNavGroup } from "@/lib/docs";

type Flat = { slug: string; title: string; description: string; category: string };

export function DocsCommand({ groups }: { groups: DocNavGroup[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const docs = useMemo<Flat[]>(
    () =>
      groups.flatMap((g) =>
        g.docs.map((d) => ({
          slug: d.slug,
          title: d.title,
          description: d.description,
          category: g.category,
        })),
      ),
    [groups],
  );

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return docs.slice(0, 8);
    return docs
      .filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.slug.includes(q),
      )
      .slice(0, 12);
  }, [docs, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (slug: string) => {
      close();
      router.push(`/docs/${slug}`);
    },
    [close, router],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA"].includes(e.target.tagName);

      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    const q = params.get("q");
    if (q) {
      setQuery(q);
      setOpen(true);
    }
  }, [params]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, results.length - 1)));
  }, [results.length]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].slug);
    }
  };

  return (
    <>
      <button
        type="button"
        className="docs-cmdk-trigger"
        onClick={() => setOpen(true)}
        aria-label="Search the documentation"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        Search docs
        <kbd aria-hidden="true">⌘K</kbd>
      </button>

      {open && (
        <div
          className="docs-cmdk-backdrop"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Search documentation"
        >
          <div
            className="docs-cmdk-panel"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
          >
            <input
              ref={inputRef}
              className="docs-cmdk-input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              placeholder="Search the docs…"
              aria-label="Search the docs"
            />
            <div className="docs-cmdk-results" ref={listRef}>
              {results.length === 0 ? (
                <p className="docs-cmdk-empty">
                  Nothing matches “{query.trim()}”. Try a feature name.
                </p>
              ) : (
                results.map((d, i) => (
                  <a
                    key={d.slug}
                    href={`/docs/${d.slug}`}
                    className="docs-cmdk-item"
                    data-active={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={(e) => {
                      e.preventDefault();
                      go(d.slug);
                    }}
                  >
                    <span className="docs-cmdk-item__cat">{d.category}</span>
                    <span className="docs-cmdk-item__title">{d.title}</span>
                    <span className="docs-cmdk-item__desc">{d.description}</span>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
