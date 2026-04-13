import "./globals.css";

import type { Metadata } from "next";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/providers/theme";
import {
  SITE_URL,
  SITE_NAME,
  GOOGLE_VERIFICATION,
  OG_LOCALES,
} from "@/constants";
import { getResolvedTheme } from "@/lib/theme";
import { SITE_ICONS, LOGO_OG_IMAGE } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  const description = t("description");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${SITE_NAME}`,
      default: SITE_NAME,
    },
    description,
    applicationName: SITE_NAME,
    icons: SITE_ICONS,
    openGraph: {
      title: SITE_NAME,
      description,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale as Locale],
      type: "website",
      images: [LOGO_OG_IMAGE],
    },
    twitter: {
      card: "summary",
      title: SITE_NAME,
      description,
      images: [LOGO_OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    verification: {
      google: GOOGLE_VERIFICATION,
    },
  };
}

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const asimovian = localFont({
  src: "../../assets/fonts/Asimovian/Asimovian-Regular.ttf",
  variable: "--font-asimovian",
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = await getMessages();
  const cookieStore = await cookies();

  const resolvedTheme = getResolvedTheme(cookieStore);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${asimovian.variable} ${resolvedTheme === "dark" ? "dark" : ""}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
