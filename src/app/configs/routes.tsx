import { Navigate, RouteObject } from 'react-router-dom';

import { ALL_ROLE_EXCEPT_GUEST, PAGES, ROLE } from '@types';
import { lazy } from '@utils';

type RouteProps = RouteObject & {
  auth?: ROLE[];
  settings?: {
    layout: {
      navbar?: boolean;
      toolbar?: boolean;
    };
  };
};

export const ROUTES_CONFIG: RouteProps[] = [
  {
    path: PAGES.SIGN_IN,
    element: lazy({ path: 'pages/auth/sign-in', fullScreen: true }),
    auth: [ROLE.GUEST],
    settings: {
      layout: {
        navbar: false,
        toolbar: false,
      },
    },
  },
  {
    path: PAGES.FORGOT_PASSWORD,
    element: lazy({ path: 'pages/auth/forgot-password' }),
    auth: [ROLE.GUEST],
    settings: {
      layout: {
        navbar: false,
        toolbar: false,
      },
    },
  },
  {
    path: PAGES.CHANGE_PASSWORD,
    element: lazy({ path: 'pages/auth/change-password' }),
    auth: [ROLE.GUEST],
    settings: {
      layout: {
        navbar: false,
        toolbar: false,
      },
    },
  },
  {
    path: PAGES.HOME,
    element: <Navigate to={PAGES.PROJECT_LIST} />,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
  },
  {
    path: PAGES.PROFILE,
    element: lazy({ path: 'pages/profile' }),
    auth: [...ALL_ROLE_EXCEPT_GUEST],
  },
  {
    path: PAGES.PROJECT,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    children: [
      {
        path: 'list',
        element: lazy({ path: 'pages/project/project-list' }),
      },
      {
        path: 'detail',
        element: lazy({ path: 'pages/project/project-detail' }),
      },
      {
        path: 'add',
        element: lazy({ path: 'pages/project/add-project' }),
      },
      {
        path: 'update',
        element: lazy({ path: 'pages/project/update-project' }),
      },
    ],
  },
  {
    path: PAGES.TASK,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    children: [
      {
        path: 'list',
        element: lazy({ path: 'pages/task/task-list' }),
      },
      {
        path: 'detail',
        element: lazy({ path: 'pages/task/task-detail' }),
      },
      {
        path: 'add',
        element: lazy({ path: 'pages/task/add-task' }),
      },
      {
        path: 'update',
        element: lazy({ path: 'pages/task/update-task' }),
      },
    ],
  },
  {
    path: PAGES.PERSONNEL_MANAGEMENT,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    children: [
      {
        path: 'candidate-list',
        element: lazy({ path: 'pages/personnel-management/candidate-list' }),
      },
      {
        path: 'add-candidate',
        element: lazy({ path: 'pages/personnel-management/add-candidate' }),
      },
    ],
  },
  {
    path: PAGES.SYSTEM_MANAGEMENT,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    children: [
      {
        path: 'user-group-list',
        element: lazy({ path: 'pages/system-management/user-group-list' }),
      },
      {
        path: 'user-group-detail',
        element: lazy({ path: 'pages/system-management/user-group-detail' }),
      },
      {
        path: 'add-user-group',
        element: lazy({ path: 'pages/system-management/add-user-group' }),
      },
      {
        path: 'update-user-group',
        element: lazy({ path: 'pages/system-management/update-user-group' }),
      },
      {
        path: 'user-list',
        element: lazy({ path: 'pages/system-management/user-list' }),
      },
      {
        path: 'user-detail',
        element: lazy({ path: 'pages/system-management/user-detail' }),
      },
      {
        path: 'add-user',
        element: lazy({ path: 'pages/system-management/add-user' }),
      },
      {
        path: 'update-user',
        element: lazy({ path: 'pages/system-management/update-user' }),
      },
      {
        path: 'role-list',
        element: lazy({ path: 'pages/system-management/role-list' }),
      },
      {
        path: 'role-detail',
        element: lazy({ path: 'pages/system-management/role-detail' }),
      },
      {
        path: 'add-role',
        element: lazy({ path: 'pages/system-management/add-role' }),
      },
      {
        path: 'update-role',
        element: lazy({ path: 'pages/system-management/update-role' }),
      },
    ],
  },
  {
    path: PAGES.ERROR_404,
    element: lazy({ path: 'pages/error/404' }),
    auth: [...ALL_ROLE_EXCEPT_GUEST],
  },
  {
    path: PAGES.ALL,
    element: <Navigate to={PAGES.ERROR_404} />,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
  },
];
