"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, startTransition } from "react";
import { Button } from "../ui/button";

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

  if (!mounted)
    return <Button className="w-10 h-10 mr-4 bg-card hover:bg-card-hover" />;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      leftIcon={resolvedTheme === "dark" ? "sun" : "moon"}
      iconStyle={resolvedTheme === "dark" ? "text-primary" : ""}
      iconSize={20}
      onClick={toggleTheme}
      className="justify-center w-10 h-10 mr-4 bg-card hover:bg-card-hover"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    />
  );
}
