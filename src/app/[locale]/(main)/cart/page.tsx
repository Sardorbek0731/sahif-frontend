import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { SITE_URL } from "@/constants";
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
    title: `${t("pages.cart")} | sahif`,
    description: t("description"),
    url: `${SITE_URL}/${locale}/cart`,
    locale,
  });
}

export default function Cart() {
  return <main className="my-container">Cart</main>;
}
