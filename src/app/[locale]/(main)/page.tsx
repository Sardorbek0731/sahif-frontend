import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/routing";
import { OG_LOCALES, SITE_URL, SITE_NAME } from "@/constants";
import { generateAlternates } from "@/lib/seo";

import Hero from "@/components/home/Hero";
import HomeBooks from "@/components/home/HomeBooks";
import HomeAuthors from "@/components/home/HomeAuthors";
import Features from "@/components/home/Features";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  const title = t("home.metadata.title");
  const description = t("description");

  return {
    title,
    description,
    icons: {
      icon: [
        { url: `${SITE_URL}/logo.png`, sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: `${SITE_URL}/logo.png`, sizes: "512x512", type: "image/png" },
      ],
    },
    alternates: generateAlternates(locale, ""),
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale],
      type: "website",
      images: [
        {
          url: `${SITE_URL}/logo.png`,
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
      description,
      images: [`${SITE_URL}/logo.png`],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <main className="my-container">
      <Hero />
      <HomeBooks locale={locale} />
      <HomeAuthors locale={locale} />
      <Features />
    </main>
  );
}
