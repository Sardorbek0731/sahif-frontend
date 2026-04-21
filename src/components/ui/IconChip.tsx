import React from "react";
import { cn } from "@/lib/cn";
import { Icon, IconName } from "./icons";

// ─── Types ───────────────────────────────────────────────────────────────────

export type IconChipSize = "sm" | "md";
export type IconChipColor = "primary" | "muted";

export interface IconChipProps {
  icon: IconName;
  size?: IconChipSize;
  color?: IconChipColor;
  className?: string;
  as?: React.ElementType;
}

// ─── Style Maps ──────────────────────────────────────────────────────────────

const SIZE_STYLES: Record<IconChipSize, { wrapper: string; iconSize: number }> =
  {
    sm: { wrapper: "w-7 h-7", iconSize: 14 },
    md: { wrapper: "w-10 h-10", iconSize: 18 },
  };

const COLOR_STYLES: Record<IconChipColor, string> = {
  primary: "bg-primary/10 text-primary",
  muted: "bg-foreground/10 text-muted-foreground",
};

// ─── Component ───────────────────────────────────────────────────────────────

export function IconChip({
  icon,
  size = "sm",
  color = "primary",
  className,
  as,
}: IconChipProps) {
  const Component = as ?? "span";
  const { wrapper, iconSize } = SIZE_STYLES[size];

  return (
    <Component
      className={cn(
        "rounded-lg row-center shrink-0",
        wrapper,
        COLOR_STYLES[color],
        className,
      )}
    >
      <Icon name={icon} size={iconSize} />
    </Component>
  );
}
