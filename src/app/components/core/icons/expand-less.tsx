import { ComponentPropsWithRef } from 'react';

type ExpandLessIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const ExpandLessIcon = ({ size, color, ...props }: ExpandLessIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z" fill={color} />
  </svg>
);

export default ExpandLessIcon;
