import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import { generatePrivateMetadata } from "@/lib/metadata";
import { type Locale } from "@/i18n/routing";
import { redirect } from "@/i18n/navigation";

import LoginRedirect from "@/components/auth/LoginRedirect";
import LoginFormClient from "@/components/auth/LoginFormClient";

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
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (token) {
    redirect({ href: "/", locale });
  }

  return (
    <main className="min-h-screen bg-background row-center">
      <LoginRedirect />
      <div className="max-w-90 p-6 rounded-lg">
        <LoginFormClient />
      </div>
    </main>
  );
}
