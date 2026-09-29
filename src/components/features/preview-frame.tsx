export function PreviewFrame({
  title,
  context,
  meta,
  children,
}: {
  title: string;
  context: string;
  meta: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-(--radius-card) border border-border bg-surface shadow-card dark:bg-surface-raised">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5 sm:px-6">
        <p className="flex min-w-0 items-center gap-2 text-[13px] text-fg-faint">
          <span className="truncate font-medium text-fg">{title}</span>
          <span aria-hidden="true">/</span>
          <span className="truncate">{context}</span>
        </p>
        <div className="shrink-0 text-[12px] text-fg-muted">{meta}</div>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
