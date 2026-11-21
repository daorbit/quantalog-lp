const VARIANTS = {
  primary: "bg-cta text-cta-fg hover:bg-cta-hover",
  secondary: "border border-border bg-surface text-fg hover:border-border-strong hover:bg-bg-subtle",
  ghost: "text-fg-muted hover:text-fg",
} as const;

export function ActionButton({
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof VARIANTS }) {
  return (
    <button
      type="button"
      className={`inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] px-5 text-[14px] font-semibold transition-colors duration-200 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
