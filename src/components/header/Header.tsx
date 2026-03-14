import Location from "@/components/location/Location";
import LangSwitcher from "@/components/lang/Lang";
import ThemeToggle from "@/components/theme/Theme";
import { Button } from "@/components/ui/button";

export default function Header({
  initialTheme,
  initialLocationId,
  initialConfirmed,
}: {
  initialTheme: string;
  initialLocationId: string;
  initialConfirmed: boolean;
}) {
  return (
    <header className="my-container row-between py-4">
      <div className="flex items-center">
        <Location
          initialLocationId={initialLocationId}
          initialConfirmed={initialConfirmed}
        />

        <a href="tel:+998915723949">
          <Button
            leftIcon="callCenter"
            className="bg-card hover:bg-card-hover h-10 px-4"
          >
            +998 91 572 3949 |{"\u00A0"}
            <span className="text-primary">9:00 - 22:00</span>
          </Button>
        </a>
      </div>

      <div className="flex items-center">
        <ThemeToggle initialTheme={initialTheme} />

        <LangSwitcher />
      </div>
    </header>
  );
}
