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

  const { selectedId, setSelectedId, isConfirmed, confirmLocation } =
    useLocationStore();

  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
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
    if (mounted && !isConfirmed) {
      const timer = setTimeout(() => setShowPrompt(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [mounted, isConfirmed]);

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

  if (!mounted) return <div className="w-32 h-10 bg-card rounded-lg mr-3" />;

  return (
    <div className="relative inline-block">
      <Button
        leftIcon="location"
        className="bg-card hover:bg-card-hover h-10 px-4 mr-3 transition-all duration-200 shrink-0"
        onClick={() => {
          setIsOpen(true);
          setShowPrompt(false);
        }}
      >
        {tRegions(currentRegion.key)}
      </Button>

      {showPrompt && !isOpen && (
        <div className="flex flex-col absolute top-14 left-0 z-40 bg-card p-4 rounded-lg">
          <div className="absolute -top-2 left-6 w-4 h-4 bg-card rotate-45" />
          <p className="text-sm text-nowrap mb-4">
            {t("yourLocation")}:{" "}
            <span className="text-primary">
              {tRegions(currentRegion.key)} ?
            </span>
          </p>
          <div className="flex items-center">
            <button
              onClick={() => {
                confirmLocation();
                setShowPrompt(false);
              }}
              className="bg-primary text-sm py-2 px-4 mr-2 rounded-lg cursor-pointer text-nowrap"
            >
              {t("yesCorrect")}
            </button>
            <button
              onClick={() => {
                setShowPrompt(false);
                setIsOpen(true);
              }}
              className="bg-card-hover text-sm py-2 px-4 rounded-lg cursor-pointer"
            >
              {t("change")}
            </button>
          </div>
        </div>
      )}

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

            <div className="max-h-[352px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-card-hover">
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
                <div className="py-10 text-center">{t("noResults")}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
