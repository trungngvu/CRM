import { Icon, PeopleIcon, ReaderIcon, SettingIcon } from '../components/core/icons';
import { ALL_ROLE_EXCEPT_GUEST, PAGES, PAGES_NAME, ROLE } from '../types';

export type MENU = {
  name: PAGES_NAME;
  icon: JSX.Element;
  path: string;
  auth: ROLE[];
  subs?: {
    name: PAGES_NAME;
    path: string;
    auth: ROLE[];
  }[];
};

export const MENUS: MENU[] = [
  {
    name: PAGES_NAME.HOME,
    icon: <Icon icon={ReaderIcon} size={20} />,
    path: PAGES.HOME,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
  },
  {
    name: PAGES_NAME.PROJECT,
    icon: <Icon icon={ReaderIcon} size={20} />,
    path: PAGES.PROJECT,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    subs: [
      {
        name: PAGES_NAME.PROJECT_LIST,
        path: PAGES.PROJECT_LIST,
        auth: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: PAGES_NAME.ADD_PROJECT,
        path: PAGES.ADD_PROJECT,
        auth: [...ALL_ROLE_EXCEPT_GUEST],
      },
    ],
  },
  {
    name: PAGES_NAME.PLAN,
    icon: <Icon icon={ReaderIcon} size={20} />,
    path: PAGES.PLAN,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    subs: [
      {
        name: PAGES_NAME.PLAN_LIST,
        path: PAGES.PLAN_LIST,
        auth: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: PAGES_NAME.ADD_PLAN,
        path: PAGES.ADD_PLAN,
        auth: [...ALL_ROLE_EXCEPT_GUEST],
      },
    ],
  },
  {
    name: PAGES_NAME.PERSONNEL_MANAGEMENT,
    icon: <Icon icon={PeopleIcon} size={20} />,
    path: PAGES.PERSONNEL_MANAGEMENT,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    subs: [
      {
        name: PAGES_NAME.CANDIDATE_LIST,
        path: PAGES.CANDIDATE_LIST,
        auth: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: PAGES_NAME.ADD_CANDIDATE,
        path: PAGES.ADD_CANDIDATE,
        auth: [...ALL_ROLE_EXCEPT_GUEST],
      },
    ],
  },
  {
    name: PAGES_NAME.SYSTEM_MANAGEMENT,
    icon: <Icon icon={SettingIcon} size={20} />,
    path: PAGES.SYSTEM_MANAGEMENT,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    subs: [
      {
        name: PAGES_NAME.USER_GROUP_LIST,
        path: PAGES.USER_GROUP_LIST,
        auth: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: PAGES_NAME.ADD_USER_GROUP,
        path: PAGES.ADD_USER_GROUP,
        auth: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: PAGES_NAME.ADD_USER,
        path: PAGES.ADD_USER,
        auth: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: PAGES_NAME.USER_LIST,
        path: PAGES.USER_LIST,
        auth: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: PAGES_NAME.ROLE_LIST,
        path: PAGES.ROLE_LIST,
        auth: [...ALL_ROLE_EXCEPT_GUEST],
      },
      {
        name: PAGES_NAME.ADD_ROLE,
        path: PAGES.ADD_ROLE,
        auth: [...ALL_ROLE_EXCEPT_GUEST],
      },
    ],
  },
];
