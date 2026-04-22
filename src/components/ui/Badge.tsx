import { ReactNode } from "react";
import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────────────────────────────

export type BadgeVariant =
  | "new"
  | "trending"
  | "bestseller"
  | "primary"
  | "count";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

// ─── Style Map ───────────────────────────────────────────────────────────────

const PRIMARY_BADGE_STYLE =
  "border border-primary bg-primary/15 text-primary py-1 px-3 rounded-lg text-sm";

const BADGE_STYLES: Record<BadgeVariant, string> = {
  new: "border border-green-500 bg-green-500/15 text-green-500 py-1 px-3 rounded-lg text-sm",
  trending:
    "border border-orange-500 bg-orange-500/15 text-orange-500 py-1 px-3 rounded-lg text-sm",
  bestseller: PRIMARY_BADGE_STYLE,
  primary: PRIMARY_BADGE_STYLE,
  count:
    "bg-primary text-white rounded-full h-5 min-w-5 px-1 row-center text-[10px] font-bold",
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Badge({
  variant = "primary",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(BADGE_STYLES[variant], className)}
      role={variant === "count" ? "status" : undefined}
    >
      {children}
    </span>
  );
}
