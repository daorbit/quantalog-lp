import type { Metadata } from "next";

export function pageAlternates(path: string): Metadata["alternates"] {
  return {
    canonical: path,
    languages: { en: path, "x-default": path },
  };
}
