"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { type SortOption, SORT_OPTIONS } from "@/constants/sort";

export type { SortOption };

const TRANSLATION_KEY: Record<SortOption, string> = {
  popular: "popular",
  new: "new",
  rating: "rating",
  "price-asc": "priceAsc",
  "price-desc": "priceDesc",
};

export default function BooksSortSelect({
  activeSort,
  activeParams,
}: {
  activeSort?: SortOption;
  activeParams: Record<string, string>;
}) {
  const t = useTranslations("books.sort");
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const handleSelect = (value: SortOption | "") => {
    setIsOpen(false);
    const params = new URLSearchParams(activeParams);
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const activeLabel = activeSort ? t(TRANSLATION_KEY[activeSort]) : t("label");

  return (
    <div className="flex items-center gap-2">
      <div className="relative" ref={dropdownRef}>
        <Button
          rightIcon="chevronDown"
          iconStyle={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="px-4 h-10 bg-card hover:bg-card-hover"
        >
          {activeLabel}
        </Button>

        {isOpen && (
          <div
            role="listbox"
            className="absolute right-0 mt-4 pt-2 pb-1 min-w-max bg-card border border-border rounded-lg shadow-2xl z-20"
          >
            <div className="absolute -top-2 right-6 w-4 h-4 bg-card rotate-45 z-[-1] border-t border-l border-border" />
            {SORT_OPTIONS.map((opt) => (
              <Button
                role="option"
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`w-full mb-1 px-4 h-10 hover:bg-card-hover rounded-none whitespace-nowrap ${
                  activeSort === opt
                    ? "bg-primary/10 text-primary font-medium"
                    : ""
                }`}
              >
                {t(TRANSLATION_KEY[opt])}
              </Button>
            ))}
          </div>
        )}
      </div>

      {activeSort && (
        <Button
          onClick={() => handleSelect("")}
          leftIcon="x"
          iconSize={16}
          className="h-10 px-3 bg-card hover:bg-card-hover"
        />
      )}
    </div>
  );
}
