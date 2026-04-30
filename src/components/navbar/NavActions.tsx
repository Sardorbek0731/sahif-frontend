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

  const menuItems = [
    { href: "/profile", icon: "user", label: t("pages.profile") },
  ] as const;

  return (
    <Dropdown
      arrowPosition="right"
      align="right"
      isOpen={open}
      onToggle={setOpen}
      trigger={
        <Button leftIcon="user" className="h-10 px-4">
          {displayName}
        </Button>
      }
    >
      <div className="w-48 overflow-hidden">
        {menuItems.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors"
          >
            <Icon name={icon} size="md" />
            {label}
          </Link>
        ))}

        <div className="border-t border-border" />

        <Button
          variant="danger"
          onClick={handleLogout}
          leftIcon="logout"
          className="w-full justify-start px-4 py-3 text-sm rounded-none h-auto"
        >
          {t("auth.logout")}
        </Button>
      </div>
    </Dropdown>
  );
}
