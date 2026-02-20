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
    title: `${t("pages.login")} | sahif`,
    openGraph: {
      title: `${t("pages.login")} | sahif`,
    },
  };
}

export default function Login() {
  return <div>Login</div>;
}
