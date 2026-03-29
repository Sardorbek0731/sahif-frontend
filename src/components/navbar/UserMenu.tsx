"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { useAuthStore } from "@/store/useAuthStore";

export default function UserMenu({
  serverUserName,
}: {
  serverUserName: string;
}) {
  const t = useTranslations("");
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuthStore();

  const displayName =
    user?.name || (serverUserName ? decodeURIComponent(serverUserName) : "");

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-card border border-foreground/10 shadow-lg overflow-hidden z-50">
          {menuItems.map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-foreground/70 hover:text-foreground hover:bg-card-hover transition-colors"
            >
              <Icon name={icon} size={16} />
              {label}
            </Link>
          ))}

          <div className="border-t border-foreground/10" />

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
