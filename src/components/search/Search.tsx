"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@/components/ui/icons/icon";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { famousSubCategories } from "@/data/categories";

export default function Search() {
  const tHeader = useTranslations("header");
  const tCategories = useTranslations("categories");

  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative flex-1 mr-4">
      <div className="flex flex-1 items-center bg-card h-10 rounded-lg hover:bg-card-hover focus-within:bg-card-hover transition-all px-4">
        <Icon name="search" size={16} className="mr-2" />
        <input
          type="search"
          name="search-book"
          placeholder={tHeader("searchBook")}
          className="flex-1 h-full bg-transparent outline-none"
          onFocus={() => setIsFocused(true)}
        />
      </div>

      {isFocused && (
        <div className="absolute top-full left-0 mt-4 w-full bg-card rounded-lg p-4 z-50">
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
