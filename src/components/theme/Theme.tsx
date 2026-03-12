"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, startTransition } from "react";
import { Button } from "../ui/button";
import { setThemeCookies } from "@/lib/cookies";

export default function ThemeToggle({
  initialTheme,
}: {
  initialTheme: string;
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (theme && resolvedTheme) {
      setThemeCookies(theme, resolvedTheme);
    }
  }, [theme, resolvedTheme]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const currentTheme = mounted ? resolvedTheme : initialTheme;

  const targetTheme = currentTheme === "dark" ? "light" : "dark";

  return (
    <Button
      leftIcon={currentTheme === "dark" ? "sun" : "moon"}
      iconStyle="text-primary"
      iconSize={20}
      onClick={toggleTheme}
      className="justify-center w-10 h-10 mr-4 bg-card hover:bg-card-hover"
      aria-label={`Switch to ${targetTheme} mode`}
    />
  );
}
