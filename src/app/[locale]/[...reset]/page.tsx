import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { SITE_URL } from "@/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "notFound" });

  const title = `404 | sahif`;
  const description = t("description");

  return {
    title,
    description,
    applicationName: "sahif",
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
