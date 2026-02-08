import { Link } from "@/i18n/routing";
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
    <header className="my-container py-4 mb-4">
      <div className="flex items-center">
        <Location />

        <div className="flex w-90 items-center mr-3 bg-card h-10 rounded-lg hover:bg-card-hover focus-within:bg-card-hover transition-all px-4">
          <Icon name="search" size={16} className="mr-2" />
          <input
            type="text"
            name="search-book"
            placeholder={t("searchBook")}
            className="flex-1 h-full bg-transparent outline-none"
          />
        </div>

        <Link href="/wishlist">
          <Button
            leftIcon="wishlist"
            className="bg-card hover:bg-card-hover h-10 px-4 mr-3"
          >
            {t("wishlist")}
          </Button>
        </Link>

        <Link href="/cart">
          <Button
            leftIcon="cart"
            className="bg-card hover:bg-card-hover h-10 px-4"
          >
            {t("cart")}
          </Button>
        </Link>
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
