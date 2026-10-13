import { stageStyle } from "@/lib/stage";

const KEYS = ["Ctrl", "Shift", "O"];

export function ShortcutKeys() {
  return (
    <div className="orbit-keys absolute bottom-5 left-6 hidden items-center gap-1.5 sm:flex">
      {KEYS.map((key, i) => (
        <span key={key} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-[12px] text-fg-faint">+</span>}
          <kbd className="orbit-key stage-item" style={stageStyle({ delay: 1.1, i, stagger: 160, fromY: "-6px", fromScale: 0.9 })}>
            {key}
          </kbd>
        </span>
      ))}
    </div>
  );
}
