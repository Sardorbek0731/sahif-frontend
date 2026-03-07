import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "notFound" });

  const baseUrl = "https://sahif.vercel.app";

  return {
    title: `404 | sahif`,
    description: t("description"),
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: `404 | sahif`,
      description: t("description"),
      url: `${baseUrl}/${locale}/404`,
      images: [{ url: `${baseUrl}/logo.png`, width: 512, height: 512 }],
    },
    twitter: {
      title: `404 | sahif`,
      card: "summary",
      description: t("description"),
      images: [`${baseUrl}/logo.png`],
    },
  };
}

export default function CatchAllPage() {
  notFound();
}
