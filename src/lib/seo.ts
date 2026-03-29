import { type Locale, routing } from "@/i18n/routing";
import { SITE_URL, HREFLANG_LOCALES } from "@/constants";

export function generateAlternates(
  locale: Locale,
  path = "",
  sharedParams?: Record<string, string>,
) {
  const formattedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";

  const canonicalUrl = `${SITE_URL}/${locale}${formattedPath}`;

  const languages = Object.fromEntries(
    routing.locales.map((loc) => {
      const url = new URL(`${SITE_URL}/${loc}${formattedPath}`);
      if (sharedParams) {
        Object.entries(sharedParams).forEach(([k, v]) =>
          url.searchParams.set(k, v),
        );
      }
      return [HREFLANG_LOCALES[loc], url.toString()];
    }),
  );

  const xDefault = new URL(
    `${SITE_URL}/${routing.defaultLocale}${formattedPath}`,
  );

  if (sharedParams) {
    Object.entries(sharedParams).forEach(([k, v]) =>
      xDefault.searchParams.set(k, v),
    );
  }

  return {
    canonical: canonicalUrl,
    languages: {
      ...languages,
      "x-default": xDefault.toString(),
    },
  };
}
