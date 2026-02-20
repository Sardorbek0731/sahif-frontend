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

  return {
    title: `sahif | ${t("home.metadata.title")}`,
    openGraph: {
      title: `sahif | ${t("home.metadata.title")}`,
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
