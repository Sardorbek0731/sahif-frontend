import type { Metadata } from "next";

import { SITE_URL, OG_LOCALES } from "@/constants";

export function generatePrivateMetadata({
  title,
  description,
  url,
  locale,
}: {
  title: string;
  description: string;
  url: string;
  locale: string;
}): Metadata {
  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "sahif",
      locale: OG_LOCALES[locale] ?? locale,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
          alt: "sahif logo",
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [`${SITE_URL}/logo.png`],
    },
  };
}
