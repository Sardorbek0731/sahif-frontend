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

export default async function Wishlist() {
  // ✅ Guest users can use wishlist (stored in localStorage via zustand)
  // TODO: Backend integration:
  // - Get user with getOptionalAuth()
  // - Fetch user wishlist from database
  // - Pass user and userWishlist to WishlistContent
  // - Merge localStorage wishlist with database wishlist
  // - Sync merged wishlist back to database

  return (
    <main className="my-container">
      <WishlistContent />
    </main>
  );
}
