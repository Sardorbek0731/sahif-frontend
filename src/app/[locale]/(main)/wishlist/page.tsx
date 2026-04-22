import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { generatePrivateMetadata } from "@/lib/seo";
import { type Locale } from "@/i18n/routing";

import WishlistContent from "@/components/wishlist/WishlistContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  return generatePrivateMetadata({
    title: t("pages.wishlist"),
    description: t("wishlist.metadata.description"),
    path: "/wishlist",
    locale,
  });
}

export default function Wishlist() {
  return (
    <main className="my-container">
      <WishlistContent />
    </main>
  );
}
