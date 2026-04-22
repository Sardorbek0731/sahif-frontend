// ─── Sayt interfeysi tillari (UI uchun) ──────────────────────────────────────

export const LANGUAGE_NAMES = [
  { code: "uz", name: "O'zbek" },
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
] as const;

// ─── Kitob nashr tillari (filter uchun) ──────────────────────────────────────

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
