import { ComponentPropsWithRef } from 'react';

type MenuIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const MenuIcon = ({ size, color, ...props }: MenuIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M3 8V6H21V8H3ZM3 13H21V11H3V13ZM3 18H21V16H3V18Z" fill={color} />
  </svg>
);

export default MenuIcon;
