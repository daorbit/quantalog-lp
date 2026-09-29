import Link from "next/link";
import { LEGAL_PAGES } from "./legal-data";

export function LegalSwitch({ current }: { current: string }) {
  return (
    <nav aria-label="Legal documents" className="flex justify-center">
      <div className="blog-filter">
        {LEGAL_PAGES.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            aria-current={p.href === current ? "page" : undefined}
            className="blog-filter__item inline-flex items-center"
          >
            {p.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
