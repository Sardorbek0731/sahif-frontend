import { IconProps } from "./icon-base";
import { getIconSize } from "./icon-sizes";

export const FlagBase = ({
  size = "md",
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
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
};
