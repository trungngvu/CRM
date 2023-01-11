import { ComponentPropsWithRef } from 'react';

type EmailIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const EmailIcon = ({ size, color, ...props }: EmailIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M19 4.125L10 10.6875L1 4.125M2.8 1H17.2C18.19 1 19 1.84375 19 2.875V14.125C19 15.1562 18.19 16 17.2 16H2.8C1.81 16 1 15.1562 1 14.125V2.875C1 1.84375 1.81 1 2.8 1Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EmailIcon;
