"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import { useRouter, usePathname } from "@/i18n/navigation";
import { Icon } from "@/components/ui/icons";
import { Button } from "@/components/ui/Button";
import { BOOK_LANGUAGES } from "@/constants";
import { type BookFormat, BOOK_FORMATS } from "@/types/book";
import { type CategorySlug, categoryGroups } from "@/data/categories";
import { authors } from "@/data/authors";

interface Props {
  activeCategories?: CategorySlug[];
  activeFormats?: BookFormat[];
  activeLangs?: string[];
  activePrice?: string;
  activeInStock?: boolean;
  activeAuthors?: string[];
  activeSort?: string;
  activeSearch?: string;
}

interface FilterState {
  categories: CategorySlug[];
  formats: BookFormat[];
  langs: string[];
  authors: string[];
  minPrice: string;
  maxPrice: string;
  inStock: boolean;
}

function CheckboxItem({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onChange}
      className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-all hover:bg-card-hover group min-w-0 cursor-pointer"
    >
      <span
        className={`w-4 h-4 rounded-[4px] border-[1.5px] row-center shrink-0 transition-all ${
          checked
            ? "bg-primary border-primary"
            : "border-border group-hover:border-muted-foreground"
        }`}
      >
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path
              d="M1 3.5L3.5 6L8 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        className={`truncate ${checked ? "text-foreground" : "text-muted-foreground"}`}
      >
        {label}
      </span>
    </button>
  );
}

function Accordion({
  title,
  defaultOpen = false,
  children,
  badge,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full row-between py-3 px-4 text-sm font-medium hover:bg-card-hover transition-all cursor-pointer"
      >
        <span className="flex items-center gap-2">
          {title}
          {badge ? (
            <span className="text-[10px] bg-primary text-white w-5 h-5 rounded-full row-center font-bold">
              {badge}
            </span>
          ) : null}
        </span>
        <Icon
          name="chevronDown"
          size={14}
          className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="py-2 px-2">{children}</div>}
    </div>
  );
}

function toggleArr<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

function parsePrice(price?: string) {
  if (!price) return { min: "", max: "" };
  if (price.endsWith("+")) return { min: price.slice(0, -1), max: "" };
  const [min, max] = price.split("-");
  return { min: min ?? "", max: max ?? "" };
}

function setsEqual<T>(a: T[], b: T[]) {
  return a.length === b.length && a.every((v) => b.includes(v));
}

