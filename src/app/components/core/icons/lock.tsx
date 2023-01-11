import { ComponentPropsWithRef } from 'react';

type LockIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const LockIcon = ({ size, color, ...props }: LockIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M5.83359 8.88824V5.38236C5.83359 4.22008 6.33403 3.10541 7.22483 2.28356C8.11563 1.46171 9.32381 1 10.5836 1C11.8434 1 13.0515 1.46171 13.9423 2.28356C14.8331 3.10541 15.3336 4.22008 15.3336 5.38236V8.88824M3.11111 9.28757H17.8889C19.0548 9.28757 20 10.1596 20 11.2353V18.0523C20 19.128 19.0548 20 17.8889 20H3.11111C1.94518 20 1 19.128 1 18.0523V11.2353C1 10.1596 1.94518 9.28757 3.11111 9.28757Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LockIcon;
