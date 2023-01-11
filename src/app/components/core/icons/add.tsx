import { ComponentPropsWithRef } from 'react';

type AddIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const AddIcon = ({ size, color, ...props }: AddIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill={color} />
  </svg>
);

export default AddIcon;
