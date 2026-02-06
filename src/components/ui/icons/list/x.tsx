import { IconBase, IconProps } from "../icon-base";

export const XIcon = (props: IconProps) => (
  <IconBase {...props} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6 L18 18" />
    <path d="M6 18 L18 6" />
  </IconBase>
);
