import { Dialog, Transition } from '@headlessui/react';
import { ComponentPropsWithRef, Fragment, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
} & ComponentPropsWithRef<'div'>;

const Popup = ({ isOpen, onClose, children, ...props }: PopupProps) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative h-content z-[100]" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-opacity-25 bg-dark" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={twMerge(
                'w-full min-w-[350px] max-w-fit transform overflow-hidden rounded-[5px] bg-white text-left align-middle shadow-xl transition-all',
                props.className
              )}
            >
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);

export default Popup;
