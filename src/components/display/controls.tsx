"use client";

import { Minus, Plus } from "lucide-react";

export function Toggle({
  icon: Icon,
  label,
  on,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  on: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => onChange(!on)}
      className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors ${
        on
          ? "border-accent bg-accent/10 text-fg"
          : "border-border bg-bg-subtle text-fg-muted hover:border-border-strong hover:text-fg"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden={true} />
      <span className="text-[11px] font-medium leading-tight">{label}</span>
    </button>
  );
}

export function Stepper({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;

  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
}) {
  const set = (next: number) => onChange(Math.min(max, Math.max(min, next)));

  return (
    <div className="rounded-xl border border-border bg-bg-subtle p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12px] font-medium">{label}</span>
        <div className="flex items-center gap-1.5">
          <StepButton
            label={`Decrease ${label.toLowerCase()}`}
            disabled={value <= min}
            onClick={() => set(value - step)}
          >
            <Minus className="h-3.5 w-3.5" aria-hidden={true} />
          </StepButton>
          <span
            className="min-w-[3.25rem] text-center text-[12px] tabular-nums text-fg-muted"
            aria-live="polite"
          >
            {display}
          </span>
          <StepButton
            label={`Increase ${label.toLowerCase()}`}
            disabled={value >= max}
            onClick={() => set(value + step)}
          >
            <Plus className="h-3.5 w-3.5" aria-hidden={true} />
          </StepButton>
        </div>
      </div>
    </div>
  );
}

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-7 w-7 place-items-center rounded-lg border border-border bg-surface text-fg-muted transition-colors hover:text-fg disabled:opacity-40"
    >
      {children}
    </button>
  );
}
