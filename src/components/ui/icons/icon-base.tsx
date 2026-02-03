import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const IconBase = ({
  size = 24,
  strokeWidth = 2,
  children,
  className,
  ...props
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org"
    width={size}
    height={size}
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
