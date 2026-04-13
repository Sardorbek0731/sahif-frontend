import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { OG_LOCALES, SITE_NAME } from "@/constants";
import { type Locale } from "@/i18n/routing";
import { LOGO_OG_IMAGE } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "notFound" });

  const description = t("description");

  return {
    title: "404",
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
      title: `404 | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale],
      type: "website",
      images: [LOGO_OG_IMAGE],
    },
    twitter: {
      card: "summary",
      title: `404 | ${SITE_NAME}`,
      description,
      images: [LOGO_OG_IMAGE.url],
    },
  };
}

export default function CatchAllPage() {
  notFound();
}
