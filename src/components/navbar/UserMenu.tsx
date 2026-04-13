"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { useAuthStore } from "@/store/useAuthStore";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function UserMenu({
  serverUserName,
}: {
  serverUserName: string;
}) {
  const t = useTranslations("");
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const { users, activeUserId, logout } = useAuthStore();
  const user = users.find((u) => u.id === activeUserId) ?? null;

  const displayName = (() => {
    const firstName = user?.firstName || "";
    const lastName = user?.lastName || "";

    if (firstName && lastName)
      return `${capitalize(firstName)} ${capitalize(lastName)[0]}.`;
    if (firstName) return capitalize(firstName);

    if (serverUserName) {
      const [first, last] = serverUserName.split(" ");
      return last
        ? `${capitalize(first)} ${capitalize(last)[0]}.`
        : capitalize(first);
    }

    return "";
  })();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClick);
    return () => document.removeEventListener("pointerdown", handleClick);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
    router.push("/");
    router.refresh();
  };

  const menuItems = [
    { href: "/profile", icon: "user", label: t("pages.profile") },
  ] as const;

  return (
    <div ref={ref} className="relative">
      <Button
        leftIcon="user"
        onClick={() => setOpen((v) => !v)}
        className="relative bg-card hover:bg-card-hover h-10 px-4"
      >
        {displayName}
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-card border border-border shadow-lg overflow-hidden z-50">
          {menuItems.map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors"
            >
              <Icon name={icon} size={16} />
              {label}
            </Link>
          ))}

          <div className="border-t border-border" />

          <button
            onClick={handleLogout}
            className="w-full flex items-center cursor-pointer gap-3 px-4 py-3 text-sm text-rose-500 hover:bg-rose-500/5 transition-colors"
          >
            <Icon name="logout" size={16} />
            {t("auth.logout")}
          </button>
        </div>
      )}
    </div>
  );
}
