import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/providers/theme";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const asimovian = localFont({
  src: "../../../public/fonts/Asimovian-Regular.ttf",
  variable: "--font-asimovian",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: "sahif",
      template: "%s | sahif",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value || "system";
  const resolvedThemeCookie = cookieStore.get("theme-resolved")?.value;

  let initialTheme = themeCookie;
  if (themeCookie === "system" && resolvedThemeCookie) {
    initialTheme = resolvedThemeCookie;
  } else if (themeCookie === "system") {
    initialTheme = "";
  }

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${asimovian.variable} ${initialTheme === "dark" ? "dark" : ""}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
