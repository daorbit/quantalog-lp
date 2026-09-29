import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href: string };

export function DocsBreadcrumb({
  trail,
  root = { label: "Docs", href: "/docs" },
  className = "",
}: {
  trail: string[];
  root?: Crumb;
  className?: string;
}) {
  return (
    <nav className={`docs-breadcrumb ${className}`} aria-label="Breadcrumb">
      {trail.length ? (
        <Link href={root.href}>{root.label}</Link>
      ) : (
        <span aria-current="page">{root.label}</span>
      )}
      {trail.map((item, i) => (
        <span key={item} className="docs-breadcrumb__item">
          <ChevronRight aria-hidden="true" />
          <span aria-current={i === trail.length - 1 ? "page" : undefined}>
            {item}
          </span>
        </span>
      ))}
    </nav>
  );
}
