"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
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
  const tCommon = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleSelect = (value: SortOption | "") => {
    setOpen(false);
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
      <Dropdown
        arrowPosition="right"
        align="right"
        isOpen={open}
        onToggle={setOpen}
        trigger={(isOpen) => (
          <Button
            rightIcon="chevronDown"
            iconStyle={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            className="px-4 h-10 bg-card hover:bg-card-hover"
          >
            {activeLabel}
          </Button>
        )}
      >
        <div role="listbox" aria-label={t("label")} className="py-2 min-w-max">
          {SORT_OPTIONS.map((opt) => (
            <button
              type="button"
              role="option"
              key={opt}
              aria-selected={activeSort === opt}
              onClick={() => handleSelect(opt)}
              className={`w-full mb-1 px-4 h-10 hover:bg-card-hover rounded-none whitespace-nowrap text-left ${
                activeSort === opt
                  ? "bg-primary/10 text-primary font-medium"
                  : ""
              }`}
            >
              {t(TRANSLATION_KEY[opt])}
            </button>
          ))}
        </div>
      </Dropdown>

      {/* Sort tozalash — Dropdown tashqarisida alohida */}
      {activeSort && (
        <Button
          onClick={() => handleSelect("")}
          leftIcon="x"
          iconSize={16}
          aria-label={tCommon("clearSort")}
          className="h-10 px-3 bg-card hover:bg-card-hover"
        />
      )}
    </div>
  );
}
