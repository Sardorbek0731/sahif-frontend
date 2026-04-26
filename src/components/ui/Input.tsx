"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import { Icon, IconName, ICON_SIZES } from "./icons";

// ─── Types ───────────────────────────────────────────────────────────────────

export type InputVariant = "default" | "filled";
export type InputSize = "sm" | "md";

// ─── Style Maps ──────────────────────────────────────────────────────────────

const VARIANT_WRAPPER: Record<InputVariant, string> = {
  default: "border border-border bg-card",
  filled: "bg-card",
};

const SIZE_WRAPPER: Record<InputSize, string> = {
  sm: "h-8 px-2 text-sm",
  md: "h-10 px-4",
};

// Input size'ga mos icon o'lchami
const INPUT_ICON_SIZES: Record<InputSize, number> = {
  sm: ICON_SIZES.sm, // 14px
  md: ICON_SIZES.md, // 16px
};

// ─── Input Props ─────────────────────────────────────────────────────────────

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  ref?: React.Ref<HTMLInputElement>;
  variant?: InputVariant;
  size?: InputSize;
  leftIcon?: IconName;
  rightIcon?: IconName;
  prefix?: string;
  label?: string;
  error?: string;
  containerClassName?: string; // tashqi <div> ga (layout: w-full, mb-6, va h.k.)
  wrapperClassName?: string; // ichki border/bg li <div> ga (vizual: hover, va h.k.)
  // className → <input> ga
}

// ─── Input Component ─────────────────────────────────────────────────────────

// React 19: ref oddiy prop sifatida uzatiladi, forwardRef kerak emas
export function Input({
  ref,
  variant = "default",
  size = "md",
  leftIcon,
  rightIcon,
  prefix,
  label,
  error,
  containerClassName,
  wrapperClassName,
  className,
  id,
  ...rest
}: InputProps) {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className={cn("w-full", containerClassName)}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium mb-1.5 block text-foreground"
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "rounded-lg flex items-center gap-2 transition-all",
          "focus-within:border-primary",
          error && "border-rose-500",
          VARIANT_WRAPPER[variant],
          SIZE_WRAPPER[size],
          wrapperClassName,
        )}
      >
        {prefix && (
          <span className="text-foreground/60 select-none shrink-0">
            {prefix}
          </span>
        )}
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={INPUT_ICON_SIZES[size]}
            className="shrink-0 text-muted-foreground"
          />
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground",
            className,
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error && errorId ? errorId : undefined}
          {...rest}
        />
        {rightIcon && (
          <Icon
            name={rightIcon}
            size={INPUT_ICON_SIZES[size]}
            className="shrink-0 text-muted-foreground"
          />
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-rose-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── OTPInput Props ───────────────────────────────────────────────────────────

export interface OTPInputProps {
  onComplete: (code: string) => void;
  isLoading?: boolean;
  className?: string;
}

// ─── OTPInput Component ───────────────────────────────────────────────────────

export function OTPInput({ onComplete, isLoading, className }: OTPInputProps) {
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const t = useTranslations("auth.login.otp");

  const handleChange = (index: number, val: string) => {
    if (isLoading) return;
    if (!/^\d*$/.test(val)) return;

    const next = [...values];
    next[index] = val.slice(-1);
    setValues(next);

    // Focus next
    if (val && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    // All filled — call onComplete
    if (next.every((v) => v !== "") && val) {
      onComplete(next.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    if (isLoading) return;
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setValues(pasted.split(""));
      onComplete(pasted);
    }
  };

  return (
    <div className={cn("flex gap-2", className)} onPaste={handlePaste}>
      {values.map((v, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="tel"
          inputMode="numeric"
          maxLength={1}
          value={v}
          disabled={isLoading}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          aria-label={t("digitLabel", { index: i + 1 })}
          className="w-full aspect-square text-center text-lg font-bold text-foreground bg-card border border-border rounded-lg outline-none focus:border-primary transition-colors disabled:opacity-50"
          autoFocus={i === 0}
        />
      ))}
    </div>
  );
}
