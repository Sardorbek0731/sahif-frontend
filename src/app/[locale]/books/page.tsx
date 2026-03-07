import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/constants";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; search?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { category, search } = await searchParams;

  const t = await getTranslations({ locale });
  const tCategories = await getTranslations({
    locale,
    namespace: "categories",
  });

  let pageTitle = t("pages.books");
  if (search) pageTitle = search;
  else if (category) {
    try {
      pageTitle = tCategories(`items.${category}.name`);
    } catch {
      pageTitle = t("pages.books");
    }
  }
  const title = `${pageTitle} | sahif`;

  const query = new URLSearchParams();
  if (search) query.set("search", search);
  else if (category) query.set("category", category);
  const queryString = query.toString();
  const url = `${SITE_URL}/${locale}/books${queryString ? `?${queryString}` : ""}`;

  return {
    title,
    description: t("description"),
    applicationName: "sahif",
    alternates: { canonical: url },
    robots: {
      index: !search,
      follow: true,
      googleBot: {
        index: !search,
        follow: true,
      },
    },
    openGraph: {
      title,
      description: t("description"),
      url,
      siteName: "sahif",
      locale,
      type: "website",
      images: [{ url: `${SITE_URL}/logo.png`, width: 512, height: 512 }],
    },
    twitter: {
      card: "summary",
      title,
      description: t("description"),
      images: [`${SITE_URL}/logo.png`],
    },
  };
}

export default async function Books({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;

  let heading = "Barcha kitoblar";
  if (search) heading = `"${search}" bo‘yicha natijalar`;
  else if (category) heading = `Kategoriya: ${category}`;

  return (
    <div className="my-container py-10">
      <h1 className="text-3xl font-bold">{heading}</h1>
    </div>
  );
}
