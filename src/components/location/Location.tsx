"use client";

import {
  useState,
  useEffect,
  useDeferredValue,
  useRef,
  startTransition,
} from "react";
import { useTranslations } from "next-intl";
import { regions } from "@/data/regions";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons/icon";
import { useLocationStore } from "@/store/useLocationStore";

export default function Location() {
  const t = useTranslations("header");
  const tRegions = useTranslations("regions");

  const { selectedId, setSelectedId } = useLocationStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const deferredSearch = useDeferredValue(searchQuery);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      window.addEventListener("keydown", handleEsc);
      setTimeout(() => inputRef.current?.focus(), 100);

      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen]);

  const filteredRegions = regions.filter((region) =>
    tRegions(region.key).toLowerCase().includes(deferredSearch.toLowerCase()),
  );

  const currentRegion = regions.find((r) => r.id === selectedId) || regions[0];

  if (!mounted) return <div className="w-30 h-10 bg-card rounded-lg mr-3" />;

  return (
    <>
      <Button
        leftIcon="location"
        className="bg-card hover:bg-card-hover h-10 px-4 mr-3 transition-all duration-200 shrink-0"
        onClick={() => setIsOpen(true)}
      >
        {tRegions(currentRegion.key)}
      </Button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-background w-full max-w-[420px] p-6 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{t("selectLocation")}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-card rounded-lg transition-colors cursor-pointer"
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className="flex items-center mb-6 bg-card h-10 rounded-lg hover:bg-card-hover focus-within:bg-card-hover transition-all px-4">
              <Icon name="search" size={16} className="mr-2" />
              <input
                ref={inputRef}
                type="text"
                name="search-region"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchRegion")}
                className="flex-1 h-full bg-transparent outline-none"
              />
            </div>

            <div className="max-h-[352px] overflow-y-auto space-y-3 pr-6">
              {filteredRegions.length > 0 ? (
                filteredRegions.map((region) => (
                  <button
                    key={region.id}
                    className={`w-full flex items-center justify-between h-10 px-4 rounded-lg transition-all cursor-pointer ${
                      selectedId === region.id
                        ? "text-primary bg-card"
                        : "hover:bg-card"
                    }`}
                    onClick={() => {
                      setSelectedId(region.id);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    <span>{tRegions(region.key)}</span>
                    {selectedId === region.id && (
                      <Icon name="location" size={18} />
                    )}
                  </button>
                ))
              ) : (
                <div className="py-10 text-center">
                  <span>{t("noResults")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
