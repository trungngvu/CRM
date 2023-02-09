import { motion } from 'framer-motion';
import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { DashboardIcon, Icon } from '@components/core/icons';
import { MENU, MENUS, SETTINGS_CONFIG } from '@configs';
import {
  selectCurrentProject,
  selectDisplaySetting,
  selectUserPermissions,
  selectUserRoles,
  useAppSelector,
} from '@store';
import { ALL_ROLE_EXCEPT_GUEST, PAGES, PAGES_NAME, ROLE } from '@types';
import checkPermission from '@utils/check-permission';

import Logo from './logo';
import Menus from './menus';

const { NAVBAR_SIZE, EXPAND_NAVBAR_SIZE } = SETTINGS_CONFIG;

const Navbar = (): JSX.Element => {
  const [displayMenus, setDisplayMenus] = useState<MENU[]>([]);

  const { expandNavbar } = useAppSelector(selectDisplaySetting);
  const currentProject = useAppSelector(selectCurrentProject);
  const userRoles = useAppSelector(selectUserRoles);
  const userPermissions = useAppSelector(selectUserPermissions);

  /**
   * Display task menu when curren project exist and filter menus by permission
   */
  useDeepCompareEffect(() => {
    const taskMenu = {
      name: PAGES_NAME.TASK,
      icon: <Icon icon={DashboardIcon} size={20} />,
      path: PAGES.TASK,
      auth: [...ALL_ROLE_EXCEPT_GUEST],
      subs: [
        {
          name: PAGES_NAME.TASK_LIST,
          path: `${PAGES.TASK_LIST}?projectId=${currentProject}`,
          auth: [...ALL_ROLE_EXCEPT_GUEST],
        },
        {
          name: PAGES_NAME.ADD_TASK,
          path: `${PAGES.ADD_TASK}?projectId=${currentProject}`,
          auth: [...ALL_ROLE_EXCEPT_GUEST],
        },
      ],
    };

    /**
     * Add task menu into menus
     */
    const menus = [...MENUS];

    if (currentProject) {
      menus.splice(1, 0, taskMenu);
    }

    /**
     * Filter menu display by permission
     */
    const permissionMenus = userRoles.includes(ROLE.ADMIN)
      ? menus
      : menus
          .filter(menu => {
            if (!menu.subs || menu.subs.length === 0) {
              return checkPermission({
                auth: menu.auth,
                roles: userRoles,
                permissions: userPermissions,
                name: menu.name,
              });
            }

            return menu.subs.some(item =>
              checkPermission({ auth: menu.auth, roles: userRoles, permissions: userPermissions, name: item.name })
            );
          })
          .map(menu => {
            if (!menu.subs || menu.subs.length === 0) {
              return menu;
            }

            return { ...menu, subs: menu.subs.filter(sub => userPermissions.includes(sub.name)) };
          });

    setDisplayMenus(permissionMenus);
  }, [userRoles, currentProject]);

  return (
    <motion.div
      style={{
        width: expandNavbar ? EXPAND_NAVBAR_SIZE : NAVBAR_SIZE,
        minWidth: expandNavbar ? EXPAND_NAVBAR_SIZE : NAVBAR_SIZE,
        maxWidth: expandNavbar ? EXPAND_NAVBAR_SIZE : NAVBAR_SIZE,
      }}
      className="fixed top-0 z-20 flex flex-col h-screen bg-primary"
    >
      <Logo />

      <Menus data={displayMenus} />
    </motion.div>
  );
};

export default Navbar;
