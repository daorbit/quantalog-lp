"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

/**
 * A styled select.
 *
 * A native `<select>` renders its option list through the operating system, so
 * none of the page's styling reaches it — on a dark page it opens as a bright
 * white OS menu in a system font. That is the one part of a form no CSS can
 * touch, which is why this is a button and a listbox instead.
 *
 * The chosen value is mirrored into a hidden input so the surrounding form
 * still submits it with `FormData` exactly as the native element would.
 */
export function SelectField({
  name,
  options,
  defaultValue,
  id,
}: {
  name: string;
  options: { value: string; label: string }[];
  defaultValue: string;
  id?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() =>
    Math.max(0, options.findIndex((o) => o.value === defaultValue))
  );
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    const onPointer = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  function choose(i: number) {
    setValue(options[i].value);
    setActive(i);
    setOpen(false);
  }

  // Arrow keys move through the list, Enter commits, Escape abandons — the
  // behaviour the native control has and the reason people trust a select.
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + options.length) % options.length);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) choose(active);
      else setOpen(true);
    }
  }

  return (
    <div className="relative" ref={wrapRef}>
      <input type="hidden" name={name} value={value} />

      <button
        id={id}
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        className="q-input q-select-trigger"
      >
        <span className="truncate">{selected.label}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-fg-faint transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-activedescendant={`${listId}-${active}`}
          className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-lg border border-border bg-surface p-1 shadow-float"
        >
          {options.map((o, i) => {
            const isSelected = o.value === value;
            return (
              <li key={o.value}>
                <button
                  id={`${listId}-${i}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => choose(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    i === active ? "bg-bg-subtle text-fg" : "text-fg-muted"
                  }`}
                >
                  {o.label}
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
