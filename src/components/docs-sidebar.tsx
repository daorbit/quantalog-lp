"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu } from "lucide-react";
import type { DocNavGroup } from "@/lib/docs";
import { DocsCommand } from "./docs-command";
import { DocsNav } from "./docs-nav";

export function DocsSidebar({ groups }: { groups: DocNavGroup[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = groups
    .flatMap((g) => g.docs)
    .find((d) => `/docs/${d.slug}` === pathname);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="docs-mobilebar">
        <button
          type="button"
          className="docs-mobilebar__toggle"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="docs-sidebar"
        >
          <Menu aria-hidden="true" />
          <span className="docs-mobilebar__crumb">
            {current ? (
              <>
                {current.category}
                <ChevronRight aria-hidden="true" />
                <strong>{current.title}</strong>
              </>
            ) : (
              "Documentation"
            )}
          </span>
        </button>
      </div>

      {open && (
        <div
          className="docs-sidebar-scrim"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="docs-sidebar"
        className="docs-sidebar"
        data-open={open || undefined}
        aria-label="Documentation sidebar"
      >
        <div className="docs-sidebar__search">
          <Suspense fallback={null}>
            <DocsCommand groups={groups} />
          </Suspense>
        </div>
        <DocsNav groups={groups} />
      </aside>
    </>
  );
}
