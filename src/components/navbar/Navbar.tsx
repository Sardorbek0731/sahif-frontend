import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Categories from "../categories/Categories";
import Search from "../search/Search";
import { Logo } from "@/data/Logo";

export default function Navbar() {
  const tPages = useTranslations("pages");

  return (
    <nav className="my-container row-between">
      <Link className="mr-4 flex items-center" href="/">
        <Logo className="mr-4 w-10 h-10" />
        <span className="font-asimovian text-2xl">sahif</span>
      </Link>

      <Categories />
      <Search />

      <div className="flex items-center">
        <Link href="/wishlist" className="mr-4">
          <Button
            leftIcon="wishlist"
            className="bg-card hover:bg-card-hover h-10 px-4"
          >
            {tPages("wishlist")}
          </Button>
        </Link>

        <Link href="/cart" className="mr-4">
          <Button
            leftIcon="cart"
            className="bg-card hover:bg-card-hover h-10 px-4"
          >
            {tPages("cart")}
          </Button>
        </Link>

        <Link href="/login">
          <Button
            leftIcon="login"
            className="bg-card hover:bg-card-hover h-10 px-4"
          >
            {tPages("login")}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
