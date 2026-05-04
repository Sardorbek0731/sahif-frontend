"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { useRouter, usePathname } from "@/i18n/navigation";
import { BOOK_LANGUAGES } from "@/constants/books";
import { authors } from "@/data/authors";
import { type CategorySlug, categoryGroups } from "@/data/categories";
import { type BookFormat, BOOK_FORMATS } from "@/types/book";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { Input } from "@/components/ui/Input";

interface Props {
  activeCategories?: CategorySlug[];
  activeFormats?: BookFormat[];
  activeLangs?: string[];
  activePrice?: string;
  activeInStock?: boolean;
  activeAuthors?: string[];
  activeSort?: string;
  activeSearch?: string;
  activeDiscount?: boolean;
  activeBestseller?: boolean;
  activeTrending?: boolean;
}

interface FilterState {
  categories: CategorySlug[];
  formats: BookFormat[];
  langs: string[];
  authors: string[];
  minPrice: string;
  maxPrice: string;
  inStock: boolean;
  discount: boolean;
  bestseller: boolean;
  trending: boolean;
}

// ─── CheckboxItem ─────────────────────────────────────────────────────────────

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
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-all hover:bg-card-hover group min-w-0 cursor-pointer"
    >
      <span
        className={`w-4 h-4 rounded-[4px] border-[1.5px] row-center shrink-0 transition-all ${
          checked
            ? "bg-primary border-primary"
            : "border-border group-hover:border-muted-foreground"
        }`}
        aria-hidden="true"
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

// ─── Accordion ────────────────────────────────────────────────────────────────

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
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full row-between py-3 px-4 text-sm font-medium hover:bg-card-hover transition-all cursor-pointer rounded-none"
      >
        <span className="flex items-center gap-2">
          {title}
          {badge ? <Badge variant="count">{badge}</Badge> : null}
        </span>
        <Icon
          name="chevronDown"
          size="sm"
          className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="py-2 px-2">{children}</div>}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── BooksFilter ──────────────────────────────────────────────────────────────
// key prop orqali URL o'zgarganda komponent qayta mount qilinadi (react.dev/learn/you-might-not-need-an-effect)
// Shuning uchun useEffect bilan props→state sinxronlash kerak emas.

export default function BooksFilter({
  activeCategories = [],
  activeFormats = [],
  activeLangs = [],
  activePrice,
  activeInStock,
  activeAuthors = [],
  activeSort,
  activeSearch,
  activeDiscount,
  activeBestseller,
  activeTrending,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("categories");
  const tBook = useTranslations("book");
  const tFilter = useTranslations("books.filter");
  const tCommon = useTranslations();

  const parsedPrice = parsePrice(activePrice);

  // useState initial value — key o'zgarganda komponent qayta mount bo'ladi,
  // shuning uchun bu qiymatlar har safar props dan to'g'ri o'qiladi.
  const [local, setLocal] = useState<FilterState>({
    categories: activeCategories,
    formats: activeFormats,
    langs: activeLangs,
    authors: activeAuthors,
    minPrice: parsedPrice.min,
    maxPrice: parsedPrice.max,
    inStock: activeInStock ?? false,
    discount: activeDiscount ?? false,
    bestseller: activeBestseller ?? false,
    trending: activeTrending ?? false,
  });

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
    if (state.discount) params.set("discount", "true");
    if (state.bestseller) params.set("bestseller", "true");
    if (state.trending) params.set("trending", "true");
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
      discount: false,
      bestseller: false,
      trending: false,
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
    (local.inStock ? 1 : 0) +
    (local.discount ? 1 : 0) +
    (local.bestseller ? 1 : 0) +
    (local.trending ? 1 : 0);

  const isDirty =
    !setsEqual(local.categories, activeCategories) ||
    !setsEqual(local.formats, activeFormats) ||
    !setsEqual(local.langs, activeLangs) ||
    !setsEqual(local.authors, activeAuthors) ||
    local.minPrice !== parsedPrice.min ||
    local.maxPrice !== parsedPrice.max ||
    local.inStock !== (activeInStock ?? false) ||
    local.discount !== (activeDiscount ?? false) ||
    local.bestseller !== (activeBestseller ?? false) ||
    local.trending !== (activeTrending ?? false);

  return (
    <aside aria-label={tFilter("title")} className="w-64 shrink-0 mr-4">
      <div className="bg-card rounded-lg border border-border overflow-clip">
        {/* Header */}
        <div className="row-between px-4 py-3 border-b border-border">
          <span className="flex items-center gap-2 font-semibold">
            <Icon name="filter" size="md" />
            {tFilter("title")}
            {activeFiltersCount > 0 && (
              <Badge variant="count">{activeFiltersCount}</Badge>
            )}
          </span>
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetAll}
              className="text-xs text-muted-foreground hover:text-foreground"
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

          {/* Discount */}
          <div className="p-2 border-b border-border">
            <CheckboxItem
              checked={local.discount}
              onChange={() => set("discount", !local.discount)}
              label={tFilter("discount")}
            />
          </div>

          {/* Bestseller */}
          <div className="p-2 border-b border-border">
            <CheckboxItem
              checked={local.bestseller}
              onChange={() => set("bestseller", !local.bestseller)}
              label={tCommon("badges.bestseller")}
            />
          </div>

          {/* Trending */}
          <div className="p-2 border-b border-border">
            <CheckboxItem
              checked={local.trending}
              onChange={() => set("trending", !local.trending)}
              label={tCommon("badges.trending")}
            />
          </div>

          {/* Category */}
          <Accordion
            title={tFilter("category")}
            defaultOpen={!!local.categories.length}
            badge={local.categories.length || undefined}
          >
            <div className="overflow-y-auto overflow-x-clip max-h-56">
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
              <div className="flex-1 min-w-0">
                <label
                  htmlFor="price-from"
                  className="text-xs text-muted-foreground mb-1 block"
                >
                  {tFilter("priceFrom")}
                </label>
                <Input
                  id="price-from"
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={local.minPrice}
                  onChange={(e) =>
                    set("minPrice", e.target.value.replace(/\D/g, ""))
                  }
                  variant="default"
                  size="sm"
                  wrapperClassName="hover:bg-card-hover focus-within:bg-card-hover transition-all"
                />
              </div>
              <div className="flex-1 min-w-0">
                <label
                  htmlFor="price-to"
                  className="text-xs text-muted-foreground mb-1 block"
                >
                  {tFilter("priceTo")}
                </label>
                <Input
                  id="price-to"
                  type="text"
                  inputMode="numeric"
                  placeholder="∞"
                  value={local.maxPrice}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val !== "0") set("maxPrice", val);
                  }}
                  variant="default"
                  size="sm"
                  wrapperClassName="hover:bg-card-hover focus-within:bg-card-hover transition-all"
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
            <div className="overflow-y-auto overflow-x-clip max-h-56">
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
            <div className="overflow-y-auto overflow-x-clip max-h-56">
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
            variant="primary"
            center
            className="w-full transition-all"
          >
            {tFilter("apply")}
          </Button>
        </div>
      </div>
    </aside>
  );
}
