import { DefaultTFuncReturn } from 'i18next';
import { twMerge } from 'tailwind-merge';

type UserDetailInfoProps = {
  title: string;
  description: string | number | DefaultTFuncReturn;
  className?: string;
};

const UserDetailInfo = ({ title, description, className }: UserDetailInfoProps): JSX.Element => {
  return (
    <div className={twMerge('flex items-center', className)}>
      <span className="min-w-[135px] inline-block">{title}:</span>
      <span className="ml-[18px] border-b border-secondary-light inline-block w-full p-2 min-h-[41px]">
        {description}
      </span>
    </div>
  );
};

export default UserDetailInfo;
