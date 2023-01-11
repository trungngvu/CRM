import { Icon, PeopleIcon, ReaderIcon, SettingIcon } from '@components/core/icons';
import { ALL_ROLE_EXCEPT_GUEST, MENUS_NAME, PAGES, ROLE } from '@types';

export type MENU = {
  name: MENUS_NAME;
  icon: JSX.Element;
  path: string;
  roles: ROLE[];
  subs?: {
    name: MENUS_NAME;
    path: string;
    roles: ROLE[];
  }[];
};

export const MENUS: MENU[] = [
  {
    name: MENUS_NAME.PROJECT,
    icon: <Icon icon={ReaderIcon} size={20} />,
    path: PAGES.PROJECT,
    roles: [...ALL_ROLE_EXCEPT_GUEST],
    subs: [
      {
        name: MENUS_NAME.PROJECT_LIST,
        path: PAGES.PROJECT_LIST,
        roles: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: MENUS_NAME.ADD_PROJECT,
        path: PAGES.ADD_PROJECT,
        roles: [...ALL_ROLE_EXCEPT_GUEST],
      },
    ],
  },
  {
    name: MENUS_NAME.PERSONNEL_MANAGEMENT,
    icon: <Icon icon={PeopleIcon} size={20} />,
    path: PAGES.PERSONNEL_MANAGEMENT,
    roles: [...ALL_ROLE_EXCEPT_GUEST],
    subs: [
      {
        name: MENUS_NAME.CANDIDATE_LIST,
        path: PAGES.CANDIDATE_LIST,
        roles: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: MENUS_NAME.ADD_CANDIDATE,
        path: PAGES.ADD_CANDIDATE,
        roles: [...ALL_ROLE_EXCEPT_GUEST],
      },
    ],
  },
  {
    name: MENUS_NAME.SYSTEM_MANAGEMENT,
    icon: <Icon icon={SettingIcon} size={20} />,
    path: PAGES.SYSTEM_MANAGEMENT,
    roles: [...ALL_ROLE_EXCEPT_GUEST],
    subs: [
      {
        name: MENUS_NAME.USER_GROUP_LIST,
        path: PAGES.USER_GROUP_LIST,
        roles: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: MENUS_NAME.ADD_USER_GROUP,
        path: PAGES.ADD_USER_GROUP,
        roles: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: MENUS_NAME.ADD_USER,
        path: PAGES.ADD_USER,
        roles: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: MENUS_NAME.USER_LIST,
        path: PAGES.USER_LIST,
        roles: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: MENUS_NAME.ROLE_LIST,
        path: PAGES.ROLE_LIST,
        roles: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: MENUS_NAME.ADD_ROLE,
        path: PAGES.ADD_ROLE,
        roles: [...ALL_ROLE_EXCEPT_GUEST],
      },
    ],
  },
];
