"use client";

import { useState } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { Icon } from "@/components/ui/icons";
import { BOOK_LANGUAGES } from "@/constants";
import { categoryGroups, type CategorySlug } from "@/data/categories";
import { authors } from "@/data/authors";
import { type BookFormat, BOOK_FORMATS } from "@/types/book";

interface Props {
  activeCategories?: CategorySlug[];
  activeFormats?: BookFormat[];
  activeLangs?: string[];
  activePrice?: string;
  activeInStock?: boolean;
  activeAuthors?: string[];
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
      className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors hover:bg-foreground/5 group"
    >
      <span
        className={`w-4 h-4 rounded-[4px] border-[1.5px] flex items-center justify-center shrink-0 transition-all ${
          checked
            ? "bg-primary border-primary"
            : "border-foreground/25 group-hover:border-foreground/40"
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
        className={
          checked ? "text-foreground font-medium" : "text-foreground/60"
        }
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
    <div className="border-b border-foreground/8 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-2.5 px-4 text-sm font-medium hover:bg-foreground/3 transition-colors"
      >
        <span className="flex items-center gap-2">
          {title}
          {badge ? (
            <span className="text-[10px] bg-primary text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {badge}
            </span>
          ) : null}
        </span>
        <span
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <Icon name="chevronDown" size={13} className="text-foreground/35" />
        </span>
      </button>
      {open && <div className="pb-2 px-2">{children}</div>}
    </div>
  );
}

function toggleArr<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

const PRICE_RANGES = [
  { label: "0 – 50k", min: "0", max: "50000" },
  { label: "50k – 100k", min: "50000", max: "100000" },
  { label: "100k – 200k", min: "100000", max: "200000" },
  { label: "200k+", min: "200000", max: "" },
];

export default function BooksFilter({
  activeCategories = [],
  activeFormats = [],
  activeLangs = [],
  activePrice,
  activeInStock,
  activeAuthors = [],
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("categories");
  const tBook = useTranslations("book");

  const parsePrice = (price?: string) => {
    if (!price) return { min: "", max: "" };
    if (price.endsWith("+")) return { min: price.slice(0, -1), max: "" };
    const [min, max] = price.split("-");
    return { min: min ?? "", max: max ?? "" };
  };

  const { min: initMin, max: initMax } = parsePrice(activePrice);

  const [local, setLocal] = useState<FilterState>({
    categories: activeCategories,
    formats: activeFormats,
    langs: activeLangs,
    authors: activeAuthors,
    minPrice: initMin,
    maxPrice: initMax,
    inStock: activeInStock ?? false,
  });

  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    setLocal((prev) => ({ ...prev, [key]: value }));

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (local.categories.length)
      params.set("category", local.categories.join(","));
    if (local.formats.length) params.set("format", local.formats.join(","));
    if (local.langs.length) params.set("lang", local.langs.join(","));
    if (local.authors.length) params.set("author", local.authors.join(","));
    if (local.inStock) params.set("inStock", "true");

    const min = parseInt(local.minPrice);
    const max = parseInt(local.maxPrice);
    if (local.minPrice || local.maxPrice) {
      if (!local.maxPrice) {
        params.set("price", `${isNaN(min) ? 0 : min}+`);
      } else {
        params.set("price", `${isNaN(min) ? 0 : min}-${isNaN(max) ? 0 : max}`);
      }
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const resetAll = () => {
    setLocal({
      categories: [],
      formats: [],
      langs: [],
      authors: [],
      minPrice: "",
      maxPrice: "",
      inStock: false,
    });
    router.push(pathname);
  };

  const activeFiltersCount = [
    local.categories.length,
    local.formats.length,
    local.langs.length,
    local.authors.length,
    local.minPrice || local.maxPrice ? 1 : 0,
    local.inStock ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const setsEqual = <T,>(a: T[], b: T[]) =>
    a.length === b.length && a.every((v) => b.includes(v));

  const { min: appliedMin, max: appliedMax } = parsePrice(activePrice);
  const isDirty =
    !setsEqual(local.categories, activeCategories) ||
    !setsEqual(local.formats, activeFormats) ||
    !setsEqual(local.langs, activeLangs) ||
    !setsEqual(local.authors, activeAuthors) ||
    local.minPrice !== appliedMin ||
    local.maxPrice !== appliedMax ||
    local.inStock !== (activeInStock ?? false);

  return (
    <aside className="w-64 shrink-0 mr-4">
      <div className="bg-card rounded-xl border border-foreground/10 overflow-hidden sticky top-4">
        <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/10">
          <span className="flex items-center gap-2 text-sm font-semibold">
            Filtr
            {activeFiltersCount > 0 && (
              <span className="text-[10px] bg-primary text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </span>
          {activeFiltersCount > 0 && (
            <button
              onClick={resetAll}
              className="text-xs text-rose-500 hover:text-rose-400 transition-colors"
            >
              Tozalash
            </button>
          )}
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-180px)] custom-scrollbar">
          <div className="px-2 py-2.5 border-b border-foreground/8">
            <CheckboxItem
              checked={local.inStock}
              onChange={() => set("inStock", !local.inStock)}
              label="Faqat mavjudlar"
            />
          </div>

          <Accordion
            title="Kategoriya"
            defaultOpen={!!local.categories.length}
            badge={local.categories.length || undefined}
          >
            {categoryGroups.map((group) => (
              <div key={group.name} className="mb-1">
                <p className="text-[10px] font-semibold text-foreground/30 px-2 pt-2 pb-1 uppercase tracking-widest">
                  {t(`groups.${group.name}`)}
                </p>
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
          </Accordion>

          <Accordion
            title="Narx (so'm)"
            defaultOpen={!!(local.minPrice || local.maxPrice)}
            badge={local.minPrice || local.maxPrice ? 1 : undefined}
          >
            <div className="flex gap-2 px-2 mb-3">
              <div className="flex-1">
                <label className="text-[10px] font-semibold text-foreground/35 uppercase tracking-wider mb-1 block">
                  Dan
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={local.minPrice}
                  onChange={(e) => set("minPrice", e.target.value)}
                  className="w-full bg-background border border-foreground/15 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-semibold text-foreground/35 uppercase tracking-wider mb-1 block">
                  Gacha
                </label>
                <input
                  type="number"
                  placeholder="∞"
                  value={local.maxPrice}
                  onChange={(e) => set("maxPrice", e.target.value)}
                  className="w-full bg-background border border-foreground/15 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 px-2">
              {PRICE_RANGES.map((range) => {
                const isActive =
                  local.minPrice === range.min && local.maxPrice === range.max;
                return (
                  <button
                    key={range.label}
                    onClick={() =>
                      isActive
                        ? setLocal((p) => ({
                            ...p,
                            minPrice: "",
                            maxPrice: "",
                          }))
                        : setLocal((p) => ({
                            ...p,
                            minPrice: range.min,
                            maxPrice: range.max,
                          }))
                    }
                    className={`text-xs py-1.5 rounded-lg border transition-all ${
                      isActive
                        ? "bg-primary/10 border-primary/40 text-primary font-semibold"
                        : "border-foreground/12 text-foreground/50 hover:border-foreground/25 hover:text-foreground"
                    }`}
                  >
                    {range.label}
                  </button>
                );
              })}
            </div>
          </Accordion>

          <Accordion
            title="Muqova turi"
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

          <Accordion
            title="Kitob tili"
            defaultOpen={!!local.langs.length}
            badge={local.langs.length || undefined}
          >
            {BOOK_LANGUAGES.map((lang) => (
              <CheckboxItem
                key={lang.code}
                checked={local.langs.includes(lang.code)}
                onChange={() => set("langs", toggleArr(local.langs, lang.code))}
                label={lang.label}
              />
            ))}
          </Accordion>

          <Accordion
            title="Muallif"
            defaultOpen={!!local.authors.length}
            badge={local.authors.length || undefined}
          >
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
          </Accordion>
        </div>

        <div className="px-3 py-3 border-t border-foreground/10">
          <button
            onClick={applyFilters}
            disabled={!isDirty}
            className={`w-full py-2 rounded-lg text-sm font-semibold transition-all ${
              isDirty
                ? "bg-primary text-white hover:bg-primary/90 active:scale-[0.98]"
                : "bg-foreground/5 text-foreground/25 cursor-not-allowed"
            }`}
          >
            {"Qo'llash"}
          </button>
        </div>
      </div>
    </aside>
  );
}
