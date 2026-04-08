"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { useCartStore, selectTotalUniqueItems } from "@/store/useCartStore";
import { useWishlistStore, selectTotalItems } from "@/store/useWishlistStore";
import { useTranslations } from "next-intl";
import { useIsMounted } from "@/hooks/useIsMounted";
import { IconName } from "../ui/icons";

interface NavLink {
  href: string;
  icon: IconName;
  label: string;
  mr: boolean;
  count?: number;
}

export default function NavLinks() {
  const t = useTranslations("");
  const isMounted = useIsMounted();

  const cartCount = useCartStore(selectTotalUniqueItems);
  const wishlistCount = useWishlistStore(selectTotalItems);

  const navLinks: NavLink[] = [
    {
      href: "/wishlist",
      icon: "wishlist",
      label: t("pages.wishlist"),
      mr: true,
      count: isMounted ? wishlistCount : 0,
    },
    {
      href: "/cart",
      icon: "cart",
      label: t("pages.cart"),
      mr: true,
      count: isMounted ? cartCount : 0,
    },
  ];

  return (
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
  );
}
