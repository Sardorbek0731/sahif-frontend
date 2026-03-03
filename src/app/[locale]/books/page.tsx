import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { category } = await searchParams;

  const t = await getTranslations({ locale });
  const categoryTranslations = await getTranslations({
    locale,
    namespace: "categories",
  });

  const baseUrl = "https://sahif.vercel.app";
  const categoryName = category
    ? categoryTranslations(`items.${category}.name`)
    : null;
  const title = `${categoryName || t("pages.books")} | sahif`;

  return {
    title,
    description: t("description"),
    applicationName: "sahif",
    alternates: {
      canonical: `${baseUrl}/${locale}/books${category ? `?category=${category}` : ""}`,
    },
    openGraph: {
      title,
      description: t("description"),
      url: `${baseUrl}/${locale}/books${category ? `?category=${category}` : ""}`,
      siteName: "sahif",
      locale,
      type: "website",
      images: [{ url: `${baseUrl}/logo.png`, width: 512, height: 512 }],
    },
    twitter: {
      card: "summary",
      title,
      description: t("description"),
      images: [`${baseUrl}/logo.png`],
    },
  };
}

export default async function Books({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const currentCategory = params.category;

  return (
    <div className="my-container py-10">
      <h1 className="text-3xl font-bold">
        {currentCategory ? `Kategoriya: ${currentCategory}` : "Barcha kitoblar"}
      </h1>
    </div>
  );
}
