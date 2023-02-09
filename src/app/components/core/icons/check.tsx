import { ComponentPropsWithRef } from 'react';

type CheckIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const CheckIcon = ({ size, color, ...props }: CheckIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8.36363 16.8657L3.59091 12.1642L2 13.7313L8.36363 20L22 6.56716L20.4091 5L8.36363 16.8657Z"
      fill={color}
    />
  </svg>
);

export default CheckIcon;
