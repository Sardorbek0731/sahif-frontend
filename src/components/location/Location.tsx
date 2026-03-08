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

export default function Location({
  initialLocationId,
  initialConfirmed,
}: {
  initialLocationId: string;
  initialConfirmed: boolean;
}) {
  const t = useTranslations("");

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
    const confirmed = mounted ? isConfirmed : initialConfirmed;
    if (mounted && !confirmed) {
      const timer = setTimeout(() => setShowPrompt(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [mounted, isConfirmed, initialConfirmed]);

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
    t(`regions.${region.key}`)
      .toLowerCase()
      .includes(deferredSearch.toLowerCase()),
  );

  const currentId = mounted ? selectedId : initialLocationId;
  const currentRegion = regions.find((r) => r.id === currentId) || regions[0];

  return (
    <div className="relative mr-4">
      <Button
        leftIcon="location"
        className="bg-card hover:bg-card-hover h-10 px-4"
        onClick={() => {
          setIsOpen(true);
          setShowPrompt(false);
        }}
      >
        {t(`regions.${currentRegion.key}`)}
      </Button>

      {showPrompt && !isOpen && (
        <div className="flex flex-col absolute top-full left-0 mt-4 z-25 bg-card p-4 rounded-lg">
          <div className="absolute -top-2 left-6 w-4 h-4 bg-card rotate-45" />
          <p className="text-sm text-nowrap mb-4">
            {t("header.yourLocation")}:{" "}
            <span className="text-primary">
              {t(`regions.${currentRegion.key}`)} ?
            </span>
          </p>

          <div className="flex items-center">
            <Button
              className="bg-primary text-sm py-2 px-4 mr-2 text-nowrap text-background"
              onClick={() => {
                confirmLocation();
                setShowPrompt(false);
              }}
            >
              {t("header.yesCorrect")}
            </Button>

            <Button
              className="bg-background text-sm py-2 px-4"
              onClick={() => {
                setShowPrompt(false);
                setIsOpen(true);
              }}
            >
              {t("header.change")}
            </Button>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 row-center bg-black/50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-background w-full max-w-[420px] p-6 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="row-between mb-6">
              <h2 className="text-xl font-bold">
                {t("header.selectLocation")}
              </h2>

              <Button
                leftIcon="x"
                iconSize={20}
                className="bg-card hover:bg-card-hover p-2"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="flex items-center mb-6 bg-card h-10 rounded-lg hover:bg-card-hover focus-within:bg-card-hover transition-all px-4">
              <Icon name="search" size={16} className="mr-2" />
              <input
                ref={inputRef}
                type="text"
                name="search-region"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("header.searchRegion")}
                className="flex-1 h-full bg-transparent outline-none"
              />
            </div>

            <div className="max-h-[352px] overflow-y-auto space-y-3 pr-6">
              {filteredRegions.length > 0 ? (
                filteredRegions.map((region) => (
                  <Button
                    key={region.id}
                    className={`w-full justify-between h-10 px-4 ${
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
                    <span>{t(`regions.${region.key}`)}</span>
                    {selectedId === region.id && (
                      <Icon name="location" size={18} />
                    )}
                  </Button>
                ))
              ) : (
                <div className="py-10 text-center">{t("header.noResults")}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
