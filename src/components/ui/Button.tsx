import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, IconName } from "./icons";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ButtonVariant =
  | "default"
  | "primary"
  | "ghost"
  | "danger"
  | "outline"
  | "solid"
  | "selected"
  | "primaryGhost";
export type ButtonSize = "sm" | "md";

// ─── Style Maps ──────────────────────────────────────────────────────────────

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  default: "bg-card enabled:hover:bg-card-hover",
  primary: "bg-primary enabled:hover:bg-primary/80",
  ghost: "bg-transparent enabled:hover:bg-card-hover",
  outline: "border border-border bg-card enabled:hover:bg-card-hover",
  danger: "text-rose-500 enabled:hover:bg-rose-500/5",
  solid: "bg-foreground text-background enabled:hover:bg-foreground/80",
  selected: "bg-primary/15 text-primary",
  primaryGhost:
    "bg-primary/5 text-primary border border-primary/15 hover:bg-primary/10",
};

// Text bor holat uchun
const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4",
};

// Icon-only holat uchun (children yo'q)
const ICON_SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-8 w-8 p-0",
  md: "h-10 w-10 p-0",
};

// ─── Props ───────────────────────────────────────────────────────────────────

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: IconName;
  rightIcon?: IconName;
  iconSize?: number;
  iconStyle?: string;
};

// Icon-only: aria-label majburiy (accessibility uchun)
type IconOnlyProps =
  | { children?: never; leftIcon: IconName; "aria-label": string }
  | { children?: never; rightIcon: IconName; "aria-label": string };

// Text bor: aria-label ixtiyoriy
type WithChildrenProps = { children: ReactNode };

type ButtonProps<T extends React.ElementType = "button"> = ButtonBaseProps &
  (IconOnlyProps | WithChildrenProps) &
  Omit<React.ComponentPropsWithoutRef<T>, "children"> & {
    as?: T;
    children?: ReactNode;
  };

// ─── Component ───────────────────────────────────────────────────────────────

export const Button = <T extends React.ElementType = "button">({
  as,
  variant = "default",
  size = "md",
  leftIcon,
  rightIcon,
  iconSize = 16,
  iconStyle = "",
  children,
  className,
  ...props
}: ButtonProps<T>) => {
  const Component = as ?? "button";
  const isIconOnly = !children && (!!leftIcon || !!rightIcon);

  const defaultProps =
    Component === "button" && !props.type ? { type: "button" as const } : {};

  const classes = cn(
    "flex items-center rounded-lg transition-all cursor-pointer",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    VARIANT_STYLES[variant],
    isIconOnly ? ICON_SIZE_STYLES[size] : SIZE_STYLES[size],
    className,
  );

  return (
    <Component className={classes} {...defaultProps} {...props}>
      {leftIcon && (
        <Icon
          name={leftIcon}
          size={iconSize}
          className={cn(iconStyle, !isIconOnly && children && "mr-2")}
        />
      )}
      {children}
      {rightIcon && (
        <Icon
          name={rightIcon}
          size={iconSize}
          className={cn(iconStyle, !isIconOnly && children && "ml-2")}
        />
      )}
    </Component>
  );
};
