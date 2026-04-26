"use client";

import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: string;
  className?: string;
  showCloseButton?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  maxWidth,
  className,
  showCloseButton = true,
}: ModalProps) {
  const t = useTranslations();
  const overlayRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  // onClose ni har render da ref orqali yangilaymiz — stale closure muammosini hal qiladi
  // useLayoutEffect — render dan keyin, DOM yangilanishidan oldin ishlaydi (React Compiler safe)
  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  });

  // useId — SSR va client da bir xil ID (Math.random() hydration mismatch beradi)
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };

    document.addEventListener("keydown", handleKey);

    const prev = document.body.dataset.modalCount;
    const count = parseInt(prev ?? "0") + 1;
    document.body.dataset.modalCount = String(count);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      const current = parseInt(document.body.dataset.modalCount ?? "1") - 1;
      document.body.dataset.modalCount = String(current);
      if (current <= 0) {
        document.body.style.overflow = "";
        delete document.body.dataset.modalCount;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm row-center"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn(
          "relative w-full rounded-lg bg-background p-6",
          maxWidth,
          className,
        )}
      >
        {/* Yashirin title — faqat screen reader uchun, agar tashqaridan title berilmagan bo'lsa */}
        {title && (
          <span id={titleId} className="sr-only">
            {title}
          </span>
        )}

        {showCloseButton && (
          <Button
            size="sm"
            onClick={onClose}
            leftIcon="x"
            iconSize="lg"
            aria-label={t("close")}
            className="absolute right-6 top-6"
          />
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
