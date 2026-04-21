"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { categoryGroups } from "@/data/categories";

export default function Categories() {
  const t = useTranslations("categories");
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      arrowPosition="left"
      isOpen={open}
      onToggle={setOpen}
      role="menu"
      className="w-180 p-6"
      trigger={
        <Button
          leftIcon={open ? "x" : "categories"}
          className="bg-card hover:bg-card-hover h-10 px-4 mr-4"
        >
          {t("title")}
        </Button>
      }
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
    </Dropdown>
  );
}
