export * from "./icon-base";
export * from "./icon";
import { MapPinIcon } from "./list/map-pin";
import { SearchIcon } from "./list/search";
import { SunIcon } from "./list/sun";
import { MoonIcon } from "./list/moon";
import { ChevronDownIcon } from "./list/chevron-down";
import { LogInIcon } from "./list/log-in";
import { HomeIcon } from "./list/home";

export const ICON_LIST = {
  location: MapPinIcon,
  search: SearchIcon,
  sun: SunIcon,
  moon: MoonIcon,
  chevronDown: ChevronDownIcon,
  login: LogInIcon,
  home: HomeIcon,
} as const;

export type IconName = keyof typeof ICON_LIST;
