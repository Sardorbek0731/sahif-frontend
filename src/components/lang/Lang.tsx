"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { languages } from "@/data/lang";
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
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return;

    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative mr-3" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Change language"
        className={`flex items-center justify-between bg-card w-35 px-4 h-10 rounded-lg transition-all cursor-pointer hover:bg-[#ebebed] dark:hover:bg-[#282828]`}
      >
        <span className="flex items-center">
          <Image
            src={currentLanguage.flag}
            width={15}
            height={15}
            className="mr-2"
            alt={currentLanguage.name + "language flag"}
          />
          {currentLanguage.name}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bg-card rounded-lg overflow-hidden mt-2 pt-2 w-full left-0">
          {languages
            .filter((lang) => lang.code !== locale)
            .map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="flex items-center justify-between mb-2 w-full px-4 py-2 transition-colors cursor-pointer hover:bg-[#ebebed] dark:hover:bg-[#282828]"
              >
                <span className="flex items-center">
                  <Image
                    src={lang.flag}
                    width={15}
                    height={15}
                    className="mr-2"
                    alt={lang.name + "language flag"}
                  />
                  {lang.name}
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
