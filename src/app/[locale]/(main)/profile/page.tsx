import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { generatePrivateMetadata } from "@/lib/seo";
import { type Locale } from "@/i18n/routing";
import { requireAuth } from "@/lib/auth";
import DeleteAccountButton from "@/components/profile/DeleteAccountButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  return generatePrivateMetadata({
    title: t("pages.profile"),
    description: t("profile.metadata.description"),
    path: "/profile",
    locale,
  });
}

export default async function Profile() {
  // ✅ Defense in Depth: Second layer of protection
  const user = await requireAuth();

  return (
    <main className="my-container py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* User Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Name:</span> {user.firstName}{" "}
              {user.lastName}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">User ID:</span> {user.id}
            </p>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
          <p className="text-sm text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <DeleteAccountButton />
        </div>
      </div>
    </main>
  );
}
