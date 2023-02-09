import { Menu } from '@headlessui/react';
import { Avatar } from '@mui/material';

import useI18n from '@hooks/use-i18n';
import useModal from '@src/app/hooks/use-modal';
import { selectUserData, settingsActions, useAppDispatch, useAppSelector, userActions } from '@store';
import { COLORS, PAGES } from '@types';

import { Icon, LogOutIcon, PersonIcon } from '../core/icons';
import LogOut from '../log-out';
import MenuItems from '../menu-items';
import PopupAbsolute from '../popup-absolute';
import languages from './i18n';

const { DARK } = COLORS;

const UserMenu = () => {
  const translate = useI18n(languages);

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
    <div>
      <PopupAbsolute
        button={<Avatar src={user?.photo || ''} sx={{ width: 35, height: 35 }} />}
        popupStyle="right-0 w-max"
      >
        <Menu>
          <MenuItems data={USER_MENU} />
        </Menu>
      </PopupAbsolute>

      <Popup>
        <LogOut onClose={close} onConfirm={signOut} />
      </Popup>
    </div>
  );
};

export default UserMenu;
