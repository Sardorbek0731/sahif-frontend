import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { SITE_URL, OG_LOCALES } from "@/constants";
import { type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "notFound" });

  const title = `404 | sahif`;
  const description = t("description");

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/404`,
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
      title,
      card: "summary",
      description,
      images: [`${SITE_URL}/logo.png`],
    },
  };
}

export default function CatchAllPage() {
  notFound();
}
