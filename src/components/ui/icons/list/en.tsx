import React from "react";
import { IconBase, IconProps } from "../icon-base";

export const UKFlagIcon = React.memo(
  React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
    <IconBase ref={ref} stroke="none" {...props}>
      <defs>
        <clipPath id="uk-flag-circle">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>

      <g clipPath="url(#uk-flag-circle)">
        <rect width="24" height="24" fill="#00247D" />
        <path d="M0 0 L24 24 M24 0 L0 24" stroke="#FFFFFF" strokeWidth="3" />
        <path d="M0 0 L24 24 M24 0 L0 24" stroke="#CF142B" strokeWidth="1.2" />
        <path d="M12 0 v24 M0 12 h24" stroke="#FFFFFF" strokeWidth="5.5" />
        <path d="M12 0 v24 M0 12 h24" stroke="#CF142B" strokeWidth="3.5" />
      </g>
    </IconBase>
  )),
);
