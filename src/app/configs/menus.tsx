import { Icon, ReaderIcon } from '../components/core/icons';
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
    icon: <img src="/assets/icons/home.svg" alt="home icon" width={20} />,
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
    icon: <img src="/assets/icons/calendar.svg" alt="plan icon" width={20} />,
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
    name: PAGES_NAME.FAQ,
    icon: <img src="/assets/icons/faq.svg" alt="faq icon" width={20} />,
    path: PAGES.FAQ,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
  },
];
