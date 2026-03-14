import type { Metadata } from "next";

import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/routing";
import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";
import { SITE_URL, OG_LOCALES, DEFAULT_LOCATION_ID } from "@/constants";
import { getInitialTheme } from "@/lib/theme";
import { generateAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });
  const title = `sahif | ${t("home.metadata.title")}`;
  const description = t("description");

  return {
    title,
    description,
    alternates: generateAlternates(locale),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
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

export default async function Home() {
  const cookieStore = await cookies();

  const initialTheme = getInitialTheme(cookieStore);

  const locCookie =
    cookieStore.get("location-id")?.value || DEFAULT_LOCATION_ID;
  const confirmedCookie =
    cookieStore.get("location-confirmed")?.value === "true";

  return (
    <>
      <Header
        initialTheme={initialTheme}
        initialLocationId={locCookie}
        initialConfirmed={confirmedCookie}
      />
      <Navbar />
    </>
  );
}
