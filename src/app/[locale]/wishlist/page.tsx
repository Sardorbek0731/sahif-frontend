import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/constants";
import { generatePrivateMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });
  const title = `${t("pages.wishlist")} | sahif`;

  return generatePrivateMetadata({
    title,
    description: t("description"),
    url: `${SITE_URL}/${locale}/wishlist`,
    locale,
  });
}

export default function Wishlist() {
  return <div>Wishlist</div>;
}
