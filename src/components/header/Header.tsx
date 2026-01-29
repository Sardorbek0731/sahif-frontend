import Image from "next/image";
import { Link } from "@/i18n/routing";
import { images } from "@/data/images";
import { useTranslations } from "next-intl";
import ThemeToggle from "../theme/Theme";
import LangSwitcher from "../lang/Lang";

export default function Header() {
  const t = useTranslations("header");

  return (
    <header className="my-container py-3">
      <Link className="flex items-center" href="/">
        <Image className="mr-3 w-10 h-10" src={images.logo} alt="Sahif logo" />
        <span className="font-asimovian text-3xl leading-none">sahif</span>
      </Link>
      <span className="flex items-center h-10 bg-card px-4 rounded-lg cursor-pointer hover:bg-[#ebebed] dark:hover:bg-[#282828] transition-all">
        {t("location")}: Khorezm
      </span>
      <div className="flex items-center">
        <ThemeToggle />
        <LangSwitcher />
      </div>
    </header>
  );
}
