import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";
import { SITE_URL } from "@/constants";
import { cookies } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });
  const title = `sahif | ${t("home.metadata.title")}`;

  return {
    title,
    description: t("description"),
    applicationName: "sahif",
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        uz: `${SITE_URL}/uz`,
        ru: `${SITE_URL}/ru`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/uz`,
      },
    },
    openGraph: {
      title: title,
      description: t("description"),
      url: `${SITE_URL}/${locale}`,
      siteName: "sahif",
      locale: locale,
      type: "website",
      images: [{ url: `${SITE_URL}/logo.png`, width: 512, height: 512 }],
    },
    twitter: {
      card: "summary",
      title,
      description: t("description"),
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

  const themeCookie = cookieStore.get("theme")?.value || "system";
  const resolvedThemeCookie = cookieStore.get("theme-resolved")?.value;

  let initialTheme = themeCookie;
  if (themeCookie === "system" && resolvedThemeCookie) {
    initialTheme = resolvedThemeCookie;
  } else if (themeCookie === "system") {
    initialTheme = "";
  }

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
