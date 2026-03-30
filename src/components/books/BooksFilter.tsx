"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

import { categoryGroups, type CategorySlug } from "@/data/categories";
import { type BookFormat } from "@/types/book";

const FORMATS: { value: BookFormat; label: string }[] = [
  { value: "hardcover", label: "Qattiq muqova" },
  { value: "paperback", label: "Yumshoq muqova" },
  { value: "ebook", label: "Elektron kitob" },
  { value: "audio", label: "Audio kitob" },
];

const LANGUAGES = [
  { code: "uz-Latn", label: "O'zbek (lotin)" },
  { code: "uz-Cyrl", label: "Ўзбек (кирил)" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
];

const PRICE_RANGES = [
  { key: "0-50000", label: "0 – 50 000" },
  { key: "50000-100000", label: "50 000 – 100 000" },
  { key: "100000-200000", label: "100 000 – 200 000" },
  { key: "200000+", label: "200 000+" },
];

interface Props {
  activeCategory?: CategorySlug;
  activeFormat?: BookFormat;
  activeLang?: string;
  activePrice?: string;
  activeInStock?: boolean;
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-foreground/10 pb-4">
      <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}

function FilterButton({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-foreground/60 hover:text-foreground hover:bg-card"
      }`}
    >
      {children}
    </button>
  );
}

export default function BooksFilter({
  activeCategory,
  activeFormat,
  activeLang,
  activePrice,
  activeInStock,
}: Props) {
  const t = useTranslations("categories");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const hasFilters =
    activeCategory ||
    activeFormat ||
    activeLang ||
    activePrice ||
    activeInStock;

  return (
    <aside className="w-56 shrink-0 mr-4">
      <div className="bg-card rounded-xl border border-foreground/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/10">
          <span className="text-sm font-semibold">Filtr</span>
          {hasFilters && (
            <button
              onClick={() => router.push(pathname)}
              className="text-xs text-rose-500 hover:text-rose-400 transition-colors"
            >
              Tozalash
            </button>
          )}
        </div>

        {/* Scroll area */}
        <div className="overflow-y-auto max-h-[calc(100vh-180px)] custom-scrollbar p-4 space-y-4">
          {/* Kategoriya */}
          <FilterSection title="Kategoriya">
            {categoryGroups.map((group) => (
              <div key={group.name} className="mb-3">
                <p className="text-xs text-foreground/30 px-3 mb-1">
                  {t(`groups.${group.name}`)}
                </p>
                <ul>
                  {group.categories.map((cat) => (
                    <li key={cat.slug}>
                      <FilterButton
                        isActive={cat.slug === activeCategory}
                        onClick={() =>
                          updateParam(
                            "category",
                            cat.slug === activeCategory ? null : cat.slug,
                          )
                        }
                      >
                        {t(`items.${cat.slug}.name`)}
                      </FilterButton>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </FilterSection>

          {/* Muqova turi */}
          <FilterSection title="Muqova turi">
            <ul>
              {FORMATS.map((fmt) => (
                <li key={fmt.value}>
                  <FilterButton
                    isActive={activeFormat === fmt.value}
                    onClick={() =>
                      updateParam(
                        "format",
                        activeFormat === fmt.value ? null : fmt.value,
                      )
                    }
                  >
                    {fmt.label}
                  </FilterButton>
                </li>
              ))}
            </ul>
          </FilterSection>

          {/* Kitob tili */}
          <FilterSection title="Kitob tili">
            <ul>
              {LANGUAGES.map((lang) => (
                <li key={lang.code}>
                  <FilterButton
                    isActive={activeLang === lang.code}
                    onClick={() =>
                      updateParam(
                        "lang",
                        activeLang === lang.code ? null : lang.code,
                      )
                    }
                  >
                    {lang.label}
                  </FilterButton>
                </li>
              ))}
            </ul>
          </FilterSection>

          {/* Narx */}
          <FilterSection title="Narx (so'm)">
            <ul>
              {PRICE_RANGES.map((range) => (
                <li key={range.key}>
                  <FilterButton
                    isActive={activePrice === range.key}
                    onClick={() =>
                      updateParam(
                        "price",
                        activePrice === range.key ? null : range.key,
                      )
                    }
                  >
                    {range.label}
                  </FilterButton>
                </li>
              ))}
            </ul>
          </FilterSection>

          {/* Mavjudlik */}
          <div>
            <FilterButton
              isActive={!!activeInStock}
              onClick={() =>
                updateParam("inStock", activeInStock ? null : "true")
              }
            >
              Faqat mavjudlar
            </FilterButton>
          </div>
        </div>
      </div>
    </aside>
  );
}
