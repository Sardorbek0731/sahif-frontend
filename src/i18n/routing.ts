export const routing = {
  locales: ["uz", "en", "ru"],
  defaultLocale: "uz",
  localePrefix: "always",
} as const;

export type Locale = (typeof routing.locales)[number];