export default function BooksFilter({
  activeCategories = [],
  activeFormats = [],
  activeLangs = [],
  activePrice,
  activeInStock,
  activeAuthors = [],
  activeSort,
  activeSearch,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("categories");
  const tBook = useTranslations("book");
  const tFilter = useTranslations("books.filter");

  const parsedPrice = parsePrice(activePrice);

  const categoriesKey = activeCategories.join(",");
  const formatsKey = activeFormats.join(",");
  const langsKey = activeLangs.join(",");
  const authorsKey = activeAuthors.join(",");

  const [local, setLocal] = useState<FilterState>({
    categories: activeCategories,
    formats: activeFormats,
    langs: activeLangs,
    authors: activeAuthors,
    minPrice: parsedPrice.min,
    maxPrice: parsedPrice.max,
    inStock: activeInStock ?? false,
  });

  useEffect(() => {
    const p = parsePrice(activePrice);
    setLocal({
      categories: activeCategories,
      formats: activeFormats,
      langs: activeLangs,
      authors: activeAuthors,
      minPrice: p.min,
      maxPrice: p.max,
      inStock: activeInStock ?? false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activePrice,
    activeInStock,
    categoriesKey,
    formatsKey,
    langsKey,
    authorsKey,
  ]);

  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    setLocal((prev) => ({ ...prev, [key]: value }));

  const buildParams = (state: FilterState) => {
    const params = new URLSearchParams();
    if (activeSearch) params.set("search", activeSearch);
    if (activeSort) params.set("sort", activeSort);
    if (state.categories.length)
      params.set("category", state.categories.join(","));
    if (state.formats.length) params.set("format", state.formats.join(","));
    if (state.langs.length) params.set("lang", state.langs.join(","));
    if (state.authors.length) params.set("author", state.authors.join(","));
    if (state.inStock) params.set("inStock", "true");
    if (state.minPrice || state.maxPrice) {
      params.set(
        "price",
        state.maxPrice
          ? `${state.minPrice || "0"}-${state.maxPrice}`
          : `${state.minPrice || "0"}+`,
      );
    }
    return params.toString();
  };

  const applyFilters = () => {
    const query = buildParams(local);
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const resetAll = () => {
    const empty: FilterState = {
      categories: [],
      formats: [],
      langs: [],
      authors: [],
      minPrice: "",
      maxPrice: "",
      inStock: false,
    };
    setLocal(empty);
    const query = buildParams(empty);
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const activeFiltersCount =
    local.categories.length +
    local.formats.length +
    local.langs.length +
    local.authors.length +
    (local.minPrice || local.maxPrice ? 1 : 0) +
    (local.inStock ? 1 : 0);

  const isDirty =
    !setsEqual(local.categories, activeCategories) ||
    !setsEqual(local.formats, activeFormats) ||
    !setsEqual(local.langs, activeLangs) ||
    !setsEqual(local.authors, activeAuthors) ||
    local.minPrice !== parsedPrice.min ||
    local.maxPrice !== parsedPrice.max ||
    local.inStock !== (activeInStock ?? false);

  return (
    <aside className="w-64 shrink-0 mr-4">
      <div className="bg-card rounded-lg border border-border overflow-hidden sticky top-4">
        {/* Header */}
        <div className="row-between px-4 py-3 border-b border-border">
          <span className="flex items-center gap-2 font-semibold">
            <Icon name="filter" size={16} />
            {tFilter("title")}
            {activeFiltersCount > 0 && (
              <span className="text-[10px] bg-primary text-white w-5 h-5 rounded-full row-center">
                {activeFiltersCount}
              </span>
            )}
          </span>
          {activeFiltersCount > 0 && (
            <Button
              onClick={resetAll}
              className="text-xs text-muted-foreground hover:text-foreground bg-card-hover px-3 py-1 border border-border"
            >
              {tFilter("reset")}
            </Button>
          )}
        </div>

        {/* Filter sections */}
        <div>
          {/* In stock */}
          <div className="p-2 border-b border-border">
            <CheckboxItem
              checked={local.inStock}
              onChange={() => set("inStock", !local.inStock)}
              label={tFilter("inStock")}
            />
          </div>

          {/* Category */}
          <Accordion
            title={tFilter("category")}
            defaultOpen={!!local.categories.length}
            badge={local.categories.length || undefined}
          >
            <div className="overflow-y-auto max-h-48 custom-scrollbar">
              {categoryGroups.map((group) => (
                <div key={group.name} className="mb-1">
                  <span className="text-xs font-semibold text-muted-foreground px-2 pt-2 pb-1 block">
                    {t(`groups.${group.name}`)}
                  </span>
                  {group.categories.map((cat) => (
                    <CheckboxItem
                      key={cat.slug}
                      checked={local.categories.includes(cat.slug)}
                      onChange={() =>
                        set("categories", toggleArr(local.categories, cat.slug))
                      }
                      label={t(`items.${cat.slug}.name`)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </Accordion>

          {/* Price */}
          <Accordion
            title={tFilter("price")}
            defaultOpen={!!(local.minPrice || local.maxPrice)}
            badge={local.minPrice || local.maxPrice ? 1 : undefined}
          >
            <div className="flex gap-2 px-2">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">
                  {tFilter("priceFrom")}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={local.minPrice}
                  onChange={(e) =>
                    set("minPrice", e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full bg-card border border-border rounded-lg px-2.5 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">
                  {tFilter("priceTo")}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="∞"
                  value={local.maxPrice}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val !== "0") set("maxPrice", val);
                  }}
                  className="w-full bg-card border border-border rounded-lg px-2.5 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>
          </Accordion>

          {/* Format */}
          <Accordion
            title={tFilter("format")}
            defaultOpen={!!local.formats.length}
            badge={local.formats.length || undefined}
          >
            {BOOK_FORMATS.map((fmt) => (
              <CheckboxItem
                key={fmt}
                checked={local.formats.includes(fmt)}
                onChange={() => set("formats", toggleArr(local.formats, fmt))}
                label={tBook(`formats.${fmt}`)}
              />
            ))}
          </Accordion>

          {/* Language */}
          <Accordion
            title={tFilter("language")}
            defaultOpen={!!local.langs.length}
            badge={local.langs.length || undefined}
          >
            <div className="overflow-y-auto max-h-48 custom-scrollbar">
              {BOOK_LANGUAGES.map((lang) => (
                <CheckboxItem
                  key={lang.code}
                  checked={local.langs.includes(lang.code)}
                  onChange={() =>
                    set("langs", toggleArr(local.langs, lang.code))
                  }
                  label={lang.label}
                />
              ))}
            </div>
          </Accordion>

          {/* Author */}
          <Accordion
            title={tFilter("author")}
            defaultOpen={!!local.authors.length}
            badge={local.authors.length || undefined}
          >
            <div className="overflow-y-auto max-h-48 custom-scrollbar">
              {authors.map((author) => (
                <CheckboxItem
                  key={author.slug}
                  checked={local.authors.includes(author.slug)}
                  onChange={() =>
                    set("authors", toggleArr(local.authors, author.slug))
                  }
                  label={author.name}
                />
              ))}
            </div>
          </Accordion>
        </div>

        {/* Apply button */}
        <div className="p-3 border-t border-border">
          <Button
            onClick={applyFilters}
            disabled={!isDirty}
            className={`w-full justify-center py-2 transition-all disabled:cursor-not-allowed ${
              isDirty
                ? "bg-primary text-white hover:bg-primary/90 active:scale-[0.98]"
                : "bg-card-hover text-muted-foreground"
            }`}
          >
            {tFilter("apply")}
          </Button>
        </div>
      </div>
    </aside>
  );
}
