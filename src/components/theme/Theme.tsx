"use client";

import { useEffect, useSyncExternalStore } from "react";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { setThemeCookies } from "@/lib/cookies";
import { subscribe, getClientSnapshot, getServerSnapshot } from "@/lib/hooks";

function disableTransitions() {
  const style = document.createElement("style");
  style.textContent = "* { transition: none !important; }";
  document.head.appendChild(style);
  setTimeout(() => document.head.removeChild(style), 100);
}

export default function ThemeToggle({
  initialTheme,
}: {
  initialTheme: string;
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isMounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (theme && resolvedTheme) {
      setThemeCookies(theme, resolvedTheme);
    }
  }, [theme, resolvedTheme]);

  const toggleTheme = () => {
    disableTransitions();
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  useEffect(() => {
    disableTransitions();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        disableTransitions();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

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
