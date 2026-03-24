import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { generatePrivateMetadata } from "@/lib/metadata";
import { type Locale } from "@/i18n/routing";
import { getLocaleUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  return generatePrivateMetadata({
    title: `${t("pages.profile")} | sahif`,
    description: t("description"),
    url: getLocaleUrl(locale, "/profile"),
    locale,
  });
}

export default function Profile() {
  return <main className="my-container">Profile</main>;
}
