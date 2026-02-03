"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, startTransition } from "react";
import { Icon } from "@/components/ui/icons/icon";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" aria-hidden="true" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center w-10 h-10 mr-3 rounded-xl bg-card transition-all active:scale-85 cursor-pointer hover:bg-[#ebebed] dark:hover:bg-[#282828]"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {resolvedTheme === "dark" ? (
        <Icon name="sun" size={18} className="text-yellow-500" />
      ) : (
        <Icon name="moon" size={18} className="text-indigo-600" />
      )}
    </button>
  );
}
