import { cookies } from "next/headers";
import Location from "@/components/header/Location";
import LangSwitcher from "@/components/header/Lang";
import ThemeToggle from "@/components/header/Theme";
import AuthButton from "@/components/header/AuthButton";

export default async function Header({
  initialTheme,
  initialLocationId,
  initialConfirmed,
}: {
  initialTheme: string;
  initialLocationId: string;
  initialConfirmed: boolean;
}) {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("auth-token");
  const userName = cookieStore.get("user-name")?.value || "";

  return (
    <header className="my-container row-between py-4">
      <div className="flex items-center">
        <Location
          initialLocationId={initialLocationId}
          initialConfirmed={initialConfirmed}
        />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle initialTheme={initialTheme} />
        <LangSwitcher />
        <AuthButton
          serverAuthenticated={hasToken}
          serverUserName={decodeURIComponent(userName)}
        />
      </div>
    </header>
  );
}
