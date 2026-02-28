import React from "react";
import { IconBase, IconProps } from "../icon-base";

export const RussiaFlagIcon = React.memo(
  React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
    <IconBase ref={ref} stroke="none" {...props}>
      <defs>
        <clipPath id="ru-flag-circle">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>

      <g clipPath="url(#ru-flag-circle)">
        <rect width="24" height="8" fill="#FFFFFF" />
        <rect y="8" width="24" height="8" fill="#0039A6" />
        <rect y="16" width="24" height="8" fill="#D52B1E" />
      </g>
    </IconBase>
  )),
);

