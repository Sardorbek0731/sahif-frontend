"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { languages } from "@/data/lang";
import { Icon } from "@/components/ui/icons/icon";
import Image from "next/image";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
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

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale, scroll: false });
    setIsOpen(false);
  };

  return (
    <div className="relative mr-3" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Change language"
        className="flex items-center justify-between bg-card px-4 h-10 rounded-lg transition-all cursor-pointer hover:bg-card-hover"
      >
        <span className="flex items-center mr-4">
          <Image
            src={currentLanguage.flag}
            width={16}
            height={16}
            className="mr-2"
            alt={currentLanguage.name + "language flag"}
          />
          {currentLanguage.name}
        </span>

        <Icon
          name="chevronDown"
          size={16}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute bg-card rounded-lg overflow-hidden mt-2 pt-2 pb-1 w-full left-0">
          {languages
            .filter((lang) => lang.code !== locale)
            .map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="flex items-center w-full mb-1 px-4 h-10 transition-colors cursor-pointer hover:bg-card-hover"
              >
                <Image
                  src={lang.flag}
                  width={16}
                  height={16}
                  className="mr-2"
                  alt={lang.name + "language flag"}
                />
                {lang.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
