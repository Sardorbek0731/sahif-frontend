import React from "react";
import { IconBase, IconProps } from "../icon-base";

export const UzbekistanFlagIcon = React.memo(
  React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
    <IconBase ref={ref} stroke="none" {...props}>
      <defs>
        <clipPath id="uzb-circle">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>

      <g clipPath="url(#uzb-circle)">
        <rect width="24" height="8" fill="#0099B5" />
        <rect y="7.5" width="24" height="0.5" fill="#CE1126" />
        <rect y="8" width="24" height="8" fill="#FFFFFF" />
        <rect y="15.5" width="24" height="0.5" fill="#CE1126" />
        <rect y="16" width="24" height="8" fill="#1EB53A" />

        <g fill="#FFFFFF" transform="translate(1, 1)">
          <path d="M4.5 1.5C3.12 1.5 2 2.62 2 4C2 5.38 3.12 6.5 4.5 6.5C4.91 6.5 5.25 6.42 5.58 6.25C5 6.67 4.25 6.92 3.42 6.92C1.83 6.92 0.58 5.58 0.58 4C0.58 2.42 1.83 1.08 3.42 1.08C4.25 1.08 5 1.33 5.58 1.75C5.25 1.58 4.91 1.5 4.5 1.5Z" />

          <g transform="translate(6, 1)">
            <circle cx="4" cy="1" r="0.4" />
            <circle cx="6" cy="1" r="0.4" />
            <circle cx="8" cy="1" r="0.4" />

            <circle cx="2" cy="2.8" r="0.4" />
            <circle cx="4" cy="2.8" r="0.4" />
            <circle cx="6" cy="2.8" r="0.4" />
            <circle cx="8" cy="2.8" r="0.4" />

            <circle cx="0" cy="4.6" r="0.4" />
            <circle cx="2" cy="4.6" r="0.4" />
            <circle cx="4" cy="4.6" r="0.4" />
            <circle cx="6" cy="4.6" r="0.4" />
            <circle cx="8" cy="4.6" r="0.4" />
          </g>
        </g>
      </g>
    </IconBase>
  )),
);
