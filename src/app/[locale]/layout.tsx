import "./globals.css";

import type { Metadata } from "next";

import { cookies } from "next/headers";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/providers/theme";
import { SITE_URL, GOOGLE_VERIFICATION } from "@/constants";
import { getInitialTheme } from "@/lib/theme";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  const title = "sahif";
  const description = t("description");

  return {
    metadataBase: new URL(SITE_URL),
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

  const initialTheme = getInitialTheme(cookieStore);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "sahif",
    alternateName: ["Sahif", new URL(SITE_URL).hostname],
    url: `${SITE_URL}/${locale}`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/${locale}/books?search={search_term_string}`,
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
