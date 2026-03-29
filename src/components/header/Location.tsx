"use client";

import { useState, useEffect, useDeferredValue, useRef } from "react";
import { useTranslations } from "next-intl";

import { regions } from "@/data/regions";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons/icon";
import { useLocationStore } from "@/store/useLocationStore";
import { useIsMounted } from "@/hooks/useIsMounted";
import Modal from "@/components/ui/Modal";

export default function Location({
  initialLocationId,
  initialConfirmed,
}: {
  initialLocationId: string;
  initialConfirmed: boolean;
}) {
  const t = useTranslations();
  const isMounted = useIsMounted();
  const inputRef = useRef<HTMLInputElement>(null);

  const { selectedId, setSelectedId, confirmLocation, initialize } =
    useLocationStore();

  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const deferredSearch = useDeferredValue(searchQuery);

  useEffect(() => {
    initialize(initialLocationId, initialConfirmed);
    if (!initialConfirmed) {
      const timer = setTimeout(() => setShowPrompt(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [initialLocationId, initialConfirmed, initialize]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  const filteredRegions = regions.filter((region) =>
    t(`regions.${region.key}`)
      .toLowerCase()
      .includes(deferredSearch.toLowerCase()),
  );

  const currentId = isMounted ? selectedId : initialLocationId;
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
        <div className="flex flex-col absolute top-full left-0 mt-4 z-20 bg-card p-4 rounded-lg">
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

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="max-w-[420px]"
        className="p-6"
      >
        <div className="row-between mb-6">
          <h2 className="text-xl font-bold">{t("header.selectLocation")}</h2>
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

        <div className="max-h-[352px] overflow-y-auto space-y-3 pr-6 custom-scrollbar">
          {filteredRegions.length > 0 ? (
            filteredRegions.map((region) => (
              <Button
                key={region.id}
                className={`w-full justify-between h-10 px-4 ${
                  currentId === region.id
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
                {currentId === region.id && <Icon name="location" size={18} />}
              </Button>
            ))
          ) : (
            <div className="py-10 text-center">{t("search.noResults")}</div>
          )}
        </div>
      </Modal>
    </div>
  );
}
