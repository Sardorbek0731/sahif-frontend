import { ReactNode } from "react";
import { Icon, IconName } from "./icons";

type ButtonProps<T extends React.ElementType = "button"> = {
  as?: T;
  leftIcon?: IconName;
  rightIcon?: IconName;
  iconSize?: number;
  iconStyle?: string;
  children?: ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export const Button = <T extends React.ElementType = "button">({
  as,
  leftIcon,
  rightIcon,
  iconSize = 16,
  iconStyle = "",
  children,
  className = "",
  ...props
}: ButtonProps<T>) => {
  const Component = as ?? "button";
  return (
    <Component
      className={`flex items-center rounded-lg transition-all cursor-pointer ${className}`}
      {...props}
    >
      {leftIcon && (
        <Icon
          name={leftIcon}
          size={iconSize}
          className={`${iconStyle} ${children ? "mr-2" : ""}`}
        />
      )}
      {children}
      {rightIcon && (
        <Icon
          name={rightIcon}
          size={iconSize}
          className={`${iconStyle} ${children ? "ml-2" : ""}`}
        />
      )}
    </Component>
  );
};
