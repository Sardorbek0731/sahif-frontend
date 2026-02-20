import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const baseUrl = "https://sahif.vercel.app";
  const title = `${t("pages.books")} | sahif`;

  return {
    title: title,
    openGraph: {
      title: title,
      description: t("description"),
      url: `${baseUrl}/${locale}/books`, 
      siteName: "sahif",
      locale: locale,  
      type: "website",
      images: [
        {
          url: `${baseUrl}/icon.png`,
          width: 829,
          height: 829,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: t("description"),
      images: [`${baseUrl}/icon.png`],
    },
  };
}

export default function Books() {
  return <div>Books</div>;
}
