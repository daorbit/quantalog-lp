"use client";

import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { useAutoResize } from "./use-auto-resize";

export function OrbitComposer({
  value,
  onChange,
  onSend,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled: boolean;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useAutoResize(inputRef, value);

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  return (
    <div className="orbit-composer-wrap px-4 pb-4 pt-2 sm:px-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="orbit-composer"
      >
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          rows={1}
          placeholder="Ask a question"
          aria-label="Ask Orbit a question"
          disabled={disabled}
          className="orbit-composer__input"
        />
        <button
          type="submit"
          disabled={!value.trim() || disabled}
          aria-label="Send"
          className="orbit-composer__send"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>

      <p className="mt-2 text-center text-[11px] leading-tight text-fg-faint">
        Orbit can&apos;t see your data and can be wrong.
      </p>
    </div>
  );
}
