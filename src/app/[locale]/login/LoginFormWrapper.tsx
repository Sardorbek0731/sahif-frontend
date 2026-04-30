"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import dynamic from "next/dynamic";
import Spinner from "@/components/ui/Spinner";

const LoginForm = dynamic(() => import("@/components/auth/LoginForm"), {
  ssr: false,
  loading: () => <Spinner className="w-8 h-8 border-2" />,
});

export default function LoginFormWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSuccess = () => {
    // Get the 'from' parameter (where user wanted to go)
    const from = searchParams.get("from");

    if (from) {
      // Redirect to the original destination
      router.push(from);
    } else {
      // Default: redirect to home
      router.push("/");
    }

    // Refresh to update server components
    router.refresh();
  };

  return <LoginForm onSuccess={handleSuccess} />;
}
