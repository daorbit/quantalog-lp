export type SegmentOption = {
  id: string;
  label: string;
  icon?: (props: { className?: string }) => React.ReactNode;
};

export function SegmentedControl({
  options,
  value,
  onChange,
  label,
  idPrefix,
  controls,
  align = "center",
}: {
  options: SegmentOption[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  idPrefix: string;
  controls: string;
  align?: "center" | "start";
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1">
      <div
        role="tablist"
        aria-label={label}
        className={`flex w-max gap-1 rounded-full bg-bg-subtle p-1 ring-1 ring-inset ring-hairline ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {options.map((o) => {
          const selected = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              role="tab"
              id={`${idPrefix}-${o.id}`}
              aria-selected={selected}
              aria-controls={controls}
              onClick={() => onChange(o.id)}
              className={`inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[14px] transition-all duration-300 sm:px-5 ${
                selected
                  ? "bg-surface font-medium text-fg shadow-soft ring-1 ring-border dark:bg-surface-raised"
                  : "text-fg-muted hover:text-fg"
              }`}
            >
              {o.icon && <o.icon className={`h-4 w-4 ${selected ? "text-accent" : ""}`} />}
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
