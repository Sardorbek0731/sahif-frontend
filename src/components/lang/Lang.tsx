"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { languages, LanguageCode } from "@/data/lang";
import { Button } from "../ui/button";
import { Icon } from "../ui/icons";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale() as LanguageCode;
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find((l) => l.code === locale) || languages[0];

  useEffect(() => {
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
  }, []);

  const changeLanguage = (newLocale: LanguageCode) => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale, scroll: false });
    setIsOpen(false);
  };

  return (
    <div className="relative z-25" ref={dropdownRef}>
      <Button
        rightIcon="chevronDown"
        iconStyle={`transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        className="justify-between px-4 h-10 bg-card hover:bg-card-hover"
      >
        <Icon name={currentLanguage.code} size={16} className="mr-2" />
        {currentLanguage.name}
      </Button>

      {isOpen && (
        <div className="absolute bg-card rounded-lg overflow-hidden mt-2 pt-2 pb-1 w-full left-0">
          {languages
            .filter((lang) => lang.code !== locale)
            .map((lang) => (
              <Button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="w-full mb-1 px-4 h-10 hover:bg-card-hover"
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
