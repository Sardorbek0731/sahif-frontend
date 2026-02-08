import React, { forwardRef, memo } from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const IconBase = memo(
  forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, strokeWidth = 2, children, className, ...props }, ref) => {
      return (
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
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
    },
  ),
);

IconBase.displayName = "IconBase";
