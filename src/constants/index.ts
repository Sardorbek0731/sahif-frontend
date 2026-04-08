import { type Locale } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahif.vercel.app";

export const SITE_NAME = "sahif";

export const GOOGLE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "";

export const OG_LOCALES: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

export const HREFLANG_LOCALES: Record<Locale, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

export const LANGUAGE_NAMES = [
  { code: "uz", name: "O'zbek" },
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
] as const;

export const PHONE_NUMBER = "+998915723949";
export const PHONE_DISPLAY = "+998 91 572 3949";
export const WORKING_HOURS = "9:00 - 22:00";

export const DEFAULT_LOCATION_ID = "tashkent-city";

export const SKIP_WORDS = new Set([
  "de",
  "van",
  "von",
  "di",
  "del",
  "la",
  "le",
  "el",
]);

export const FEATURE_KEYS = [
  "catalog",
  "delivery",
  "search",
  "payment",
  "recommendations",
  "support",
] as const;

export const BOOK_LANGUAGES = [
  { code: "uz-Latn", label: "O'zbek (lotin)" },
  { code: "uz-Cyrl", label: "Ўзбек (кирил)" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "tr", label: "Türkçe" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "he", label: "עברית" },
] as const;
