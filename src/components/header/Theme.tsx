"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { setCookie } from "@/lib/cookies";
import { useIsMounted } from "@/hooks/useIsMounted";

type ThemeMode = "light" | "dark" | "system";

const THEMES: {
  value: ThemeMode;
  icon: "sun" | "moon" | "monitor";
  label: string;
}[] = [
  { value: "light", icon: "sun", label: "Light" },
  { value: "dark", icon: "moon", label: "Dark" },
  { value: "system", icon: "monitor", label: "System" },
];

export default function ThemeToggle({
  initialTheme,
}: {
  initialTheme: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isMounted = useIsMounted();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!theme || !resolvedTheme) return;
    setCookie("theme", theme);
    setCookie("theme-resolved", resolvedTheme);
  }, [theme, resolvedTheme]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const currentTheme = (isMounted ? theme : initialTheme) as ThemeMode;
  const active = THEMES.find((t) => t.value === currentTheme) ?? THEMES[0];
  const options = THEMES.filter((t) => t.value !== currentTheme);

  const handleSelect = (value: ThemeMode) => {
    setTheme(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        rightIcon="chevronDown"
        iconStyle={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="justify-between px-4 h-10 bg-card hover:bg-card-hover"
      >
        <Icon name={active.icon} size={16} className="mr-2" />
        {active.label}
      </Button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute bg-card rounded-lg mt-4 pt-2 pb-1 w-full left-0 z-20 border border-border shadow-2xl"
        >
          <div className="absolute -top-2 left-6 w-4 h-4 bg-card rotate-45 -z-1 border-t border-l border-border" />
          {options.map(({ value, icon, label }) => (
            <Button
              role="option"
              key={value}
              onClick={() => handleSelect(value)}
              className="w-full mb-1 px-4 h-10 hover:bg-card-hover rounded-none"
            >
              <Icon name={icon} size={16} className="mr-2" />
              {label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
