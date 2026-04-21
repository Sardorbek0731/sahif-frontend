"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

import { type Locale } from "@/i18n/routing";
import { useRouter, usePathname } from "@/i18n/navigation";
import { LANGUAGE_NAMES } from "@/constants/index";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { Icon } from "@/components/ui/icons";
import { setCookie } from "@/lib/cookies";
import { useIsMounted } from "@/hooks/useIsMounted";

// ─── LanguageSwitcher ─────────────────────────────────────────────────────────

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const currentLanguage =
    LANGUAGE_NAMES.find((l) => l.code === locale) || LANGUAGE_NAMES[0];

  const changeLanguage = (newLocale: Locale) => {
    setOpen(false);
    const query = Object.fromEntries(searchParams.entries());
    router.replace({ pathname, query }, { locale: newLocale, scroll: false });
  };

  return (
    <Dropdown
      arrowPosition="right"
      align="right"
      isOpen={open}
      onToggle={setOpen}
      trigger={(isOpen) => (
        <Button
          rightIcon="chevronDown"
          iconStyle={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          className="justify-between px-4 h-10 bg-card hover:bg-card-hover"
        >
          <Icon name={currentLanguage.code} size={16} className="mr-2" />
          {currentLanguage.name}
        </Button>
      )}
    >
      <div role="listbox" className="py-2">
        {LANGUAGE_NAMES.filter((lang) => lang.code !== locale).map((lang) => (
          <Button
            role="option"
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="w-full mb-1 px-4 h-10 hover:bg-card-hover rounded-none"
          >
            <Icon name={lang.code} size={16} className="mr-2" />
            {lang.name}
          </Button>
        ))}
      </div>
    </Dropdown>
  );
}

// ─── ThemeToggle ──────────────────────────────────────────────────────────────

type ThemeMode = "light" | "dark" | "system";

const THEME_ICONS: Record<ThemeMode, "sun" | "moon" | "monitor"> = {
  light: "sun",
  dark: "moon",
  system: "monitor",
};

const THEME_MODES: ThemeMode[] = ["light", "dark", "system"];

export function ThemeToggle({ initialTheme }: { initialTheme: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isMounted = useIsMounted();
  const [open, setOpen] = useState(false);
  const t = useTranslations("header.theme");

  // Cookie ga saqlash — hozirgi logika o'zgarishsiz
  useEffect(() => {
    if (!theme || !resolvedTheme) return;
    setCookie("theme", theme);
    setCookie("theme-resolved", resolvedTheme);
  }, [theme, resolvedTheme]);

  const currentTheme = (isMounted ? theme : initialTheme) as ThemeMode;
  const activeIcon = THEME_ICONS[currentTheme] ?? "sun";
  const activeLabel = t(currentTheme);
  const options = THEME_MODES.filter((m) => m !== currentTheme);

  const handleSelect = (value: ThemeMode) => {
    setOpen(false);
    setTheme(value);
  };

  return (
    <Dropdown
      arrowPosition="right"
      align="right"
      isOpen={open}
      onToggle={setOpen}
      trigger={(isOpen) => (
        <Button
          rightIcon="chevronDown"
          iconStyle={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          className="justify-between px-4 h-10 bg-card hover:bg-card-hover"
        >
          <Icon name={activeIcon} size={16} className="mr-2" />
          {activeLabel}
        </Button>
      )}
    >
      <div role="listbox" className="py-2">
        {options.map((value) => (
          <Button
            role="option"
            key={value}
            onClick={() => handleSelect(value)}
            className="w-full mb-1 px-4 h-10 hover:bg-card-hover rounded-none"
          >
            <Icon name={THEME_ICONS[value]} size={16} className="mr-2" />
            {t(value)}
          </Button>
        ))}
      </div>
    </Dropdown>
  );
}
