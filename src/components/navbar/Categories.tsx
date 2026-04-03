"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { categoryGroups } from "@/data/categories";

export default function Categories() {
  const t = useTranslations("categories");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

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

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <div className="relative" ref={wrapperRef}>
      <Button
        aria-expanded={open}
        aria-haspopup="menu"
        leftIcon={open ? "x" : "categories"}
        onClick={() => setOpen((prev) => !prev)}
        className="bg-card hover:bg-card-hover h-10 px-4 mr-4"
      >
        {t("title")}
      </Button>

      {open && (
        <div className="absolute top-full left-0 mt-4 w-180 bg-card rounded-lg p-6 z-20 border border-border shadow-2xl">
          <div className="absolute -top-2 left-6 w-4 h-4 bg-card rotate-45 border-t border-l border-border" />
          <div className="grid grid-cols-3 gap-6">
            {categoryGroups.map((group) => (
              <div key={group.name}>
                <h3 className="font-semibold mb-3">
                  {`- ${t(`groups.${group.name}`)}`}
                </h3>

                <ul className="space-y-1.5">
                  {group.categories.map((sub) => (
                    <li key={sub.slug} className="flex flex-1">
                      <Link
                        href={{
                          pathname: "/books",
                          query: { category: sub.slug },
                        }}
                        className="text-muted-foreground hover:text-foreground transition-all"
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
