import { type Metadata } from "next";
import { type Locale, routing } from "@/i18n/routing";
import { SITE_URL, SITE_NAME, HREFLANG_LOCALES } from "@/constants";

export function generateAlternates(
  locale: Locale,
  path = "",
  sharedParams?: Record<string, string>,
) {
  const formattedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";

  const canonicalBase = new URL(`${SITE_URL}/${locale}${formattedPath}`);
  if (sharedParams) {
    Object.entries(sharedParams).forEach(([k, v]) =>
      canonicalBase.searchParams.set(k, v),
    );
  }
  const canonicalUrl = canonicalBase.toString();

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

export const LOGO_OG_IMAGE = {
  url: `${SITE_URL}/logo.png`,
  width: 512,
  height: 512,
  alt: `${SITE_NAME} logo`,
  type: "image/png",
};

export const SITE_ICONS: Metadata["icons"] = {
  icon: [{ url: `${SITE_URL}/logo.png`, sizes: "512x512", type: "image/png" }],
  apple: [{ url: `${SITE_URL}/logo.png`, sizes: "512x512", type: "image/png" }],
};

export function getPriceValidUntil(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}
