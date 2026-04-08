"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";

import { type Locale } from "@/i18n/routing";
import { useRouter, usePathname } from "@/i18n/navigation";
import { LANGUAGE_NAMES } from "@/constants/index";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    LANGUAGE_NAMES.find((l) => l.code === locale) || LANGUAGE_NAMES[0];

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const changeLanguage = (newLocale: Locale) => {
    const query = Object.fromEntries(searchParams.entries());
    router.replace({ pathname, query }, { locale: newLocale, scroll: false });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        rightIcon="chevronDown"
        iconStyle={`transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="justify-between px-4 h-10 bg-card hover:bg-card-hover"
      >
        <Icon name={currentLanguage.code} size={16} className="mr-2" />
        {currentLanguage.name}
      </Button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute bg-card rounded-lg mt-4 pt-2 pb-1 w-full left-0 z-20 border border-border shadow-2xl"
        >
          <div className="absolute -top-2 left-6 w-4 h-4 bg-card rotate-45 -z-1 border-t border-l border-border" />
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
      )}
    </div>
  );
}
