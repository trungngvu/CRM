import { ComponentPropsWithRef } from 'react';

type EditIconProps = {
  size: number;
  color: string;
} & ComponentPropsWithRef<'svg'>;

const EditIcon = ({ size, color, ...props }: EditIconProps): JSX.Element => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.3471 4.65244C20.7208 4.29244 20.7208 3.7109 20.3471 3.3509L18.1046 1.1909C17.7308 0.830898 17.1271 0.830898 16.7533 1.1909L14.875 3.00013L18.4688 6.46167L20.3471 4.65244ZM17.5104 7.38474L13.9167 3.92321L4.33333 13.154V16.6155H7.92708L17.5104 7.38474ZM23.5 19.3847H0.5V23.0771H23.5V19.3847Z"
      fill={color}
    />
  </svg>
);

export default EditIcon;
