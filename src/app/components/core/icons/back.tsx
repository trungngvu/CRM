import { ComponentPropsWithRef } from 'react';

type BackIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const BackIcon = ({ size, color, ...props }: BackIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M17.5098 3.8701L15.7298 2.1001L5.83984 12.0001L15.7398 21.9001L17.5098 20.1301L9.37984 12.0001L17.5098 3.8701Z"
      fill={color}
    />
  </svg>
);

export default BackIcon;
