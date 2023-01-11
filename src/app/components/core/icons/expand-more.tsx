import { ComponentPropsWithRef } from 'react';

type ExpandMoreIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const ExpandMoreIcon = ({ size, color, ...props }: ExpandMoreIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16.59 8.58984L12 13.1698L7.41 8.58984L6 9.99984L12 15.9998L18 9.99984L16.59 8.58984Z" fill={color} />
  </svg>
);

export default ExpandMoreIcon;
