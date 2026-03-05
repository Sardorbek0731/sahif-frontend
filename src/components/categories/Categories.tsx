"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { categoryGroups } from "@/data/categories";

export default function Categories() {
  const t = useTranslations("categories");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <Button
        leftIcon={open ? "x" : "categories"}
        onClick={() => setOpen((prev) => !prev)}
        className="bg-card hover:bg-card-hover h-10 px-4 mr-4"
      >
        {t("categories")}
      </Button>

      {open && (
        <div className="absolute top-full left-0 mt-4 w-[850px] bg-card rounded-lg p-6 z-20">
          <div className="absolute -top-2 left-6 w-4 h-4 bg-card rotate-45" />
          <div className="grid grid-cols-3 gap-8">
            {categoryGroups.map((group) => (
              <div key={group.name}>
                <h3 className="font-semibold mb-3">
                  {"- " + t(`groups.${group.name}`)}
                </h3>

                <ul className="space-y-2">
                  {group.subCategories.map((sub) => (
                    <li key={sub.slug} className="flex flex-1">
                      <Link
                        href={{
                          pathname: "/books",
                          query: { category: sub.slug },
                        }}
                        className="row-between text-foreground/70 hover:text-foreground transition-all"
                        onClick={() => setOpen(false)}
                      >
                        <span>{t(`items.${sub.slug}.name`)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
