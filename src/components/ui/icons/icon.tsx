import { ICON_LIST, IconName, IconProps } from "./index";

interface UniversalIconProps extends IconProps {
  name: IconName;
}

export const Icon = ({ name, ...props }: UniversalIconProps) => {
  const SelectedIcon = ICON_LIST[name];

  if (!SelectedIcon) return null;

  return <SelectedIcon {...props} />;
};
