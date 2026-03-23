"use client";

import { useSyncExternalStore } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslations } from "next-intl";
import { subscribe, getClientSnapshot, getServerSnapshot } from "@/lib/hooks";
import { IconName } from "../ui/icons";

interface NavLink {
  href: string;
  icon: IconName;
  label: string;
  mr: boolean;
  count?: number;
}

export default function NavLinks() {
  const tPages = useTranslations("pages");

  const isMounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const cartCount = useCartStore((s) => s.totalUniqueItems());
  const wishlistCount = useWishlistStore((s) => s.totalItems());
  const { isAuthenticated, user } = useAuthStore();

  const navLinks: NavLink[] = [
    {
      href: "/wishlist",
      icon: "wishlist",
      label: tPages("wishlist"),
      mr: true,
      count: isMounted ? wishlistCount : 0,
    },
    {
      href: "/cart",
      icon: "cart",
      label: tPages("cart"),
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

      {isMounted && isAuthenticated ? (
        <Button
          as={Link}
          href="/profile"
          leftIcon="user"
          className="relative bg-card hover:bg-card-hover h-10 px-4"
        >
          {user?.name}
        </Button>
      ) : (
        <Button
          as={Link}
          href="/login"
          leftIcon="login"
          className="relative bg-card hover:bg-card-hover h-10 px-4"
        >
          {tPages("login")}
        </Button>
      )}
    </div>
  );
}
