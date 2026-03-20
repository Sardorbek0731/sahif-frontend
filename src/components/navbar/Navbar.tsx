import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Categories from "../categories/Categories";
import Search from "../search/Search";
import { Logo } from "@/data/Logo";
import { IconName } from "../ui/icons";

interface NavLink {
  href: string;
  icon: IconName;
  label: string;
  mr: boolean;
  count?: number;
}

export default function Navbar() {
  const tPages = useTranslations("pages");

  const navLinks: NavLink[] = [
    {
      href: "/wishlist",
      icon: "wishlist",
      label: tPages("wishlist"),
      mr: true,
      count: 0,
    },
    { href: "/cart", icon: "cart", label: tPages("cart"), mr: true, count: 0 },
    { href: "/login", icon: "login", label: tPages("login"), mr: false },
  ];

  return (
    <nav className="my-container row-between mb-4">
      <Link href="/" className="mr-4 flex items-center">
        <Logo className="mr-2 w-10 h-10" />
        <span className="font-asimovian text-2xl">sahif</span>
      </Link>

      <Categories />
      <Search />

      <div className="flex items-center">
        {navLinks.map(({ href, icon, label, mr, count }) => (
          <Button
            as={Link}
            key={href}
            href={href}
            leftIcon={icon}
            className={`relative bg-card hover:bg-card-hover h-10 px-4 ${mr ? "mr-4" : ""}`}
          >
            {label}

            {typeof count === "number" && (
              <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 row-center rounded-full bg-primary text-[10px] text-white">
                {count}
              </span>
            )}
          </Button>
        ))}
      </div>
    </nav>
  );
}
