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
  maxWidth = "max-w-sm",
  className = "p-8",
  showCloseButton = true,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm row-center px-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div
        className={`relative w-full ${maxWidth} rounded-xl bg-background border border-foreground/10 shadow-xl ${className}`}
      >
        {showCloseButton && (
          <Button
            onClick={onClose}
            leftIcon="x"
            iconSize={18}
            className="absolute right-4 top-4 w-8 h-8 justify-center bg-transparent hover:bg-foreground/5 p-0"
          />
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
