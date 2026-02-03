import Image from "next/image";
import { Link } from "@/i18n/routing";
import { images } from "@/data/images";
import { useTranslations } from "next-intl";
import ThemeToggle from "../theme/Theme";
import LangSwitcher from "../lang/Lang";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons/icon";

export default function Header() {
  const t = useTranslations("header");
  const tCommon = useTranslations("common");

  return (
    <header className="my-container py-3">
      <div className="flex items-center">
        <Link className="flex items-center mr-18" href="/">
          <Image className="mr-3 w-9 h-9" src={images.header.logo} alt="logo" />
          <span className="font-asimovian text-2xl">sahif</span>
        </Link>

        <Button leftIcon="location" className="mr-3">
          {t("location")}
        </Button>

        <div className="relative flex items-center">
          <Icon name="search" size={16} className="absolute left-3" />
          <input
            type="text"
            placeholder={t("search")}
            className="h-10 bg-card pl-10 pr-4 rounded-lg outline-none w-100 hover:bg-[#ebebed] dark:hover:bg-[#282828] focus:bg-[#ebebed] dark:focus:bg-[#282828] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center">
        <ThemeToggle />
        <LangSwitcher />

        <Link href="/login">
          <Button leftIcon="login">{tCommon("login")}</Button>
        </Link>
      </div>
    </header>
  );
}
