import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "notFound" });

  const title = `404 | sahif`;

  return {
    title,
    description: t("description"),
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
      description: t("description"),
      url: `${SITE_URL}/${locale}/404`,
      images: [{ url: `${SITE_URL}/logo.png`, width: 512, height: 512 }],
    },
    twitter: {
      title,
      card: "summary",
      description: t("description"),
      images: [`${SITE_URL}/logo.png`],
    },
  };
}

export default function CatchAllPage() {
  notFound();
}
