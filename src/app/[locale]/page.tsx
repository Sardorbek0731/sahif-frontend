import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  const baseUrl = "https://sahif.vercel.app";
  const title = `sahif | ${t("home.metadata.title")}`;

  return {
    title: title,
    description: t("description"),
    openGraph: {
      title: title,
      description: t("description"),
      url: baseUrl,
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

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />
    </>
  );
}
