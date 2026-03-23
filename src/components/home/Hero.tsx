"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";

import Image from "next/image";

import { type Locale, Link } from "@/i18n/routing";
import { books } from "@/data/books";
import { getBookTitle } from "@/lib/book";
import { getAuthor } from "@/lib/author";
import { type Book } from "@/types/book";
import { Button } from "../ui/button";
import { SKIP_WORDS } from "@/constants";

import HeroActions from "@/components/home/HeroActions";

const heroBooks = books.filter((book) => book.isBestseller || book.isNew);

export default function Hero() {
  const locale = useLocale() as Locale;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const t = useTranslations("home.hero");

  const go = useCallback((index: number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 250);
  }, []);

  const prev = useCallback(() => {
    go(current === 0 ? heroBooks.length - 1 : current - 1);
  }, [current, go]);

  const next = useCallback(() => {
    go(current === heroBooks.length - 1 ? 0 : current + 1);
  }, [current, go]);

  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next]);

  const book = heroBooks[current] as Book;
  const activeVariant =
    book.variants.find((v) => v.language.startsWith(locale)) ??
    book.variants[0];
  const bookTitle = getBookTitle(book, locale);
  const bookImage = activeVariant.variantImage ?? book.images.cover;
  const finalPrice =
    activeVariant.price.amount - (activeVariant.price.discountAmount ?? 0);

  const author = getAuthor(book.authorSlug);
  const authorName = author?.name ?? book.authorSlug;
  const authorInitials = authorName
    .split(" ")
    .filter((n) => !SKIP_WORDS.has(n.toLowerCase()))
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <section className="relative w-full bg-card rounded-lg row-between p-6 h-100">
      <div
        className={`w-[60%] flex flex-col items-start h-full justify-between overflow-hidden transition-opacity duration-200 ${animating ? "opacity-0" : "opacity-100"}`}
      >
        {book.isBestseller && (
          <span className="border border-primary bg-primary/15 text-primary py-1 px-3 rounded-md text-sm mb-4">
            {t("bestseller")}
          </span>
        )}
        {book.isNew && (
          <span className="border border-green-500 bg-green-500/15 text-green-500 py-1 px-3 rounded-md text-sm mb-4">
            {t("new")}
          </span>
        )}

        <div>
          <Link
            href={`/books/${book.slug}/${activeVariant.language}`}
            className="hover:text-primary transition-colors"
          >
            <h1 className="text-2xl font-bold mb-2">{bookTitle}</h1>
          </Link>

          <p className="mb-4 text-foreground/75 line-clamp-3">
            {book.description[locale]}
          </p>
        </div>

        <Link
          href={`/authors/${book.authorSlug}`}
          className="flex items-center mb-4 group"
        >
          {author?.image ? (
            <Image
              src={author.image}
              alt={author.name}
              width={44}
              height={44}
              className="w-11 h-11 rounded-full object-cover mr-4"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-primary/20 border border-primary/30 row-center text-primary font-bold text-sm mr-4">
              {authorInitials}
            </div>
          )}
          <span className="flex flex-col justify-between h-full">
            <p className="group-hover:text-primary transition-colors">
              {authorName}
            </p>
            <span className="text-sm text-foreground/75">{t("author")}</span>
          </span>
        </Link>

        <div className="mb-4">
          <span className="text-primary text-2xl mr-4">
            {finalPrice.toLocaleString()} {activeVariant.price.currency}
          </span>
          {activeVariant.price.discountAmount && (
            <span className="line-through text-foreground/75">
              {activeVariant.price.amount.toLocaleString()}
            </span>
          )}
        </div>

        <HeroActions
          bookId={book.id}
          slug={book.slug}
          language={activeVariant.language}
        />
      </div>

      <div
        className={`absolute right-6 top-6 bottom-6 transition-opacity duration-200 ${animating ? "opacity-0" : "opacity-100"}`}
      >
        <div
          className="absolute inset-0 rounded-xl bg-primary/20 border border-primary/40"
          style={{ transform: "rotate(5deg) translateX(10px)" }}
        />
        <div
          className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
          style={{ transform: "rotate(2.5deg) translateX(5px)" }}
        />
        <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-primary rounded-tl-lg z-10" />
        <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary rounded-br-lg z-10" />
        <Link href={`/books/${book.slug}/${activeVariant.language}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bookImage}
            alt={bookTitle}
            className="relative h-full w-auto rounded-xl z-10"
          />
        </Link>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center">
        <Button
          onClick={prev}
          leftIcon="chevronLeft"
          iconSize={18}
          iconStyle="transition-all text-foreground/25 group-hover:text-foreground/75"
          className="group transition-all w-9 h-9 border border-foreground/25 justify-center bg-foreground/5 mr-4 hover:border-foreground/75 hover:bg-foreground/10"
        />

        {heroBooks.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-2 cursor-pointer rounded-full transition-all duration-250 mr-1 last:mr-0 ${
              i === current
                ? "w-5 bg-foreground"
                : "w-2 bg-foreground/20 hover:bg-foreground/50"
            }`}
          />
        ))}

        <Button
          onClick={next}
          leftIcon="chevronRight"
          iconSize={18}
          iconStyle="transition-all text-foreground/25 group-hover:text-foreground/75"
          className="group transition-all w-9 h-9 border border-foreground/25 justify-center bg-foreground/5 ml-3 hover:border-foreground/75 hover:bg-foreground/10"
        />
      </div>
    </section>
  );
}
