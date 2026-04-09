"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  showCloseButton?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  maxWidth,
  className,
  showCloseButton = true,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

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
        className={`relative w-full ${maxWidth} rounded-lg bg-background p-6 ${className}`}
      >
        {showCloseButton && (
          <Button
            onClick={onClose}
            leftIcon="x"
            iconSize={18}
            className="absolute right-6 top-6 w-8 h-8 justify-center bg-card hover:bg-card-hover"
          />
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
