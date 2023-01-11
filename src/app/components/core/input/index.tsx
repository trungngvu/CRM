import { clsx } from 'clsx';
import { ComponentPropsWithRef, ElementType, forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { COLORS, POSITION, SIZE } from '@types';

import { Icon, VisibilityIcon, VisibilityOffIcon } from '../icons';

const { SECONDARY } = COLORS;

type InputProps = {
  size?: SIZE;
  labelOptions?: {
    text: string;
    className?: string;
  };
  iconOptions?: {
    icon: ElementType;
    position?: POSITION;
  };
  errorOptions?: {
    message: string | undefined;
    className?: string;
  };
  isRequired?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
} & Omit<ComponentPropsWithRef<'input'>, 'size'>;

enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      labelOptions = {},
      iconOptions = {},
      errorOptions = {},
      size = 'medium',
      isRequired = false,
      isLoading = false,
      disabled = false,
      ...props
    },
    ref
  ): JSX.Element => {
    const { text: labelText, className: labelClassName } = labelOptions;
    const { icon: InputIcon, position: iconPosition = 'left' } = iconOptions;
    const { message: errorMessage, className: errorClassName } = errorOptions;
    const { type = InputType.TEXT, name } = props;

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(value => !value);

    return (
      <div className="flex flex-col gap-y-[8px]">
        {labelText && (
          <label htmlFor={name} className={twMerge('flex select-none text-dark', labelClassName)}>
            {labelText}

            {isRequired && <span className="ml-1 text-error">*</span>}
          </label>
        )}

        <div className="relative w-full">
          {InputIcon && (
            <div
              className={clsx(
                {
                  'left-[12px]': iconPosition === 'left',
                  'right-[12px]': iconPosition === 'right',
                },
                'absolute top-0 bottom-0 grid my-auto place-items-center'
              )}
            >
              <Icon icon={InputIcon} size={20} color={SECONDARY} />
            </div>
          )}

          <input
            id={name}
            {...props}
            type={showPassword ? 'text' : type}
            className={twMerge(
              clsx(
                {
                  'h-[40px] text-base': size === 'large',
                  'h-[32px] text-base': size === 'medium',
                  'h-[24px] text-sm': size === 'small',

                  'pl-[40px]': !!InputIcon && iconPosition === 'left',
                  'pl-[12px]': !InputIcon,

                  'pr-[12px]': type !== InputType.PASSWORD && !showPassword,
                  'pr-[40px]': type === InputType.PASSWORD || showPassword || (!!InputIcon && iconPosition === 'right'),

                  'border-error focus:border-error': !!errorMessage,
                  'border-secondary focus:border-secondary-dark': !errorMessage,

                  'bg-secondary-extraLight': isLoading || disabled,
                  'bg-white': !isLoading && !disabled,
                },
                'rounded-[3px] text-dark flex items-center justify-center w-full max-w-full | placeholder:text-secondary | focus:ring-0'
              ),
              props.className
            )}
            disabled={isLoading || disabled}
            ref={ref}
          />

          {type === InputType.PASSWORD && (
            <div
              onClick={toggleShowPassword}
              className="absolute top-0 bottom-0 my-auto right-[12px] flex justify-center items-center cursor-pointer"
            >
              <Icon icon={showPassword ? VisibilityIcon : VisibilityOffIcon} size={20} color={SECONDARY} />
            </div>
          )}
        </div>

        {errorMessage && <div className={twMerge('text-sm text-error', errorClassName)}>{errorMessage}</div>}
      </div>
    );
  }
);

export default Input;
