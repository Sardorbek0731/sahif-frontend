import { IconProps } from "./icon-base";

export const FlagBase = ({
  size = 24,
  children,
  className,
  ...props
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
};
