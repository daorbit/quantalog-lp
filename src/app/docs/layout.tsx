import { getDocNav } from "@/lib/docs";
import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const groups = getDocNav();

  return (
    <div className="docs-shell">
      <div className="docs-layout">
        <DocsSidebar groups={groups} />
        <div className="docs-main">{children}</div>
      </div>
    </div>
  );
}
