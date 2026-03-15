"use client";

import { useState } from "react";
import Image from "next/image";

interface BookGalleryProps {
  cover: string;
  gallery?: string[];
  alt: string;
}

export function BookGallery({ cover, gallery, alt }: BookGalleryProps) {
  const allImages = [cover, ...(gallery ?? [])];
  const [activeImage, setActiveImage] = useState(cover);

  return (
    <div className="w-full md:w-80 shrink-0">
      {/* Asosiy rasm */}
      <div className="relative aspect-3/4 w-full rounded-xl shadow-xl overflow-hidden border border-border">
        <Image
          src={activeImage}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 320px"
          priority
        />
      </div>

      {/* Gallery thumbnails */}
      {allImages.length > 0 && (
        <div className="flex gap-2 mt-3">
          {allImages.map((img, index) => (
            <div
              key={index}
              onClick={() => setActiveImage(img)}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
