import type { Metadata } from "next";

import { OG_LOCALES } from "@/constants";
import { type Locale } from "@/i18n/routing";

export function generatePrivateMetadata({
  title,
  description,
  url,
  locale,
}: {
  title: string;
  description: string;
  url: string;
  locale: Locale;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    openGraph: {
      title: `${title} | sahif`,
      description,
      url,
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
