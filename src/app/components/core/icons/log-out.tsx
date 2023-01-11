import { ComponentPropsWithRef } from 'react';

type SignOutIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const SignOutIcon = ({ size, color, ...props }: SignOutIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.9998 1H6.99977C5.89977 1 5.00977 1.9 5.00977 3V21C5.00977 22.1 5.89977 23 6.99977 23H16.9998C18.0998 23 18.9998 22.1 18.9998 21V3C18.9998 1.9 18.0998 1 16.9998 1ZM16.9998 19H6.99977V5H16.9998V19ZM12.7998 14.99V13.24C10.5798 13.24 9.10977 13.92 7.99977 15.42C8.44977 13.28 9.68977 11.15 12.7998 10.72V9.02L15.9998 12L12.7998 14.99Z"
      fill={color}
    />
  </svg>
);

export default SignOutIcon;
