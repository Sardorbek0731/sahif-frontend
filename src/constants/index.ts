import { type Locale } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahif.vercel.app";

export const GOOGLE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "";

export const SITE_HOSTNAME = new URL(SITE_URL).hostname;

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

export const PHONE_NUMBER = "+998915723949";
export const PHONE_DISPLAY = "+998 91 572 3949";
export const WORKING_HOURS = "9:00 - 22:00";

export const DEFAULT_LOCATION_ID = "tashkent-city";
