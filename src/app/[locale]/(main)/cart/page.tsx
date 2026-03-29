import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { generatePrivateMetadata } from "@/lib/metadata";
import { getLocaleUrl } from "@/lib/seo";
import { type Locale } from "@/i18n/routing";

import CartContent from "@/components/cart/CartContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  return generatePrivateMetadata({
    title: t("pages.cart"),
    description: t("cart.metadata.description"),
    url: getLocaleUrl(locale, "/cart"),
    locale,
  });
}

export default function Cart() {
  return (
    <main className="my-container">
      <CartContent />
    </main>
  );
}
