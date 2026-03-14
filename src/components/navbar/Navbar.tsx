import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Categories from "../categories/Categories";
import Search from "../search/Search";
import { Logo } from "@/data/Logo";

export default function Navbar() {
  const tPages = useTranslations("pages");

  const navLinks = [
    {
      href: "/wishlist",
      icon: "wishlist",
      label: tPages("wishlist"),
      mr: true,
    },
    { href: "/cart", icon: "cart", label: tPages("cart"), mr: true },
    { href: "/login", icon: "login", label: tPages("login"), mr: false },
  ] as const;

  return (
    <nav className="my-container row-between">
      <Link href="/" className="mr-4 flex items-center">
        <Logo className="mr-2 w-10 h-10" />
        <span className="font-asimovian text-2xl">sahif</span>
      </Link>

      <Categories />
      <Search />

      <div className="flex items-center">
        {navLinks.map(({ href, icon, label, mr }) => (
          <Button
            as={Link}
            key={href}
            href={href}
            leftIcon={icon}
            className={`bg-card hover:bg-card-hover h-10 px-4 ${mr ? "mr-4" : ""}`}
          >
            {label}
          </Button>
        ))}
      </div>
    </nav>
  );
}
