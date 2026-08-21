"use client";

import { useEffect, useRef, useState } from "react";
import {
  Contrast, ImageOff, Link2, RotateCcw, Settings2, Type, WavesLadder, X,
} from "lucide-react";
import { Stepper, Toggle } from "./controls";
import {
  DEFAULT_PREFS, applyPrefs, isModified, readPrefs, savePrefs, type DisplayPrefs,
} from "./prefs";

/**
 * Reader display preferences.
 *
 * Deliberately not called an accessibility menu. Widgets that claim to make a
 * page accessible do not, and saying so invites both a false sense of security
 * and, in the US, litigation — the page itself has to be right. What this is
 * honest about doing is letting someone read this page the way they prefer:
 * bigger, looser, plainer, or without the motion.
 *
 * Everything is a CSS switch on <html>, saved per browser. Nothing is sent
 * anywhere, and the page works identically if the script never loads.
 */
export function DisplayMenu() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<DisplayPrefs>(DEFAULT_PREFS);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  // Applied on mount so a returning visitor keeps their settings before they
  // touch anything.
  useEffect(() => {
    const stored = readPrefs();
    setPrefs(stored);
    applyPrefs(stored);
  }, []);

  const update = (patch: Partial<DisplayPrefs>) => {
    const next = { ...prefs, ...patch };
    setPrefs(next);
    applyPrefs(next);
    savePrefs(next);
  };

  const reset = () => {
    setPrefs(DEFAULT_PREFS);
    applyPrefs(DEFAULT_PREFS);
    savePrefs(DEFAULT_PREFS);
  };

  // Escape closes and returns focus to the button that opened it, which is
  // where a keyboard user expects to land.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!panel.current?.contains(target) && !trigger.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="display-menu"
        aria-label="Display preferences"
        className="fixed bottom-5 left-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-fg-muted shadow-float transition-colors hover:text-fg"
      >
        <Settings2 className="h-[18px] w-[18px]" aria-hidden={true} />
      </button>

      {open && (
        <div
          ref={panel}
          id="display-menu"
          role="dialog"
          aria-label="Display preferences"
          className="fixed bottom-20 left-5 z-50 max-h-[min(34rem,calc(100vh-7rem))] w-[min(21rem,calc(100vw-2.5rem))] overflow-y-auto rounded-2xl border border-border bg-surface shadow-float"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3">
            <div>
              <h2 className="text-[13px] font-semibold tracking-tight">Display preferences</h2>
              <p className="text-[11px] text-fg-faint">Saved in this browser only</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                trigger.current?.focus();
              }}
              aria-label="Close display preferences"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-fg-muted transition-colors hover:text-fg"
            >
              <X className="h-4 w-4" aria-hidden={true} />
            </button>
          </div>

          <div className="space-y-4 p-4">
            <div className="space-y-2">
              <Stepper
                label="Text size"
                value={prefs.textScale}
                display={`${100 + prefs.textScale}%`}
                min={0}
                max={50}
                step={10}
                onChange={(textScale) => update({ textScale })}
              />
              <Stepper
                label="Line spacing"
                value={prefs.lineHeight}
                display={`${prefs.lineHeight}%`}
                min={100}
                max={200}
                step={20}
                onChange={(lineHeight) => update({ lineHeight })}
              />
              <Stepper
                label="Letter spacing"
                value={prefs.letterSpacing}
                display={prefs.letterSpacing ? `+${prefs.letterSpacing / 100}em` : "Normal"}
                min={0}
                max={15}
                step={5}
                onChange={(letterSpacing) => update({ letterSpacing })}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Toggle
                icon={Contrast}
                label="High contrast"
                on={prefs.contrast}
                onChange={(contrast) => update({ contrast })}
              />
              <Toggle
                icon={Type}
                label="Readable font"
                on={prefs.readableFont}
                onChange={(readableFont) => update({ readableFont })}
              />
              <Toggle
                icon={Link2}
                label="Underline links"
                on={prefs.underlineLinks}
                onChange={(underlineLinks) => update({ underlineLinks })}
              />
              <Toggle
                icon={WavesLadder}
                label="Reduce motion"
                on={prefs.reduceMotion}
                onChange={(reduceMotion) => update({ reduceMotion })}
              />
              <Toggle
                icon={ImageOff}
                label="Hide images"
                on={prefs.hideImages}
                onChange={(hideImages) => update({ hideImages })}
              />
            </div>

            {isModified(prefs) && (
              <button
                type="button"
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-[12px] font-medium text-fg-muted transition-colors hover:text-fg"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden={true} />
                Reset to defaults
              </button>
            )}

            {/* The honest footnote. A panel like this is often the only thing a
                site offers and is presented as compliance; saying plainly what
                it is and is not is the difference. */}
            <p className="text-[11px] leading-relaxed text-fg-faint">
              These change how this site looks for you. For screen readers,
              keyboard navigation and system-wide settings, your browser and
              operating system do a better job than any page can.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
