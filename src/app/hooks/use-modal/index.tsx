import { ReactNode, useState } from 'react';

import Popup from '../../components/core/popup';

type PopupProps = {
  children: ReactNode;
};

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    Popup: ({ children }: PopupProps) => (
      <Popup isOpen={isOpen} onClose={close}>
        {children}
      </Popup>
    ),
  };
};

export default useModal;
