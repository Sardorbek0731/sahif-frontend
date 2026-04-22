"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslations } from "next-intl";
import { useIsMounted } from "@/hooks/useIsMounted";
import { UserMenu } from "@/components/navbar/NavActions";
import LoginModal from "@/components/auth/LoginModal";

export default function AuthButton({
  serverAuthenticated,
  serverUserName,
}: {
  serverAuthenticated: boolean;
  serverUserName: string;
}) {
  const t = useTranslations("");
  const isMounted = useIsMounted();
  const { isAuthenticated: clientAuthenticated } = useAuthStore();
  const [loginOpen, setLoginOpen] = useState(false);

  const isAuthenticated = isMounted ? clientAuthenticated : serverAuthenticated;

  if (isAuthenticated) {
    return <UserMenu serverUserName={serverUserName} />;
  }

  return (
    <>
      <Button
        leftIcon="login"
        onClick={() => setLoginOpen(true)}
        className="h-10 px-4"
      >
        {t("pages.login")}
      </Button>
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
