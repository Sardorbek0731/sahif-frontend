import { FlagBase } from "../flag-base";
import { IconProps } from "../icon-base";

export const UzFlagIcon = ({ className, ...props }: IconProps) => (
  <FlagBase
    className={`rounded-full overflow-hidden ${className || ""}`}
    {...props}
  >
    <rect width="24" height="7.5" fill="#0099B5" />
    <rect width="24" height="8" fill="#FFFFFF" y="8" />
    <rect width="24" height="9" fill="#1EB53A" y="15.5" />

    <rect width="24" height="0.5" fill="#CE1126" y="7.5" />
    <rect width="24" height="0.5" fill="#CE1126" y="15.5" />

    <g transform="translate(1.5, 0)">
      <path
        d="M8.5 4.5 a2.5 2.5 0 1 1 0 -4.2 a3 3 0 1 0 0 4.2 z"
        fill="white"
        transform="translate(-2.5, 2)"
      />
      <g fill="white" stroke="none">
        <circle cx="11.5" cy="3.2" r="0.45" />
        <circle cx="13.5" cy="3.2" r="0.45" />
        <circle cx="15.5" cy="3.2" r="0.45" />
        <circle cx="9.5" cy="4.8" r="0.45" />
        <circle cx="11.5" cy="4.8" r="0.45" />
        <circle cx="13.5" cy="4.8" r="0.45" />
        <circle cx="15.5" cy="4.8" r="0.45" />
        <circle cx="7.5" cy="6.4" r="0.45" />
        <circle cx="9.5" cy="6.4" r="0.45" />
        <circle cx="11.5" cy="6.4" r="0.45" />
        <circle cx="13.5" cy="6.4" r="0.45" />
        <circle cx="15.5" cy="6.4" r="0.45" />
      </g>
    </g>
  </FlagBase>
);
