import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">
        That URL does not exist. It may have moved, or it may never have been here.
      </p>
      <div className="mt-7 flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition hover:opacity-90"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-fg transition hover:border-border-strong"
        >
          Read the blog
        </Link>
      </div>
    </div>
  );
}
