import Image from "next/image";
import { Link } from "@/i18n/routing";
import { images } from "@/data/images";
import { useTranslations } from "next-intl";
import ThemeToggle from "../theme/Theme";
import LangSwitcher from "../lang/Lang";

export default function Header() {
  const t = useTranslations("header");
  const tCommon = useTranslations("common");

  return (
    <header className="my-container py-3 flex items-center justify-between">
      <div className="flex items-center">
        <Link className="flex items-center mr-12" href="/">
          <Image className="mr-3 w-9 h-9" src={images.logo} alt="Sahif logo" />
          <span className="font-asimovian text-2xl">sahif</span>
        </Link>

        <span className="flex items-center h-10 bg-card px-4 mr-3 rounded-lg cursor-pointer hover:bg-[#ebebed] dark:hover:bg-[#282828] transition-all">
          {t("location")}: Khorezm
        </span>

        <div className="relative flex items-center">
          <svg
            xmlns="http://www.w3.org"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 absolute left-3"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder={t("search")}
            className="h-10 bg-card pl-10 pr-4 rounded-lg outline-none border-none focus:bg-[#ebebed] hover:bg-[#ebebed] dark:hover:bg-[#282828] transition-all w-100"
          />
        </div>
      </div>

      <div className="flex items-center">
        <ThemeToggle />
        <LangSwitcher />
        <Link
          href="/login"
          className="flex items-center h-10 bg-card px-4 rounded-lg hover:bg-[#ebebed] dark:hover:bg-[#282828] transition-all active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 mr-2"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" x2="3" y1="12" y2="12" />
          </svg>

          <span>{tCommon("login")}</span>
        </Link>
      </div>
    </header>
  );
}
