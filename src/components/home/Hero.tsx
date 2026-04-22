"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { useLocale, useTranslations } from "next-intl";

import Image from "next/image";

import { type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { books } from "@/data/books";
import { getBookTitle, getBookDescription } from "@/lib/book";
import { getAuthor } from "@/lib/author";
import { type Book } from "@/types/book";
import { Button } from "../ui/Button";

import BookActions from "../shared/BookActions";
import BookBadge from "../shared/BookBadge";
import AuthorAvatar from "../shared/AuthorAvatar";

const heroBooks = books
  .filter((book) => book.heroOrder !== undefined)
  .sort((a, b) => a.heroOrder! - b.heroOrder!)
  .slice(0, 10);

const DOT_SIZE = 8;
const DOT_MARGIN = 3;
const SLOT = DOT_SIZE + DOT_MARGIN * 2;
const getLeft = (i: number) => i * SLOT + DOT_MARGIN;

export default function Hero() {
  const locale = useLocale() as Locale;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations("");

  const pillRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(0);

  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pillAnimationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // Ref lar - stale closure muammosini hal qilish uchun
  const currentRef = useRef(current);
  const animatingRef = useRef(animating);
  const isHoveredRef = useRef(isHovered);

  // Ref larni sinxron saqlash
  useLayoutEffect(() => {
    currentRef.current = current;
    animatingRef.current = animating;
    isHoveredRef.current = isHovered;
  });

  // Barcha timerlarni tozalash funksiyasi
  const clearAllTimers = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }
  };

  // Auto-advance timer ni boshlash
  const startAutoAdvance = useCallback(() => {
    if (heroBooks.length <= 1) return;

    clearAllTimers();

    autoAdvanceTimerRef.current = setTimeout(() => {
      // Animatsiya yoki hover holatini tekshirish
      if (animatingRef.current || isHoveredRef.current) return;

      const nextIndex =
        currentRef.current === heroBooks.length - 1
          ? 0
          : currentRef.current + 1;
      setAnimating(true);

      animationTimerRef.current = setTimeout(() => {
        setCurrent(nextIndex);
        setAnimating(false);
      }, 200);
    }, 10000);
  }, []); // heroBooks.length constant, clearAllTimers stable

  // current yoki isHovered o'zgarganda timer ni qayta boshlash
  useEffect(() => {
    startAutoAdvance();
    return clearAllTimers;
  }, [current, isHovered, startAutoAdvance]);

  // Slaydga o'tish funksiyasi
  const go = useCallback((index: number) => {
    if (heroBooks.length <= 1) {
      setCurrent(index);
      return;
    }
    if (animatingRef.current) return;

    clearAllTimers();
    setAnimating(true);

    animationTimerRef.current = setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 200);
  }, []); // heroBooks.length constant, animatingRef va clearAllTimers stable

  const prev = () => {
    if (heroBooks.length <= 1) return;
    go(current === 0 ? heroBooks.length - 1 : current - 1);
  };

  const next = () => {
    if (heroBooks.length <= 1) return;
    go(current === heroBooks.length - 1 ? 0 : current + 1);
  };

  // Pill animation effect
  useEffect(() => {
    if (heroBooks.length <= 1) return;

    const prevIndex = prevIndexRef.current;
    prevIndexRef.current = current;

    const pill = pillRef.current;
    if (!pill || prevIndex === current) return;

    if (pillAnimationTimerRef.current) {
      clearTimeout(pillAnimationTimerRef.current);
      pillAnimationTimerRef.current = null;
    }

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
      pillAnimationTimerRef.current = setTimeout(() => {
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
      pillAnimationTimerRef.current = setTimeout(() => {
        pill.style.transition = "width 100ms cubic-bezier(.4,0,.2,1)";
        pill.style.width = `${DOT_SIZE}px`;
      }, 100);
    }

    return () => {
      if (pillAnimationTimerRef.current) {
        clearTimeout(pillAnimationTimerRef.current);
        pillAnimationTimerRef.current = null;
      }
    };
  }, [current]);

  // Keyboard navigation - stale closure muammosini hal qilish
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Agar input/textarea focus bo'lsa, ignore qilish
      const activeElement = document.activeElement;
      if (
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA" ||
        activeElement?.getAttribute("contenteditable") === "true"
      ) {
        return;
      }

      // Animatsiya yoki pause holatini tekshirish
      if (animatingRef.current || heroBooks.length <= 1) return;

      const currentIndex = currentRef.current;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          go(currentIndex === 0 ? heroBooks.length - 1 : currentIndex - 1);
          break;
        case "ArrowRight":
          e.preventDefault();
          go(currentIndex === heroBooks.length - 1 ? 0 : currentIndex + 1);
          break;
        case "Home":
          e.preventDefault();
          go(0);
          break;
        case "End":
          e.preventDefault();
          go(heroBooks.length - 1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [go]); // go funksiyasi dependency arrayda

  if (heroBooks.length === 0) return null;

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

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label={t("home.hero.carousel")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="relative w-full bg-card rounded-lg row-between p-6 h-100"
    >
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={t("home.hero.slideLabel", {
          current: current + 1,
          total: heroBooks.length,
        })}
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
          <AuthorAvatar
            name={authorName}
            image={author?.image}
            size={48}
            className="mr-3"
          />
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
          stockCount={activeVariant.stockCount}
          isOutOfStock={activeVariant.stockCount === 0}
        />
      </div>

      <div
        className={`absolute right-6 top-6 bottom-6 transition-opacity duration-200 ${animating ? "opacity-0" : "opacity-100"}`}
      >
        <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-primary rounded-tl-lg" />
        <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary rounded-br-lg" />
        <Link href={`/books/${book.slug}/${activeVariant.language}`}>
          <Image
            src={bookImage}
            alt={bookTitle}
            width={400}
            height={600}
            sizes="(max-width: 768px) 50vw, 300px"
            className="h-full w-auto rounded-lg"
          />
        </Link>
      </div>

      {/* Live region for screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {t("home.hero.currentSlide", { title: bookTitle })}
      </div>

      {heroBooks.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center">
          <Button
            onClick={prev}
            leftIcon="chevronLeft"
            iconSize={18}
            iconStyle="transition-all text-muted-foreground group-hover:text-foreground"
            aria-label={t("goToSlide", {
              index: current === 0 ? heroBooks.length : current,
            })}
            className="group transition-all w-8 h-8 border border-border bg-background mr-3 hover:border-foreground"
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
                aria-label={t("goToSlide", { index: i + 1 })}
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
            aria-label={t("goToSlide", {
              index: current === heroBooks.length - 1 ? 1 : current + 2,
            })}
            className="group transition-all w-8 h-8 border border-border bg-background ml-3 hover:border-foreground"
          />
        </div>
      )}
    </section>
  );
}
