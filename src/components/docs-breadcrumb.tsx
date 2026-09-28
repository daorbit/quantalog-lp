import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function DocsBreadcrumb({ trail }: { trail: string[] }) {
  return (
    <nav className="docs-breadcrumb" aria-label="Breadcrumb">
      {trail.length ? (
        <Link href="/docs">Docs</Link>
      ) : (
        <span aria-current="page">Docs</span>
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
