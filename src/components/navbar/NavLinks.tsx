"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslations } from "next-intl";
import { useIsMounted } from "@/hooks/useIsMounted";
import { IconName } from "../ui/icons";
import UserMenu from "@/components/navbar/UserMenu";
import LoginModal from "@/components/auth/LoginModal";

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

  const cartCount = useCartStore((s) => s.totalUniqueItems());
  const wishlistCount = useWishlistStore((s) => s.totalItems());
  const { isAuthenticated } = useAuthStore();
  const [loginOpen, setLoginOpen] = useState(false);

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

      {isMounted && isAuthenticated ? (
        <UserMenu />
      ) : (
        <>
          <Button
            leftIcon="login"
            onClick={() => setLoginOpen(true)}
            className="relative bg-card hover:bg-card-hover h-10 px-4"
          >
            {t("auth.login.title")}
          </Button>

          <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        </>
      )}
    </div>
  );
}
