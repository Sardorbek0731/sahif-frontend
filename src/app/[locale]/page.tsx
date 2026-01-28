import { useTranslations } from "next-intl";
import ThemeToggle from "@/components/theme/Buttons";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <>
      <h1>{t("title")}</h1>
      <ThemeToggle />
    </>
  );
}
