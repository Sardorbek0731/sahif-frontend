"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { logout } from "@/app/actions/auth";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Dropdown } from "@/components/ui/Dropdown";
import { Icon, IconName } from "@/components/ui/icons";
import { useCartStore, selectTotalUniqueItems } from "@/store/useCartStore";
import { useWishlistStore, selectTotalItems } from "@/store/useWishlistStore";
import { useIsMounted } from "@/hooks/useIsMounted";

// ─── NavLinks ─────────────────────────────────────────────────────────────────

interface NavLinkItem {
  href: string;
  icon: IconName;
  label: string;
  mr: boolean;
  count?: number;
}

export function NavLinks() {
  const t = useTranslations("");
  const isMounted = useIsMounted();

  const cartCount = useCartStore(selectTotalUniqueItems);
  const wishlistCount = useWishlistStore(selectTotalItems);

  const navLinks: NavLinkItem[] = [
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
      mr: false,
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
          className={`relative h-10 px-4 hover:bg-card-hover transition-colors ${mr ? "mr-4" : ""}`}
        >
          {label}
          {typeof count === "number" && count > 0 && (
            <Badge variant="count" className="absolute -top-2 -right-2">
              {count}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
}

// ─── UserMenu ─────────────────────────────────────────────────────────────────

export function UserMenu({ serverUserName }: { serverUserName: string }) {
  const t = useTranslations("");
  const [open, setOpen] = useState(false);

  // ✅ Use server-provided user name
  const displayName = (() => {
    if (serverUserName) {
      const [first, last] = serverUserName.split(" ");
      const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);
      return last
        ? `${capitalize(first)} ${capitalize(last)[0]}.`
        : capitalize(first);
    }
    return "";
  })();

  const handleLogout = async () => {
    setOpen(false);
    // ✅ Server Action - xavfsiz logout
    await logout();
    // Router automatically redirects (logout action has redirect)
  };

  const handleProfileClick = () => {
    setOpen(false);
  };

  return (
    <Dropdown
      arrowPosition="right"
      align="right"
      isOpen={open}
      onToggle={setOpen}
      trigger={(isOpen) => (
        <Button
          leftIcon="user"
          rightIcon="chevronDown"
          iconStyle={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          className={`justify-between px-4 h-10 bg-card hover:bg-card-hover ${isOpen ? "bg-card-hover" : ""}`}
        >
          {displayName}
        </Button>
      )}
    >
      <div role="listbox" className="py-1">
        <Button
          as={Link}
          href="/profile"
          role="option"
          onClick={handleProfileClick}
          variant="ghost"
          className="w-full mb-1 px-4 h-10 rounded-none hover:bg-card-hover"
        >
          <div className="flex items-center">
            <Icon name="user" size="md" className="mr-2" />
            {t("pages.profile")}
          </div>
        </Button>

        <div className="border-t border-border my-1" />

        <Button
          role="option"
          onClick={handleLogout}
          variant="danger"
          className="w-full px-4 h-10 rounded-none hover:bg-rose-500/5"
        >
          <div className="flex items-center">
            <Icon name="logout" size="md" className="mr-2" />
            {t("auth.logout")}
          </div>
        </Button>
      </div>
    </Dropdown>
  );
}
