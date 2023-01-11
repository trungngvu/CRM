import { clsx } from 'clsx';
import { ComponentPropsWithRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { SIZE } from '@types';

type CheckboxProps = {
  label?: {
    text: string;
    className?: string;
  };
  size?: SIZE;
} & Omit<ComponentPropsWithRef<'input'>, 'size'>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label = {}, size = 'medium', ...props }, ref): JSX.Element => {
    const { name } = props;

    return (
      <label
        htmlFor={name}
        className={clsx(
          {
            'w-[28px] h-[28px] text-base': size === 'large',
            'w-[24px] h-[24px] text-base': size === 'medium',
            'w-[20px] h-[20px] text-sm': size === 'small',
          },
          'whitespace-nowrap flex gap-x-[7px] items-center cursor-pointer p-[3px]'
        )}
      >
        <input
          id={name}
          type="checkbox"
          {...props}
          className={twMerge(
            'h-full w-full rounded-[5px] border-secondary cursor-pointer | focus:outline-none focus:ring-offset-0 focus:border-secondary-extraDark focus:ring-0 text-primary',
            props.className
          )}
          ref={ref}
        />

        {label.text && <span className={twMerge('select-none', label.className)}>{label.text}</span>}
      </label>
    );
  }
);

export default Checkbox;
