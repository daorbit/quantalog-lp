export type DisplayPrefs = {

  textScale: number;

  lineHeight: number;

  letterSpacing: number;
  contrast: boolean;

  readableFont: boolean;
  underlineLinks: boolean;

  reduceMotion: boolean;

  hideImages: boolean;
};

export const DEFAULT_PREFS: DisplayPrefs = {
  textScale: 0,
  lineHeight: 100,
  letterSpacing: 0,
  contrast: false,
  readableFont: false,
  underlineLinks: false,
  reduceMotion: false,
  hideImages: false,
};

const KEY = "quantalog.display";

export function readPrefs(): DisplayPrefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...(JSON.parse(raw) as Partial<DisplayPrefs>) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePrefs(prefs: DisplayPrefs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {

  }
}

export function applyPrefs(prefs: DisplayPrefs) {
  const root = document.documentElement;

  root.style.setProperty("--reader-text-scale", `${100 + prefs.textScale}%`);
  root.style.setProperty("--reader-line-height", `${prefs.lineHeight / 100}`);
  root.style.setProperty("--reader-letter-spacing", `${prefs.letterSpacing / 100}em`);

  const flags: [keyof DisplayPrefs, string][] = [
    ["contrast", "data-reader-contrast"],
    ["readableFont", "data-reader-font"],
    ["underlineLinks", "data-reader-links"],
    ["reduceMotion", "data-reader-motion"],
    ["hideImages", "data-reader-images"],
  ];

  for (const [key, attr] of flags) {
    if (prefs[key]) root.setAttribute(attr, "");
    else root.removeAttribute(attr);
  }
}

export function isModified(prefs: DisplayPrefs): boolean {
  return (Object.keys(DEFAULT_PREFS) as (keyof DisplayPrefs)[])
    .some((k) => prefs[k] !== DEFAULT_PREFS[k]);
}
