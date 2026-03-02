import { FlagBase } from "../flag-base";
import { IconProps } from "../icon-base";

export const EnFlagIcon = ({ className, ...props }: IconProps) => (
  <FlagBase
    className={`rounded-full overflow-hidden ${className || ""}`}
    {...props}
  >
    <rect width="24" height="24" fill="#012169" />
    <path d="M0 0l24 24M24 0L0 24" stroke="#fff" strokeWidth="2.8" />
    <path d="M0 0l24 24M24 0L0 24" stroke="#C8102E" strokeWidth="1.2" />
    <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="4.8" />
    <path d="M12 0v24M0 12h24" stroke="#C8102E" strokeWidth="2.8" />
  </FlagBase>
);
