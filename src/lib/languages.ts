import type { SiteLanguage } from "@/types/translate";

export const DEFAULT_LANGUAGE = "en";

export const languages: SiteLanguage[] = [
  { code: "en", label: "English", native: "English" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "nl", label: "Dutch", native: "Nederlands" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "zh-CN", label: "Chinese", native: "简体中文" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ar", label: "Arabic", native: "العربية" },
];

export const languageCopy = {
  title: "Choose language",
  description: "Translated automatically by Google",
  close: "Close language menu",
  trigger: "Change language",
  note: "Machine translation may not be perfect. Docs, pricing and legal terms are authoritative in English.",
};
