import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/routing";

import { SITE_URL, OG_LOCALES } from "@/constants";
import { generateAlternates, getLocaleUrl } from "@/lib/seo";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });
  const title = `sahif | ${t("home.metadata.title")}`;
  const description = t("description");
  const url = getLocaleUrl(locale);

  return {
    title,
    description,
    alternates: generateAlternates(locale),
    openGraph: {
      title,
      description,
      url,
      siteName: "sahif",
      locale: OG_LOCALES[locale],
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

export default async function Home() {
  return (
    <main className="my-container">
      <Hero />
      <Features />
    </main>
  );
}
