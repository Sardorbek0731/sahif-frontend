import { type Locale, routing } from "@/i18n/routing";
import { SITE_URL, HREFLANG_LOCALES } from "@/constants";

export function generateAlternates(
  locale: Locale,
  path = "",
  canonicalUrl?: string,
) {
  const formattedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";

  const baseUrl = `${SITE_URL}/${locale}${formattedPath}`;

  return {
    canonical: canonicalUrl ?? baseUrl,
    languages: {
      ...Object.fromEntries(
        routing.locales.map((loc) => [
          HREFLANG_LOCALES[loc as Locale],
          `${SITE_URL}/${loc}${formattedPath}`,
        ]),
      ),
      "x-default": `${SITE_URL}/${routing.defaultLocale}${formattedPath}`,
    },
  };
}
