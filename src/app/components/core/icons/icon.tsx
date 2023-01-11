import { ComponentPropsWithRef, ElementType, useEffect, useState } from 'react';

import history from '@history';
import { COLORS } from '@types';

const { LIGHT } = COLORS;

type IconProps = {
  icon: ElementType;
  size?: number;
  color?: string;
  hoverColor?: string;
  to?: string;
  onClick?: () => void;
} & ComponentPropsWithRef<'svg'>;

const Icon = ({
  icon: IconComponent,
  size = 16,
  color = LIGHT,
  hoverColor = color,
  to,
  onClick,
  ...props
}: IconProps) => {
  const [iconColor, setIconColor] = useState<string | undefined>(color);

  const onMouseEnter = () => setIconColor(hoverColor);
  const onMouseLeave = () => setIconColor(color);

  const handleClick = () => {
    if (to) {
      history.push(to);
    }

    if (onClick) {
      onClick();
    }
  };

  useEffect(() => {
    setIconColor(color);
  }, [color]);

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={handleClick} className="cursor-pointer">
      <IconComponent size={size} color={iconColor} {...props} />
    </div>
  );
};

export default Icon;
