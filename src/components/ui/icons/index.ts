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
import { ArrowRightIcon } from "./list/arrow-right";
import { CategoriesIcon } from "./list/categories";
import { UzbekistanFlagIcon } from "./list/uz";
import { UKFlagIcon } from "./list/en";
import { RussiaFlagIcon } from "./list/ru";

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
  arrowRight: ArrowRightIcon,
  categories: CategoriesIcon,
  uz: UzbekistanFlagIcon,
  en: UKFlagIcon,
  ru: RussiaFlagIcon,
} as const;

export type IconName = keyof typeof ICON_LIST;
