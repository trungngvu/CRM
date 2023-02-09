import { clsx } from 'clsx';
import { ComponentPropsWithRef, ElementType, forwardRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { COLOR, COLORS, POSITION, SHAPE, SIZE } from '@types';

import { Icon, LoadingIcon } from '../icons';

const { LIGHT, DARK, SECONDARY_EXTRA_DARK } = COLORS;

type ButtonProps = {
  size?: SIZE;
  color?: COLOR;
  shape?: SHAPE;
  iconOptions?: {
    icon: ElementType;
    position?: POSITION;
    size?: number;
    color?: string;
    hoverColor?: string;
  };
  isLoading?: boolean;
  disabled?: boolean;
} & ComponentPropsWithRef<'button'>;

const setIconColor = (color: COLOR, disabled: boolean) => {
  if (disabled) {
    return SECONDARY_EXTRA_DARK;
  }

  if (color === 'secondary') {
    return DARK;
  }

  if (color === 'action') {
    return DARK;
  }

  return LIGHT;
};

const setIconHoverColor = (color: COLOR) => {
  if (color === 'secondary') {
    return DARK;
  }

  return LIGHT;
};

const setLoadingIconSize = (size: SIZE) => {
  if (size === 'medium') {
    return 14;
  }

  if (size === 'small') {
    return 14;
  }

  return 16;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'medium',
      color = 'primary',
      shape = 'default',
      iconOptions = {},
      isLoading = false,
      disabled = false,
      children,
      ...props
    },
    ref
  ): JSX.Element => {
    const {
      icon: ButtonIcon,
      position: iconPosition = 'left',
      size: iconSize = 16,
      color: iconColor = setIconColor(color, disabled),
      hoverColor: iconHoverColor = setIconHoverColor(color),
    } = iconOptions;
    const [iconComponentColor, setIconComponentColor] = useState(iconColor);

    const onMouseEnter = () => setIconComponentColor(iconHoverColor);
    const onMouseLeave = () => setIconComponentColor(iconColor);

    /**
     * Change icon color when disable status change
     */
    useEffect(() => {
      if (!disabled) {
        setIconComponentColor(iconColor);
      } else {
        setIconComponentColor(SECONDARY_EXTRA_DARK);
      }
    }, [disabled]);

    return (
      <button
        type="button"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
        className={twMerge(
          clsx(
            {
              'h-[40px] px-[18px] text-base': size === 'large',
              'h-[32px] px-[18px] text-base': size === 'medium',
              'h-[24px] px-[16px] text-sm': size === 'small',

              'bg-primary hover:bg-primary-dark text-light': color === 'primary',
              'bg-secondary-extraLight hover:bg-secondary-light text-dark hover:text-dark': color === 'secondary',
              'bg-secondary-light hover:bg-primary text-dark hover:text-light': color === 'action',
              'bg-dark hover:bg-dark text-light': color === 'active',
              'bg-transparent hover:bg-dark text-dark hover:text-light': color === 'inactive',
              'bg-secondary-light hover:bg-secondary-light text-secondary-extraDark hover:text-secondary-extraDark':
                disabled,

              'rounded-[3px]': shape === 'default',
              'rounded-[20px]': shape === 'round',
            },
            'whitespace-nowrap select-none flex justify-center items-center'
          ),
          props.className
        )}
        disabled={isLoading || disabled}
        ref={ref}
      >
        {isLoading && <Icon icon={LoadingIcon} size={setLoadingIconSize(size)} />}

        {!isLoading && (
          <div className="flex items-center gap-x-2">
            {ButtonIcon && iconPosition === 'left' && (
              <Icon icon={ButtonIcon} size={iconSize} color={iconComponentColor} />
            )}

            <span>{children}</span>

            {ButtonIcon && iconPosition === 'right' && (
              <Icon icon={ButtonIcon} size={iconSize} color={iconComponentColor} />
            )}
          </div>
        )}
      </button>
    );
  }
);

export default Button;
