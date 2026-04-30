import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { isAuthenticated } from "@/lib/auth";

import { generatePrivateMetadata } from "@/lib/seo";
import { type Locale } from "@/i18n/routing";
import { redirect } from "@/i18n/navigation";

import LoginFormWrapper from "./LoginFormWrapper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  return generatePrivateMetadata({
    title: t("pages.login"),
    description: t("login.metadata.description"),
    path: "/login",
    locale,
  });
}

export default async function Login({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // ✅ Check authentication (better pattern)
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect({ href: "/", locale });
  }

  return (
    <main className="min-h-screen bg-background row-center">
      <div className="max-w-90 p-6 rounded-lg">
        <LoginFormWrapper />
      </div>
    </main>
  );
}
