export function MenuToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      data-open={open || undefined}
      className="menu-toggle"
    >
      <span className="menu-toggle__line" aria-hidden="true" />
      <span className="menu-toggle__line" aria-hidden="true" />
    </button>
  );
}
