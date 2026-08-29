// Building blocks for article bodies. Posts and docs import these instead of
// raw tags, so every article stays typographically consistent without an MDX
// pipeline.

import { CopyButton } from "./copy-button";

/**
 * A section heading with a hover-reveal permalink.
 *
 * The `#` link is what lets someone deep-link to a step in a long doc — it
 * copies to the address bar on click and is picked up by the on-this-page rail,
 * which reads these ids straight out of the DOM.
 */
export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="heading-anchor scroll-mt-24 text-2xl font-bold tracking-tight">
      <a href={`#${id}`} className="anchor-link" aria-label="Link to this section">
        #
      </a>
      {children}
    </h2>
  );
}

export function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="heading-anchor scroll-mt-24 text-lg font-semibold tracking-tight">
      <a href={`#${id}`} className="anchor-link" aria-label="Link to this section">
        #
      </a>
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-pretty">{children}</p>;
}

export function Ul({ children }: { children: React.ReactNode }) {
  return <ul>{children}</ul>;
}

export function Li({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}

export function Code({ children }: { children: React.ReactNode }) {
  return <code>{children}</code>;
}

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = !href.startsWith("/") && !href.startsWith("#");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/**
 * A call-out box, in one of three tones.
 *
 * `note` (accent) for something worth knowing, `tip` (green) for a shortcut,
 * `warn` (amber) for a footgun. The icon and colour carry the tone so the
 * first word of the box does not have to.
 */
export function Callout({
  children,
  variant = "note",
}: {
  children: React.ReactNode;
  variant?: "note" | "tip" | "warn";
}) {
  const icon =
    variant === "warn" ? "!" : variant === "tip" ? "★" : "i";
  return (
    <aside className={`doc-callout doc-callout--${variant}`}>
      <span className="doc-callout__icon" aria-hidden="true">
        {icon}
      </span>
      <div>{children}</div>
    </aside>
  );
}

/**
 * A code block. `label` renders as the file/terminal chip above the snippet,
 * and a copy button sits in the corner on hover.
 */
export function Pre({ label, children }: { label?: string; children: string }) {
  return (
    <figure className="card doc-code overflow-hidden">
      {label && (
        <figcaption className="flex items-center gap-2 border-b border-border bg-bg-subtle px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/60" aria-hidden="true" />
          <span className="font-mono text-xs text-fg-muted">{label}</span>
        </figcaption>
      )}
      <CopyButton text={children} />
      <pre className="overflow-x-auto p-5 text-[12.5px] leading-[1.7]">
        <code className="font-mono text-fg-muted">{children}</code>
      </pre>
    </figure>
  );
}
