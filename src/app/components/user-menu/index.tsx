import { Menu, Transition } from '@headlessui/react';
import { Avatar } from '@mui/material';
import { Fragment } from 'react';

import useI18n from '@hooks/use-i18n';
import useModal from '@src/app/hooks/use-modal';
import { selectUserData, settingsActions, useAppDispatch, useAppSelector, userActions } from '@store';
import { COLORS, LANGUAGES, PAGES } from '@types';

import { Icon, LogOutIcon, PersonIcon } from '../core/icons';
import LogOut from '../log-out';
import MenuItems from '../menu-items';
import { en, vi } from './i18n';

const { DARK } = COLORS;

const UserMenu = () => {
  const translate = useI18n({
    name: UserMenu.name,
    data: [
      {
        key: LANGUAGES.EN,
        value: en,
      },
      {
        key: LANGUAGES.VI,
        value: vi,
      },
    ],
  });

  const { open, close, Popup } = useModal();

  const user = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(userActions.signOut());
    dispatch(settingsActions.resetSettings());
  };

  const USER_MENU = [
    {
      id: 'profile',
      icon: <Icon icon={PersonIcon} color={DARK} size={20} />,
      text: translate('PROFILE'),
      to: PAGES.PROFILE,
    },
    {
      id: 'log-out',
      icon: <Icon icon={LogOutIcon} color={DARK} size={20} />,
      text: translate('LOG_OUT'),
      onClick: open,
    },
  ];

  return (
    <Menu as="nav">
      <Menu.Button>
        <Avatar
          src={user?.photo || ''}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute right-[10px] mt-1 origin-top-right rounded-md bg-white shadow-3 overflow-hidden">
          <MenuItems data={USER_MENU} />
        </div>
      </Transition>

      <Popup>
        <LogOut onClose={close} onConfirm={signOut} />
      </Popup>
    </Menu>
  );
};

export default UserMenu;
