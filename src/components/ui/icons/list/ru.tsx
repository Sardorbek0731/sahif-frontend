import { FlagBase } from "../flag-base";
import { IconProps } from "../icon-base";

export const RuFlagIcon = ({ className, ...props }: IconProps) => (
  <FlagBase
    className={`rounded-full overflow-hidden ${className || ""}`}
    {...props}
  >
    <rect width="24" height="8" fill="#FFFFFF" />
    <rect width="24" height="8" fill="#0039A6" y="8" />
    <rect width="24" height="8" fill="#D52B1E" y="16" />
  </FlagBase>
);
