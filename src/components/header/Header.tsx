import LangSwitcher from "../lang/Lang";
import Location from "@/components/location/Location";
import ThemeToggle from "../theme/Theme";

export default function Header() {
  return (
    <header className="my-container row-between py-4">
      <Location />

      <div className="flex items-center">
        <ThemeToggle />

        <LangSwitcher />
      </div>
    </header>
  );
}
