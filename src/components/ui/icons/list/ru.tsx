import { IconBase, IconProps } from "../icon-base";

export const RuFlagIcon = (props: IconProps) => (
  <IconBase viewBox="0 0 24 24" {...props} strokeWidth={0}>
    <defs>
      <clipPath id="ruFlagClip">
        <circle cx="12" cy="12" r="12" />
      </clipPath>
    </defs>
    <g clipPath="url(#ruFlagClip)">
      <rect width="24" height="8" fill="#FFFFFF" />
      <rect width="24" height="8" fill="#0039A6" y="8" />
      <rect width="24" height="8" fill="#D52B1E" y="16" />
    </g>
  </IconBase>
);
