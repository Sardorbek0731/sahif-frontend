import React from "react";
import { getIconSize, IconSize } from "./icon-sizes";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: IconSize | number;
  strokeWidth?: number | string;
}

export const IconBase = ({
  size = "md",
  strokeWidth = 2,
  children,
  className,
  ...props
}: IconProps) => {
  const iconSize = typeof size === "number" ? size : getIconSize(size);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
};
