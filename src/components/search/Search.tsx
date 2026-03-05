"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@/components/ui/icons/icon";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { famousSubCategories } from "@/data/categories";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Search() {
  const tHeader = useTranslations("header");
  const tCategories = useTranslations("categories");
  const router = useRouter();

  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("search-history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const newHistory = [trimmed, ...history.filter((h) => h !== trimmed)].slice(
      0,
      5,
    );
    setHistory(newHistory);
    localStorage.setItem("search-history", JSON.stringify(newHistory));

    const query = new URLSearchParams();
    query.set("search", trimmed);
    router.push(`/books?${query.toString()}`);
    setIsFocused(false);
  };

  const removeHistoryItem = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    const updated = history.filter((h) => h !== item);
    setHistory(updated);
    localStorage.setItem("search-history", JSON.stringify(updated));
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
          type="text"
          name="search-book"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={tHeader("searchBook")}
          autoComplete="off"
          className="flex-1 h-full bg-transparent outline-none"
          onFocus={() => setIsFocused(true)}
        />
      </form>

      {isFocused && (
        <div className="absolute top-full left-0 mt-4 w-full bg-card rounded-lg p-4 z-50">
          {history.length > 0 && (
            <div className="mb-6">
              <p className="mb-4 opacity-50">🕒 Tarix</p>
              <div className="flex flex-col">
                {history.map((item) => (
                  <div
                    key={item}
                    onClick={() => handleSearch(item)}
                    className="flex items-center justify-between cursor-pointer hover:bg-background py-2 px-4 rounded-md"
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

          <p className="mb-4 opacity-50">
            🔥 {tCategories("famousCategories")}
          </p>

          <div className="flex flex-wrap gap-2">
            {famousSubCategories.map((sub) => (
              <Link
                key={sub.id}
                href={{
                  pathname: "/books",
                  query: { category: sub.slug },
                }}
                className="px-4 py-2 text-sm rounded-md bg-background"
                onClick={() => setIsFocused(false)}
              >
                {tCategories(`items.${sub.slug}.name`)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
