import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { generatePrivateMetadata } from "@/lib/metadata";
import { type Locale, Link, redirect } from "@/i18n/routing";

import LoginForm from "@/components/auth/LoginForm";
import { cookies } from "next/headers";

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
    <main className="min-h-screen bg-background row-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            sahif
          </Link>
        </div>
        <div className="rounded-lg bg-card border border-foreground/10 p-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
