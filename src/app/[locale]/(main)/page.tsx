import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/routing";
import { OG_LOCALES, SITE_URL, SITE_NAME } from "@/constants";
import { generateAlternates } from "@/lib/seo";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  const title = t("home.metadata.title");

  return {
    title,
    alternates: generateAlternates(locale, ""),
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale],
      type: "website",
      images: [
        {
          url: "/logo.png",
          width: 512,
          height: 512,
          alt: `${SITE_NAME} logo`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${title} | ${SITE_NAME}`,
      images: ["/logo.png"],
    },
  };
}

export default async function Home() {
  return (
    <main className="my-container">
      <Hero />
      <Features />
    </main>
  );
}
