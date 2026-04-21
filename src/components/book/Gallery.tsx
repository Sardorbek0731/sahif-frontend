"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface BookGalleryProps {
  cover: string;
  gallery?: string[];
  alt: string;
}

export function Gallery({ cover, gallery, alt }: BookGalleryProps) {
  const allImages = [cover, ...(gallery ?? [])];
  const [activeImage, setActiveImage] = useState(cover);
  const t = useTranslations();

  return (
    <div className="w-full md:w-80 shrink-0">
      {/* Asosiy rasm */}
      <Image
        src={activeImage}
        alt={alt}
        width={320}
        height={480}
        sizes="(max-width: 768px) 100vw, 320px"
        className="w-full h-auto rounded-lg"
        preload={true}
      />

      {/* Gallery thumbnails */}
      {allImages.length > 1 && (
        <div
          role="group"
          aria-label={t("viewImage", { index: "gallery" })}
          className="flex gap-2 mt-3"
        >
          {allImages.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveImage(img)}
              aria-label={t("viewImage", { index: index + 1 })}
              aria-current={activeImage === img ? "true" : undefined}
              className={`relative aspect-3/4 flex-1 rounded-lg overflow-hidden border cursor-pointer transition-all ${
                activeImage === img
                  ? "border-primary shadow-md"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Image
                src={img}
                alt={`${alt} — ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
