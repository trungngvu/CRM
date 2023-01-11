import { ComponentPropsWithRef } from 'react';

type ReaderIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const ReaderIcon = ({ size, color, ...props }: ReaderIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 4H3C1.9 4 1 4.9 1 6V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V6C23 4.9 22.1 4 21 4ZM21 19H12V6H21V19ZM20 9.5H13V11H20V9.5ZM13 12H20V13.5H13V12ZM20 14.5H13V16H20V14.5Z"
      fill={color}
    />
  </svg>
);

export default ReaderIcon;
