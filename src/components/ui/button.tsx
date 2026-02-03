import { ReactNode } from "react";
import { Icon, IconName } from "./icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "card" | "primary" | "ghost";
  leftIcon?: IconName;
  rightIcon?: IconName;
  iconSize?: number;
  children?: ReactNode;
}

export const Button = ({
  variant = "card",
  leftIcon,
  rightIcon,
  iconSize = 16,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const variants = {
    card: "bg-card hover:bg-[#ebebed] dark:hover:bg-[#282828] text-foreground",
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    ghost: "bg-transparent hover:bg-secondary",
  };

  return (
    <button
      className={`
        flex items-center justify-center h-10 px-4 rounded-lg 
        transition-all active:scale-95 cursor-pointer border-none outline-none
        ${variants[variant]} 
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
