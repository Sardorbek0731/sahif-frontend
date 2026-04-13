"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(activeParams);
    if (e.target.value) {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <select
      value={activeSort ?? ""}
      onChange={handleChange}
      className="text-sm bg-card border border-border rounded-lg px-3 py-1.5 text-foreground cursor-pointer focus:outline-none focus:border-primary/60 transition-colors"
    >
      <option value="">{t("label")}</option>
      {SORT_OPTIONS.map((opt) => (
        <option key={opt} value={opt}>
          {t(TRANSLATION_KEY[opt])}
        </option>
      ))}
    </select>
  );
}
