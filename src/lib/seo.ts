import { type Locale, routing } from "@/i18n/routing";
import { SITE_URL, HREFLANG_LOCALES } from "@/constants";

export function generateAlternates(
  locale: Locale,
  path = "",
  canonicalUrl?: string,
) {
  const formattedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";

  const getPrefix = (loc: string) =>
    loc === routing.defaultLocale ? "" : `/${loc}`;

  const baseUrl =
    canonicalUrl ?? `${SITE_URL}${getPrefix(locale)}${formattedPath}`;

  return {
    canonical: baseUrl,
    languages: {
      ...Object.fromEntries(
        routing.locales.map((loc) => [
          HREFLANG_LOCALES[loc as Locale],
          `${SITE_URL}${getPrefix(loc)}${formattedPath}`,
        ]),
      ),
      "x-default": `${SITE_URL}${formattedPath}`,
    },
  };
}

export function getLocaleUrl(locale: string, path: string = "") {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${prefix}${formattedPath === "/" ? "" : formattedPath}`;
}
