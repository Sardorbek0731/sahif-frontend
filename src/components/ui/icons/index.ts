export * from "./icon-base";
export * from "./icon";
import { MapPinIcon } from "./list/map-pin";
import { SearchIcon } from "./list/search";
import { SunIcon } from "./list/sun";
import { MoonIcon } from "./list/moon";
import { ChevronDownIcon } from "./list/chevron-down";
import { LogInIcon } from "./list/log-in";
import { HomeIcon } from "./list/home";
import { XIcon } from "./list/x";
import { CartIcon } from "./list/cart";
import { WishlistIcon } from "./list/wishlist";
import { CategoriesIcon } from "./list/categories";
import { UzFlagIcon } from "./list/uz";
import { EnFlagIcon } from "./list/en";
import { RuFlagIcon } from "./list/ru";
import { CallCenterIcon } from "./list/call-center";
import { FlameIcon } from "./list/flame";
import { ClockIcon } from "./list/clock";

export const ICON_LIST = {
  location: MapPinIcon,
  search: SearchIcon,
  sun: SunIcon,
  moon: MoonIcon,
  chevronDown: ChevronDownIcon,
  login: LogInIcon,
  home: HomeIcon,
  x: XIcon,
  cart: CartIcon,
  wishlist: WishlistIcon,
  categories: CategoriesIcon,
  uz: UzFlagIcon,
  en: EnFlagIcon,
  ru: RuFlagIcon,
  callCenter: CallCenterIcon,
  flame: FlameIcon,
  clock: ClockIcon,
} as const;

export type IconName = keyof typeof ICON_LIST;
