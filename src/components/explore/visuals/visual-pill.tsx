export function VisualPill({
  children,
  live = false,
  swapKey,
}: {
  children: React.ReactNode;
  live?: boolean;
  swapKey?: string;
}) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-1.5 text-[13px] font-medium text-fg shadow-soft ring-1 ring-border dark:bg-bg-subtle">
      {live && <span className="live-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />}
      <span key={swapKey} className="chat-in">
        {children}
      </span>
    </p>
  );
}
