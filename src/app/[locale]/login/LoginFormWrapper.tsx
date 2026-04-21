"use client";

import dynamic from "next/dynamic";
import Spinner from "@/components/ui/Spinner";

// ssr: false faqat client component da ishlatilishi mumkin
const LoginForm = dynamic(() => import("@/components/auth/LoginForm"), {
  ssr: false,
  loading: () => <Spinner className="w-8 h-8 border-2" />,
});

export default function LoginFormWrapper() {
  return <LoginForm />;
}
