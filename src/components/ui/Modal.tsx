"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
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
      <div className="relative w-full max-w-sm rounded-lg bg-card border border-foreground/10 p-8 shadow-xl">
        <Button
          onClick={onClose}
          leftIcon="x"
          iconSize={18}
          iconStyle="text-foreground/50 hover:text-foreground transition-colors"
          className="absolute right-4 top-4 w-8 h-8 justify-center bg-transparent hover:bg-foreground/5"
        />
        {children}
      </div>
    </div>,
    document.body,
  );
}
