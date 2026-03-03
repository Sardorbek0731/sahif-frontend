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
  const title = `${t("pages.login")} | sahif`;

  return {
    title,
    description: t("description"),
    applicationName: "sahif",
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description: t("description"),
      url: `${baseUrl}/${locale}/login`,
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

export default function Login() {
  return <div>Login</div>;
}
