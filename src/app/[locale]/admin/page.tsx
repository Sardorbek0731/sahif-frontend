import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { generatePrivateMetadata } from "@/lib/metadata";
import { getLocaleUrl } from "@/lib/seo";
import { type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  return generatePrivateMetadata({
    title: `${t("pages.admin")} | sahif`,
    description:t("admin.metadata.description"),
    url: getLocaleUrl(locale, "/admin"),
    locale,
  });
}

export default function Admin() {
  return <main>Admin</main>;
}
