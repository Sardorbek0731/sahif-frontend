"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";

import { type Locale, Link } from "@/i18n/routing";
import { books } from "@/data/books";
import { getBookTitle } from "@/lib/book";
import { type Book } from "@/types/book";
import { Button } from "../ui/button";

const heroBooks = books.filter((book) => book.isHero);

export default function Hero() {
  const locale = useLocale() as Locale;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = useCallback((index: number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 200);
  }, []);

  const prev = useCallback(() => {
    go(current === 0 ? heroBooks.length - 1 : current - 1);
  }, [current, go]);

  const next = useCallback(() => {
    go(current === heroBooks.length - 1 ? 0 : current + 1);
  }, [current, go]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const book = heroBooks[current] as Book;
  const activeVariant =
    book.variants.find((v) => v.language.startsWith(locale)) ??
    book.variants[0];
  const displayTitle = getBookTitle(book, locale);
  const displayImage = activeVariant.variantImage ?? book.images.cover;
  const finalPrice =
    activeVariant.price.amount - (activeVariant.price.discountAmount ?? 0);

  const authorInitials = book.author
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="relative w-full h-[460px] bg-card rounded-lg overflow-hidden flex">
      {/* Chap nav tugma */}
      <Button
        onClick={prev}
        leftIcon="chevronLeft"
        iconSize={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 justify-center bg-background border border-foreground/10 text-foreground hover:bg-card-hover"
      />

      {/* O'ng nav tugma */}
      <Button
        onClick={next}
        leftIcon="chevronRight"
        iconSize={18}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 justify-center bg-background border border-foreground/10 text-foreground hover:bg-card-hover"
      />

      {/* Chap qism — matn */}
      <div
        className={`flex-1 flex flex-col justify-between px-16 py-11 transition-opacity duration-200 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Yuqori */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            {book.isBestseller && (
              <span className="text-xs font-medium px-3 py-1 rounded-lg bg-primary/15 text-primary w-fit">
                Bestseller
              </span>
            )}
            {book.isNew && (
              <span className="text-xs font-medium px-3 py-1 rounded-lg bg-foreground/10 text-foreground w-fit">
                Yangi
              </span>
            )}
          </div>

          <h1 className="text-2xl font-medium leading-snug text-foreground max-w-md">
            {displayTitle}
          </h1>

          <p className="text-sm text-foreground/60 leading-relaxed max-w-sm line-clamp-3">
            {book.description[locale]}
          </p>
        </div>

        {/* Pastki */}
        <div className="flex flex-col gap-4">
          {/* Muallif */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center text-xs font-medium text-primary shrink-0">
              {authorInitials}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {book.author}
              </p>
              <span className="text-xs text-foreground/50">Muallif</span>
            </div>
          </div>

          {/* Narx */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-medium text-foreground">
              {finalPrice.toLocaleString()} {activeVariant.price.currency}
            </span>
            {activeVariant.price.discountAmount && (
              <span className="text-sm text-foreground/50 line-through">
                {activeVariant.price.amount.toLocaleString()}
              </span>
            )}
          </div>

          {/* Tugmalar + Dots */}
          <div className="flex items-center gap-3">
            <Button
              as={Link}
              href={`/books/${book.slug}/${activeVariant.language}`}
              className="px-5 py-2.5 bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Sotib olish
            </Button>
            <Button
              as={Link}
              href={`/books/${book.slug}/${activeVariant.language}`}
              className="text-sm text-foreground/50 underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Batafsil
            </Button>

            {/* Dots */}
            <div className="flex items-center gap-1.5 ml-auto">
              {heroBooks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-5 bg-foreground"
                      : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* O'ng qism — cover */}
      <div
        className={`w-64 flex items-center justify-start relative overflow-hidden transition-opacity duration-200 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative w-44 h-64 ml-4">
          <div
            className="absolute inset-0 bg-foreground/5 rounded-md border border-foreground/10"
            style={{ transform: "rotate(6deg) translate(12px, 8px)" }}
          />
          <div
            className="absolute inset-0 bg-foreground/5 rounded-md border border-foreground/10"
            style={{ transform: "rotate(3deg) translate(6px, 4px)" }}
          />
          <Image
            src={displayImage}
            alt={displayTitle}
            fill
            className="object-contain rounded-md"
            priority
          />
        </div>
      </div>
    </div>
  );
}
