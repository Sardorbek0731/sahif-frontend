import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { generatePrivateMetadata } from "@/lib/metadata";
import { getLocaleUrl } from "@/lib/seo";
import { type Locale } from "@/i18n/routing";

import { Link } from "@/i18n/routing";

import LoginForm from "@/components/auth/LoginForm";
import LoginRedirect from "@/components/auth/LoginRedirect";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  return generatePrivateMetadata({
    title: `${t("pages.login")} | sahif`,
    description: t("login.metadata.description"),
    url: getLocaleUrl(locale, "/login"),
    locale,
  });
}

export default function Login() {
  return (
    <main className="min-h-screen bg-background row-center px-4">
      <LoginRedirect />
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
