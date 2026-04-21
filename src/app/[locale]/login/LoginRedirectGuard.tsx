"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/store/useAuthStore";

// Client component — Zustand store orqali isAuthenticated tekshiradi.
// Server-side redirect (cookies) login/page.tsx da bajariladi.
// Bu komponent client-side holat uchun (masalan, boshqa tab da login bo'lsa).
export default function LoginRedirectGuard() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  return null;
}
