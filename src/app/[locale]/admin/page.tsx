import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { generatePrivateMetadata } from "@/lib/metadata";
import { type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  return generatePrivateMetadata({
    title: t("pages.admin"),
    description: t("admin.metadata.description"),
    path: "/admin",
    locale,
  });
}

export default function Admin() {
  return <main>Admin</main>;
}
