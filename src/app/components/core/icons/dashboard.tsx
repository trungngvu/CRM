import { ComponentPropsWithRef } from 'react';

type DashboardIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const DashboardIcon = ({ size, color, ...props }: DashboardIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 13H3V3H11V13ZM11 21H3V15H11V21ZM13 21H21V11H13V21ZM13 9V3H21V9H13Z"
      fill={color}
    />
  </svg>
);

export default DashboardIcon;
