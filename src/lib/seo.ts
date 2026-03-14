import { type Locale, routing } from "@/i18n/routing";
import { SITE_URL, HREFLANG_LOCALES } from "@/constants";

export function generateAlternates(
  locale: Locale,
  path = "",
  canonicalUrl?: string,
) {
  const fullPath = path ? `/${path}` : "";
  return {
    canonical: canonicalUrl ?? `${SITE_URL}/${locale}${fullPath}`,
    languages: {
      ...Object.fromEntries(
        routing.locales.map((loc) => [
          HREFLANG_LOCALES[loc],
          `${SITE_URL}/${loc}${fullPath}`,
        ]),
      ),
      "x-default": `${SITE_URL}/${routing.defaultLocale}${fullPath}`,
    },
  };
}
