import { Popover, Transition } from '@headlessui/react';
import { ComponentPropsWithRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type PopupAbsoluteProps = {
  children: ReactNode;
  button: JSX.Element;
  popupStyle?: string;
  beforeButton?: JSX.Element;
  afterButton?: JSX.Element;
} & ComponentPropsWithRef<'div'>;

const PopupAbsolute = ({ children, button, beforeButton, afterButton, popupStyle }: PopupAbsoluteProps) => {
  return (
    <Popover className="relative">
      <div className="flex items-center gap-3">
        {beforeButton}
        <Popover.Button>{button}</Popover.Button>
        {afterButton}
      </div>
      <Transition
        className={twMerge(popupStyle, 'absolute mt-2 overflow-auto rounded-md bg-white shadow-3')}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel>{children}</Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default PopupAbsolute;
