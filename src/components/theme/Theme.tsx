"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, startTransition } from "react";
import { Icon } from "@/components/ui/icons/icon";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (theme && resolvedTheme) {
      document.cookie = `theme=${theme}; path=/; max-age=${60 * 60 * 24 * 365}`;
      document.cookie = `theme-resolved=${resolvedTheme}; path=/; max-age=${60 * 60 * 24 * 365}`;
    }
  }, [theme, resolvedTheme]);

  if (!mounted) return <div className="w-10 h-10 mr-3 rounded-lg bg-card" />;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 mr-3 rounded-lg bg-card transition-all cursor-pointer hover:bg-card-hover"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      <Icon
        name={resolvedTheme === "dark" ? "sun" : "moon"}
        size={20}
        className={
          resolvedTheme === "dark" ? "text-primary" : "text-foreground"
        }
      />
    </button>
  );
}
