import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  return {
    title: `${t("pages.books")} | sahif`,
    openGraph: {
      title: `${t("pages.books")} | sahif`,
    },
  };
}

export default function Books() {
  return <div>Books</div>;
}
