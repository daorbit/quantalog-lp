/**
 * Reader preferences, as this browser holds them.
 *
 * Everything here is a CSS switch — a data attribute on <html> that the
 * stylesheet reads — rather than anything that rewrites the page. That is the
 * whole design: a widget cannot make an inaccessible page accessible, and the
 * ones that claim to are why overlays have the reputation they do. This only
 * offers what a reader might genuinely want changed, and says so.
 */

export type DisplayPrefs = {
  /** Percentage points above the base size, 0–50. */
  textScale: number;
  /** Multiplier on line height, as a percentage of normal: 100–200. */
  lineHeight: number;
  /** Extra letter spacing, in hundredths of an em: 0–15. */
  letterSpacing: number;
  contrast: boolean;
  /** A wider, more distinguishable face for readers who prefer one. */
  readableFont: boolean;
  underlineLinks: boolean;
  /** Stops decorative motion, independently of the OS setting. */
  reduceMotion: boolean;
  /** Replaces images with their alt text, for a page read as text. */
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
    // A browser with storage blocked still gets a working panel for this visit.
  }
}

/**
 * Push the preferences onto <html>.
 *
 * Custom properties for the numeric ones and data attributes for the switches,
 * so the stylesheet does all the work and nothing here has to know which
 * elements exist.
 */
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

/** Whether anything has been changed from the defaults, for the reset button. */
export function isModified(prefs: DisplayPrefs): boolean {
  return (Object.keys(DEFAULT_PREFS) as (keyof DisplayPrefs)[])
    .some((k) => prefs[k] !== DEFAULT_PREFS[k]);
}
