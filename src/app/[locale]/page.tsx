import type { Metadata } from "next";

import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";
import { SITE_URL } from "@/constants";
import { getInitialTheme } from "@/lib/theme";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });
  const title = `sahif | ${t("home.metadata.title")}`;
  const description = t("description");

  return {
    title,
    description,
    applicationName: "sahif",
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}`]),
        ),
        "x-default": `${SITE_URL}/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: "sahif",
      locale,
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function Home() {
  const cookieStore = await cookies();

  const initialTheme = getInitialTheme(cookieStore);

  const locCookie = cookieStore.get("location-id")?.value || "tashkent-city";
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
