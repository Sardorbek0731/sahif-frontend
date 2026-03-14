import Location from "@/components/location/Location";
import LangSwitcher from "@/components/lang/Lang";
import ThemeToggle from "@/components/theme/Theme";
import { Button } from "@/components/ui/button";
import { PHONE_NUMBER, PHONE_DISPLAY, WORKING_HOURS } from "@/constants";

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

        <Button
          as="a"
          href={`tel:${PHONE_NUMBER}`}
          leftIcon="callCenter"
          className="bg-card hover:bg-card-hover h-10 px-4"
        >
          {PHONE_DISPLAY} |{"\u00A0"}
          <span className="text-primary">{WORKING_HOURS}</span>
        </Button>
      </div>

      <div className="flex items-center">
        <ThemeToggle initialTheme={initialTheme} />

        <LangSwitcher />
      </div>
    </header>
  );
}
