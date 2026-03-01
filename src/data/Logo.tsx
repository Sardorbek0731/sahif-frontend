import { SVGProps, memo } from "react";

export const Logo = memo(({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 150 150"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="sahif logo"
    focusable="false"
    className={className}
    {...props}
  >
    <g transform="rotate(-45 75 75)">
      <rect x="25" y="25" width="100" height="100" fill="#d4a373" />

      <path
        d="M38 38H112L97 53.25L112 68.5H80V45.625H70V68.5H38Z"
        fill="#121212"
      />

      <path d="M112 81.5H38L53 96.75L38 112H112Z" fill="#ffffff" />
    </g>
  </svg>
));

Logo.displayName = "Logo";
