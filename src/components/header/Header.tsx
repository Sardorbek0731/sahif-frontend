import { cookies } from "next/headers";
import Location from "@/components/header/Location";
import {
  LanguageSwitcher,
  ThemeToggle,
} from "@/components/header/HeaderControls";
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
        <LanguageSwitcher />
        <AuthButton
          serverAuthenticated={hasToken}
          serverUserName={decodeURIComponent(userName)}
        />
      </div>
    </header>
  );
}
