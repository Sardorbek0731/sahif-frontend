import "./globals.css";

import type { Metadata } from "next";

import { cookies } from "next/headers";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { type Locale, routing } from "@/i18n/routing";
import { ThemeProvider } from "@/providers/theme";
import {
  SITE_URL,
  GOOGLE_VERIFICATION,
  SITE_HOSTNAME,
  OG_LOCALES,
} from "@/constants";
import { getInitialTheme } from "@/lib/theme";
import { generateAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  const title = "sahif";
  const description = t("description");

  const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: "sahif",
    alternates: generateAlternates(locale as Locale),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${localePrefix}`,
      siteName: "sahif",
      locale: OG_LOCALES[locale as Locale],
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
  src: "../../assets/fonts/Asimovian-Regular.ttf",
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
  const t = await getTranslations({ locale });

  const initialTheme = getInitialTheme(cookieStore);

  const path = "";
  const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "sahif",
    alternateName: ["Sahif", SITE_HOSTNAME],
    url: `${SITE_URL}${localePrefix}${path}`,
    inLanguage: locale,
    description: t("description"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}${localePrefix}/books?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${asimovian.variable} ${initialTheme === "dark" ? "dark" : ""}`}
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
