export function ToggleField({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3 sm:col-span-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-describedby={`${id}-description`}
        className="mt-1 h-4 w-4 shrink-0 accent-accent"
      />
      <div>
        <label htmlFor={id} className="text-[14px] font-medium text-fg">
          {label}
        </label>
        <p id={`${id}-description`} className="text-[13px] leading-relaxed text-fg-muted">
          {description}
        </p>
      </div>
    </div>
  );
}
