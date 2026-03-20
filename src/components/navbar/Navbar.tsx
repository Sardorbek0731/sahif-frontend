import { Link } from "@/i18n/routing";
import Categories from "../categories/Categories";
import Search from "../search/Search";
import { Logo } from "@/data/Logo";
import NavLinks from "./NavLinks";

export default function Navbar() {
  return (
    <nav className="my-container row-between mb-4">
      <Link href="/" className="mr-4 flex items-center">
        <Logo className="mr-2 w-10 h-10" />
        <span className="font-asimovian text-2xl">sahif</span>
      </Link>

      <Categories />
      <Search />

      <div className="flex items-center">
        <NavLinks />
      </div>
    </nav>
  );
}
