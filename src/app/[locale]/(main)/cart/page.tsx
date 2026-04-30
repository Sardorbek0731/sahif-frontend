import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { generatePrivateMetadata } from "@/lib/seo";
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
    path: "/cart",
    locale,
  });
}

export default async function Cart() {
  // ✅ Guest users can use cart (stored in localStorage via zustand)
  // TODO: Backend integration:
  // - Get user with getOptionalAuth()
  // - Fetch user cart from database
  // - Pass user and userCart to CartContent
  // - Merge localStorage cart with database cart
  // - Sync merged cart back to database

  return (
    <main className="my-container">
      <CartContent />
    </main>
  );
}
