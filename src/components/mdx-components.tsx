import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    const internal = href.startsWith("/") || href.startsWith("#");
    return internal ? (
      <Link href={href} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  // Wide tables get their own scroll container so the page never scrolls sideways.
  table: (props) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
  Callout: ({ children }: { children: React.ReactNode }) => (
    <aside className="rounded-lg border border-accent/30 bg-accent/[0.06] p-4 text-sm leading-relaxed">
      {children}
    </aside>
  ),
};
