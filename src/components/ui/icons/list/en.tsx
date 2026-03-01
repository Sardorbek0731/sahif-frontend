import { IconBase, IconProps } from "../icon-base";

export const EnFlagIcon = (props: IconProps) => (
  <IconBase viewBox="0 0 24 24" {...props} strokeWidth={0}>
    <defs>
      <clipPath id="enFlagClip">
        <circle cx="12" cy="12" r="12" />
      </clipPath>
    </defs>
    <g clipPath="url(#enFlagClip)">
      <rect width="24" height="24" fill="#012169" />
      <path d="M0 0l24 24M24 0L0 24" stroke="#fff" strokeWidth="2.8" />
      <path d="M0 0l24 24M24 0L0 24" stroke="#C8102E" strokeWidth="1.2" />
      <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="4.8" />
      <path d="M12 0v24M0 12h24" stroke="#C8102E" strokeWidth="2.8" />
    </g>
  </IconBase>
);
