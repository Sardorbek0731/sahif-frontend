import type { Metadata } from "next";
import { SITE_URL, OG_LOCALES } from "@/constants";
import { type Locale } from "@/i18n/routing";

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
      follow: false,
      googleBot: { index: false, follow: false },
    },
    openGraph: {
      title: `${title} | sahif`,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: "sahif",
      locale: OG_LOCALES[locale],
      type: "website",
      images: [
        {
          url: "/logo.png",
          width: 512,
          height: 512,
          alt: "sahif logo",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${title} | sahif`,
      description,
      images: ["/logo.png"],
    },
  };
}
