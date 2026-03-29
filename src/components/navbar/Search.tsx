"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

import { Link, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons/icon";
import { popularCategories } from "@/data/categories";
import { useSearchStore } from "@/store/useSearchStore";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function Search() {
  const t = useTranslations();
  const router = useRouter();
  const isMounted = useIsMounted();

  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const history = useSearchStore((s) => s.history);
  const addToHistory = useSearchStore((s) => s.addToHistory);
  const removeFromHistory = useSearchStore((s) => s.removeFromHistory);

  const safeHistory = isMounted ? history : [];

  useEffect(() => {
    if (!isFocused) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [isFocused]);

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    addToHistory(trimmed);

    const query = new URLSearchParams();
    query.set("search", trimmed);
    router.push(`/books?${query.toString()}`);
    setIsFocused(false);
    setSearchValue("");
    inputRef.current?.blur();
  };

  const removeHistoryItem = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    removeFromHistory(item);
  };

  return (
    <div ref={searchRef} className="relative flex-1 mr-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchValue);
        }}
        className="flex items-center bg-card h-10 rounded-lg hover:bg-card-hover focus-within:bg-card-hover transition-all px-4"
      >
        <Icon name="search" size={16} className="mr-2" />
        <input
          ref={inputRef}
          type="text"
          name="search-book"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={t("search.searchBook")}
          autoComplete="off"
          className="flex-1 h-full bg-transparent outline-none"
          onFocus={() => setIsFocused(true)}
        />
      </form>

      {isFocused && (
        <div className="absolute top-full left-0 mt-4 w-full bg-card rounded-lg p-4 z-20">
          <div className="absolute -top-2 left-6 w-4 h-4 bg-card rotate-45" />
          {safeHistory.length > 0 && (
            <div className="mb-6">
              <span className="flex items-center mb-4 opacity-50">
                <Icon name="clock" size={16} className="mr-2 text-primary" />
                {t("search.recentSearches")}
              </span>
              <div className="flex flex-col">
                {safeHistory.map((item) => (
                  <div
                    key={item}
                    onClick={() => handleSearch(item)}
                    className="row-between cursor-pointer hover:bg-background py-2 px-4 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Icon className="mr-2" name="search" size={16} />
                      <span className="text-sm">{item}</span>
                    </div>
                    <Button
                      leftIcon="x"
                      iconSize={16}
                      onClick={(e) => removeHistoryItem(e, item)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <span className="flex items-center mb-4 opacity-50">
            <Icon name="flame" size={16} className="mr-2 text-primary" />
            {t("categories.popular")}
          </span>

          <div className="flex flex-wrap gap-2">
            {popularCategories.map((sub) => (
              <Link
                key={sub.id}
                href={{
                  pathname: "/books",
                  query: { category: sub.slug },
                }}
                className="px-4 py-2 text-sm rounded-md bg-background"
                onClick={() => {
                  setIsFocused(false);
                  setSearchValue("");
                }}
              >
                {t(`categories.items.${sub.slug}.name`)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
