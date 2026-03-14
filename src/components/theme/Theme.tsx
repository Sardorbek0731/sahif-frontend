"use client";

import { useEffect, useSyncExternalStore } from "react";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { setThemeCookies } from "@/lib/cookies";
import { subscribe, isMountedTrue, isMountedFalse } from "@/lib/hooks";

export default function ThemeToggle({
  initialTheme,
}: {
  initialTheme: string;
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isMounted = useSyncExternalStore(
    subscribe,
    isMountedTrue,
    isMountedFalse,
  );

  useEffect(() => {
    if (theme && resolvedTheme) {
      setThemeCookies(theme, resolvedTheme);
    }
  }, [theme, resolvedTheme]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const currentTheme = isMounted ? resolvedTheme : initialTheme;
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
