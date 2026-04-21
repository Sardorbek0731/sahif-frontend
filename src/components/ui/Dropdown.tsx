"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────────────────────────────

export type DropdownArrowPosition = "left" | "center" | "right";
export type DropdownAlign = "left" | "right";

export interface DropdownProps {
  // React.ReactElement — cloneElement uchun (ReactNode emas)
  trigger: React.ReactElement | ((open: boolean) => React.ReactElement);
  children: ReactNode;
  arrowPosition?: DropdownArrowPosition;
  // Panel qaysi tomonga joylashadi: "left" → left-0, "right" → right-0
  align?: DropdownAlign;
  // Controlled rejim: isOpen + onToggle berilsa controlled, aks holda uncontrolled
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
  // aria-haspopup qiymati: "listbox" (select), "menu" (nav menu), "dialog" va h.k.
  role?: "listbox" | "menu" | "dialog" | "tree" | "grid";
}

// ─── Style Maps ──────────────────────────────────────────────────────────────

const ARROW_POSITION: Record<DropdownArrowPosition, string> = {
  left: "left-6",
  center: "left-1/2 -translate-x-1/2",
  right: "right-6",
};

const ALIGN_STYLES: Record<DropdownAlign, string> = {
  left: "left-0",
  right: "right-0",
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Dropdown({
  trigger,
  children,
  arrowPosition = "left",
  align = "left",
  isOpen: controlledOpen,
  onToggle,
  className,
  role = "listbox",
}: DropdownProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = !open;
    if (!isControlled) setInternalOpen(next);
    onToggle?.(next);
  };

  // Click-outside va Escape — faqat panel ochiq bo'lganda faol
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        if (!isControlled) setInternalOpen(false);
        onToggle?.(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (!isControlled) setInternalOpen(false);
        onToggle?.(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEsc);
    };
    // React Compiler memoizatsiya qiladi — useCallback kerak emas
  }, [open, isControlled, onToggle]);

  // trigger funksiya bo'lsa — open holatini uzatib render qilamiz
  // trigger element bo'lsa — cloneElement orqali onClick + aria qo'shamiz
  const resolvedTrigger =
    typeof trigger === "function" ? trigger(open) : trigger;

  const existingOnClick = (
    resolvedTrigger.props as { onClick?: React.MouseEventHandler }
  ).onClick;

  const triggerWithProps = React.cloneElement(
    resolvedTrigger as React.ReactElement<Record<string, unknown>>,
    {
      onClick: (e: React.MouseEvent) => {
        existingOnClick?.(e);
        toggle();
      },
      "aria-expanded": open,
      "aria-haspopup": role,
    },
  );

  return (
    <div className="relative" ref={wrapperRef}>
      {triggerWithProps}
      {open && (
        <div
          className={cn(
            "absolute top-full mt-4 bg-card rounded-lg border border-border shadow-2xl z-20",
            ALIGN_STYLES[align],
            className,
          )}
        >
          {/* Arrow triangle */}
          <div
            className={cn(
              "absolute -top-2 w-4 h-4 bg-card rotate-45 -z-1 border-t border-l border-border",
              ARROW_POSITION[arrowPosition],
            )}
          />
          {children}
        </div>
      )}
    </div>
  );
}
