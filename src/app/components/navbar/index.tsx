import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { DashboardIcon, Icon } from '@components/core/icons';
import { MENU, MENUS, SETTINGS_CONFIG } from '@configs';
import { selectCurrentProject, selectDisplaySetting, selectUserRoles, useAppSelector } from '@store';
import { ALL_ROLE_EXCEPT_GUEST, MENUS_NAME, PAGES } from '@types';
import { checkPermission } from '@utils';

import Logo from './logo';
import Menus from './menus';

const { NAVBAR_SIZE, EXPAND_NAVBAR_SIZE } = SETTINGS_CONFIG;

const Navbar = (): JSX.Element => {
  const [displayMenus, setDisplayMenus] = useState<MENU[]>([]);

  const { expandNavbar } = useAppSelector(selectDisplaySetting);
  const currentProject = useAppSelector(selectCurrentProject);
  const userRoles = useAppSelector(selectUserRoles) || [];

  /**
   * Display task menu when curren project exist
   */
  useEffect(() => {
    const permissionMenus = MENUS.filter(menu => checkPermission({ auth: menu.roles, roles: userRoles }));
    const [firstMenu, ...otherMenus] = permissionMenus;

    let menus = permissionMenus;

    if (currentProject) {
      menus = [
        firstMenu,
        {
          name: MENUS_NAME.TASK,
          icon: <Icon icon={DashboardIcon} size={20} />,
          path: PAGES.TASK,
          roles: [...ALL_ROLE_EXCEPT_GUEST],
          subs: [
            {
              name: MENUS_NAME.TASK_LIST,
              path: `${PAGES.TASK_LIST}?projectId=${currentProject}`,
              roles: [...ALL_ROLE_EXCEPT_GUEST],
            },
            {
              name: MENUS_NAME.ADD_TASK,
              path: `${PAGES.ADD_TASK}?projectId=${currentProject}`,
              roles: [...ALL_ROLE_EXCEPT_GUEST],
            },
          ],
        },
        ...otherMenus,
      ];
    }

    setDisplayMenus(menus);
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
