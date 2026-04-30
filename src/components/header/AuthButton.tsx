"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
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
  const [loginOpen, setLoginOpen] = useState(false);

  // ✅ Use server-side authentication state
  // No client-side store needed
  if (serverAuthenticated) {
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
