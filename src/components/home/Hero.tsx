"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

import Image from "next/image";

import { type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { books } from "@/data/books";
import { getBookTitle, getBookDescription } from "@/lib/book";
import { getAuthor } from "@/lib/author";
import { type Book } from "@/types/book";
import { Button } from "../ui/Button";
import { SKIP_WORDS } from "@/constants";

import BookActions from "../shared/BookActions";
import BookBadge from "../shared/BookBadge";

const heroBooks = books.filter(
  (book) => book.isBestseller || book.isNew || book.isTrending,
);

const DOT_SIZE = 8;
const DOT_MARGIN = 3;
const SLOT = DOT_SIZE + DOT_MARGIN * 2;
const getLeft = (i: number) => i * SLOT + DOT_MARGIN;

export default function Hero() {
  const locale = useLocale() as Locale;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const t = useTranslations("");

  const pillRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(0);

  const go = useCallback((index: number) => {
    if (heroBooks.length <= 1) {
      setCurrent(index);
      return;
    }

    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 200);
  }, []);

  const prev = useCallback(() => {
    if (heroBooks.length <= 1) return;
    go(current === 0 ? heroBooks.length - 1 : current - 1);
  }, [current, go]);

  const next = useCallback(() => {
    if (heroBooks.length <= 1) return;
    go(current === heroBooks.length - 1 ? 0 : current + 1);
  }, [current, go]);

  useEffect(() => {
    if (heroBooks.length <= 1) return;
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next]);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (heroBooks.length <= 1) return;

    const prevIndex = prevIndexRef.current;
    prevIndexRef.current = current;

    const pill = pillRef.current;
    if (!pill || prevIndex === current) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const prevLeft = getLeft(prevIndex);
    const currLeft = getLeft(current);

    const isWrap =
      (prevIndex === 0 && current === heroBooks.length - 1) ||
      (prevIndex === heroBooks.length - 1 && current === 0);

    if (isWrap) {
      pill.style.transition = "none";
      pill.style.left = `${currLeft}px`;
      pill.style.width = `${DOT_SIZE}px`;
      return;
    }

    if (current > prevIndex) {
      pill.style.transition = "width 100ms cubic-bezier(.4,0,.2,1)";
      pill.style.width = `${currLeft - prevLeft + DOT_SIZE}px`;
      timeoutRef.current = setTimeout(() => {
        pill.style.transition =
          "left 100ms cubic-bezier(.4,0,.2,1), width 100ms cubic-bezier(.4,0,.2,1)";
        pill.style.left = `${currLeft}px`;
        pill.style.width = `${DOT_SIZE}px`;
      }, 100);
    } else {
      pill.style.transition =
        "left 100ms cubic-bezier(.4,0,.2,1), width 100ms cubic-bezier(.4,0,.2,1)";
      pill.style.left = `${currLeft}px`;
      pill.style.width = `${prevLeft - currLeft + DOT_SIZE}px`;
      timeoutRef.current = setTimeout(() => {
        pill.style.transition = "width 100ms cubic-bezier(.4,0,.2,1)";
        pill.style.width = `${DOT_SIZE}px`;
      }, 100);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

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
        className={`w-[60%] flex flex-col items-start h-full justify-between transition-all duration-200 ${animating ? "opacity-0" : "opacity-100"}`}
      >
        <BookBadge className="mb-3" book={book} />

        <div>
          <Link
            href={`/books/${book.slug}/${activeVariant.language}`}
            className="hover:text-primary transition-colors"
          >
            <h1 className="text-2xl font-bold mb-2">{bookTitle}</h1>
          </Link>

          <p className="mb-3 text-muted-foreground line-clamp-3">
            {getBookDescription(book, locale)}
          </p>
        </div>

        <Link
          href={`/authors/${book.authorSlug}`}
          className="flex items-center mb-3 group"
        >
          {author?.image ? (
            <Image
              src={author.image}
              alt={author.name}
              width={44}
              height={44}
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/50 row-center text-primary font-bold text-sm mr-3">
              {authorInitials}
            </div>
          )}
          <span>
            <p className="group-hover:text-primary transition-colors">
              {authorName}
            </p>
            <span className="text-sm text-muted-foreground">
              {t("home.hero.author")}
            </span>
          </span>
        </Link>

        <div className="mb-3">
          <span className="text-primary text-2xl mr-3">
            {finalPrice.toLocaleString()} {activeVariant.price.currency}
          </span>
          {activeVariant.price.discountAmount && (
            <span className="line-through text-muted-foreground">
              {activeVariant.price.amount.toLocaleString()}
            </span>
          )}
        </div>

        <BookActions
          bookId={book.id}
          slug={book.slug}
          language={activeVariant.language}
          isOutOfStock={activeVariant.stockCount === 0}
        />
      </div>

      <div
        className={`absolute right-6 top-6 bottom-6 transition-opacity duration-200 ${animating ? "opacity-0" : "opacity-100"}`}
      >
        <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-primary rounded-tl-lg" />
        <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary rounded-br-lg" />
        <Link href={`/books/${book.slug}/${activeVariant.language}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bookImage}
            alt={bookTitle}
            className="relative h-full w-auto rounded-lg"
          />
        </Link>
      </div>

      {heroBooks.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center">
          <Button
            onClick={prev}
            leftIcon="chevronLeft"
            iconSize={18}
            iconStyle="transition-all text-muted-foreground group-hover:text-foreground"
            className="group transition-all w-8 h-8 border border-border justify-center bg-background mr-3 hover:border-foreground"
          />

          <div
            className="relative flex items-center"
            style={{
              width: `${heroBooks.length * SLOT}px`,
              height: `${DOT_SIZE}px`,
            }}
          >
            {heroBooks.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="absolute h-2 w-2 rounded-full bg-foreground/15 hover:bg-foreground/30 transition-colors cursor-pointer"
                style={{ left: getLeft(i) }}
              />
            ))}

            <div
              ref={pillRef}
              className="absolute h-2 rounded-full bg-foreground pointer-events-none"
              style={{
                left: getLeft(0),
                width: DOT_SIZE,
              }}
            />
          </div>

          <Button
            onClick={next}
            leftIcon="chevronRight"
            iconSize={18}
            iconStyle="transition-all text-muted-foreground group-hover:text-foreground"
            className="group transition-all w-8 h-8 border border-border justify-center bg-background ml-3 hover:border-foreground"
          />
        </div>
      )}
    </section>
  );
}
