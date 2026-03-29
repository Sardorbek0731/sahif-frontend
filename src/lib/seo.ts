import { type Locale, routing } from "@/i18n/routing";
import { SITE_URL, HREFLANG_LOCALES } from "@/constants";

export function generateAlternates(
  locale: Locale, // 1-argument locale bo'lishi kerak
  path = "",
  sharedParams?: Record<string, string>,
) {
  const formattedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";

  // Joriy tilga mos canonical URL'ni shu yerning o'zida yasaymiz
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const canonicalUrl = `${SITE_URL}${prefix}${formattedPath}`;

  const getPrefix = (loc: Locale) =>
    loc === routing.defaultLocale ? "" : `/${loc}`;

  const xDefault = new URL(`${SITE_URL}${formattedPath}`);
  if (sharedParams) {
    Object.entries(sharedParams).forEach(([k, v]) =>
      xDefault.searchParams.set(k, v),
    );
  }

  return {
    canonical: canonicalUrl, // Endi undefined bo'lmaydi
    languages: {
      ...Object.fromEntries(
        routing.locales.map((loc) => {
          const url = new URL(`${SITE_URL}${getPrefix(loc)}${formattedPath}`);
          if (sharedParams) {
            Object.entries(sharedParams).forEach(([k, v]) =>
              url.searchParams.set(k, v),
            );
          }
          return [HREFLANG_LOCALES[loc], url.toString()];
        }),
      ),
      "x-default": xDefault.toString(),
    },
  };
}

export function getLocaleUrl(locale: string, path: string = "") {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${prefix}${formattedPath === "/" ? "" : formattedPath}`;
}
