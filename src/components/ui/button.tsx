import { ReactNode } from "react";
import { Icon, IconName } from "./icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: IconName;
  rightIcon?: IconName;
  iconSize?: number;
  children?: ReactNode;
}

export const Button = ({
  leftIcon,
  rightIcon,
  iconSize = 16,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        flex items-center justify-center rounded-lg transition-all cursor-pointer
        ${className}
      `}
      {...props}
    >
      {leftIcon && (
        <Icon
          name={leftIcon}
          size={iconSize}
          className={children ? "mr-2" : ""}
        />
      )}

      {children}

      {rightIcon && (
        <Icon
          name={rightIcon}
          size={iconSize}
          className={children ? "ml-2" : ""}
        />
      )}
    </button>
  );
};
