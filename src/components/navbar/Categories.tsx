"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { Icon } from "@/components/ui/icons";
import { categoryGroups } from "@/data/categories";

export default function Categories() {
  const t = useTranslations("categories");
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      arrowPosition="left"
      role="menu"
      isOpen={open}
      onToggle={setOpen}
      className="w-180 p-6"
      trigger={(isOpen) => (
        <Button
          rightIcon="chevronDown"
          iconStyle={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          className="h-10 px-4 mr-4"
        >
          <Icon name="categories" size={16} className="mr-2" />
          {t("title")}
        </Button>
      )}
    >
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
                    onClick={() => setOpen(false)}
                    className={`transition-all ${
                      activeCategory === sub.slug
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{t(`items.${sub.slug}.name`)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Dropdown>
  );
}
