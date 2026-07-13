// Building blocks for article bodies. Posts import these instead of raw tags,
// so every article stays typographically consistent without an MDX pipeline.

export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-2xl font-bold tracking-tight">
      {children}
    </h2>
  );
}

export function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-24 text-lg font-semibold tracking-tight">
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

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="rounded-lg border border-accent/30 bg-accent/[0.06] p-4 text-sm leading-relaxed">
      {children}
    </aside>
  );
}

/** A code block. `label` renders as the file/terminal chip above the snippet. */
export function Pre({ label, children }: { label?: string; children: string }) {
  return (
    <figure className="card overflow-hidden">
      {label && (
        <figcaption className="flex items-center gap-2 border-b border-border bg-bg-subtle px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/60" aria-hidden="true" />
          <span className="font-mono text-xs text-fg-muted">{label}</span>
        </figcaption>
      )}
      <pre className="overflow-x-auto p-5 text-[12.5px] leading-[1.7]">
        <code className="font-mono text-fg-muted">{children}</code>
      </pre>
    </figure>
  );
}
