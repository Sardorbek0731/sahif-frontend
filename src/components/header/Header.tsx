import { getOptionalAuth } from "@/lib/auth";
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
  // ✅ Get optional authentication (better pattern)
  const user = await getOptionalAuth();
  const isAuthenticated = !!user;
  const userName = user ? `${user.firstName} ${user.lastName}` : "";

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
          serverAuthenticated={isAuthenticated}
          serverUserName={userName}
        />
      </div>
    </header>
  );
}
