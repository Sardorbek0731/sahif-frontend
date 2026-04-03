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
