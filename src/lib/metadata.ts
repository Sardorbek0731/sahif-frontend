import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, OG_LOCALES } from "@/constants";
import { type Locale } from "@/i18n/routing";
import { LOGO_OG_IMAGE } from "@/lib/seo";

export function generatePrivateMetadata({
  title,
  description,
  locale,
  path,
}: {
  title: string;
  description: string;
  locale: Locale;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}${path}`,
    },
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale],
      type: "website",
      images: [LOGO_OG_IMAGE],
    },
    twitter: {
      card: "summary",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [LOGO_OG_IMAGE.url],
    },
  };
}
