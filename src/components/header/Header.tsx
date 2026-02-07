import Image from "next/image";
import { Link } from "@/i18n/routing";
import { images } from "@/data/images";
import { useTranslations } from "next-intl";
import ThemeToggle from "../theme/Theme";
import LangSwitcher from "../lang/Lang";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons/icon";
import Location from "@/components/location/Location";

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

        <Location />

        <div className="flex w-100 items-center bg-card h-10 rounded-lg hover:bg-card-hover focus-within:bg-card-hover transition-all px-4">
          <Icon name="search" size={16} className="mr-2" />
          <input
            type="text"
            name="search-book"
            placeholder={t("searchBook")}
            className="flex-1 h-full bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="flex items-center">
        <ThemeToggle />
        <LangSwitcher />

        <Link href="/login">
          <Button
            leftIcon="login"
            className="bg-card hover:bg-card-hover h-10 px-4"
          >
            {tCommon("login")}
          </Button>
        </Link>
      </div>
    </header>
  );
}
