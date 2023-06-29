import { Navigate, RouteObject } from 'react-router-dom';

import { ALL_ROLE_EXCEPT_GUEST, PAGES, PAGES_NAME, ROLE } from '../types';
import lazy from '../utils/lazy';

type RouteProps = RouteObject & {
  auth: ROLE[];
  name: PAGES_NAME;
  settings?: {
    layout: {
      navbar?: boolean;
      toolbar?: boolean;
    };
  };
};

export const ROUTES_CONFIG: RouteProps[] = [
  /**
   * Auth
   */
  {
    path: PAGES.SIGN_IN,
    auth: [ROLE.GUEST],
    name: PAGES_NAME.SIGN_IN,
    settings: {
      layout: {
        navbar: false,
        toolbar: false,
      },
    },
    element: lazy({ path: 'pages/auth/sign-in', fullScreen: true }),
  },
  {
    path: PAGES.FORGOT_PASSWORD,
    auth: [ROLE.GUEST],
    name: PAGES_NAME.FORGOT_PASSWORD,
    settings: {
      layout: {
        navbar: false,
        toolbar: false,
      },
    },
    element: lazy({ path: 'pages/auth/forgot-password' }),
  },
  {
    path: PAGES.CHANGE_PASSWORD,
    auth: [ROLE.GUEST],
    name: PAGES_NAME.CHANGE_PASSWORD,
    settings: {
      layout: {
        navbar: false,
        toolbar: false,
      },
    },
    element: lazy({ path: 'pages/auth/change-password' }),
  },

  /**
   * Home
   */
  {
    path: PAGES.HOME,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.HOME,
    element: lazy({ path: 'pages/home' }),
  },

  /**
   * Notification
   */
  {
    path: PAGES.NOTIFICATION,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.NOTIFICATION,
    element: lazy({ path: 'pages/notification' }),
  },

  /**
   * Profile
   */
  {
    path: PAGES.PROFILE,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.PROFILE,
    element: lazy({ path: 'pages/profile' }),
  },

  /**
   * Projects
   */
  {
    path: PAGES.PROJECT_LIST,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.PROJECT_LIST,
    element: lazy({ path: 'pages/project/project-list' }),
  },
  {
    path: PAGES.PROJECT_DETAIL,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.PROJECT_DETAIL,
    element: lazy({ path: 'pages/project/project-detail' }),
  },
  {
    path: PAGES.ADD_PROJECT,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.ADD_PROJECT,
    element: lazy({ path: 'pages/project/add-project' }),
  },
  {
    path: PAGES.UPDATE_PROJECT,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.UPDATE_PROJECT,
    element: lazy({ path: 'pages/project/update-project' }),
  },

  /**
   * Task
   */
  {
    path: PAGES.TASK_LIST,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.TASK_LIST,
    element: lazy({ path: 'pages/task/task-list' }),
  },
  {
    path: PAGES.TASK_DETAIL,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.TASK_DETAIL,
    element: lazy({ path: 'pages/task/task-detail' }),
  },
  {
    path: PAGES.ADD_TASK,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.ADD_TASK,
    element: lazy({ path: 'pages/task/add-task' }),
  },
  {
    path: PAGES.UPDATE_TASK,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.UPDATE_TASK,
    element: lazy({ path: 'pages/task/update-task' }),
  },

  /**
   * Plan
   */
  {
    path: PAGES.PLAN_LIST,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.PLAN_LIST,
    element: lazy({ path: 'pages/plan/project-list' }),
  },
  {
    path: PAGES.PLAN_DETAIL,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.PLAN_DETAIL,
    element: lazy({ path: 'pages/plan/project-detail' }),
  },
  {
    path: PAGES.ADD_PLAN,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.ADD_PLAN,
    element: lazy({ path: 'pages/plan/add-project' }),
  },
  {
    path: PAGES.UPDATE_PLAN,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.UPDATE_PLAN,
    element: lazy({ path: 'pages/plan/update-project' }),
  },

  /**
   * Task
   */
  {
    path: PAGES.JOB_LIST,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.JOB_LIST,
    element: lazy({ path: 'pages/job/task-list' }),
  },
  {
    path: PAGES.JOB_DETAIL,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.JOB_DETAIL,
    element: lazy({ path: 'pages/job/task-detail' }),
  },
  {
    path: PAGES.ADD_JOB,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.ADD_JOB,
    element: lazy({ path: 'pages/job/add-task' }),
  },
  {
    path: PAGES.UPDATE_JOB,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.UPDATE_JOB,
    element: lazy({ path: 'pages/job/update-task' }),
  },
  /**
   * Candidate
   */
  {
    path: PAGES.CANDIDATE_LIST,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.CANDIDATE_LIST,
    element: lazy({ path: 'pages/personnel-management/candidate-list' }),
  },
  {
    path: PAGES.ADD_CANDIDATE,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.ADD_CANDIDATE,
    element: lazy({ path: 'pages/personnel-management/add-candidate' }),
  },

  /**
   * User group
   */
  {
    path: PAGES.USER_GROUP_LIST,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.USER_GROUP_LIST,
    element: lazy({ path: 'pages/system-management/user-group-list' }),
  },
  {
    path: PAGES.USER_GROUP_DETAIL,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.USER_GROUP_DETAIL,
    element: lazy({ path: 'pages/system-management/user-group-detail' }),
  },
  {
    path: PAGES.ADD_USER_GROUP,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.ADD_USER_GROUP,
    element: lazy({ path: 'pages/system-management/add-user-group' }),
  },
  {
    path: PAGES.UPDATE_USER_GROUP,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.UPDATE_USER_GROUP,
    element: lazy({ path: 'pages/system-management/update-user-group' }),
  },

  /**
   * User
   */
  {
    path: PAGES.USER_LIST,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.USER_LIST,
    element: lazy({ path: 'pages/system-management/user-list' }),
  },
  {
    path: PAGES.USER_DETAIL,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.USER_DETAIL,
    element: lazy({ path: 'pages/system-management/user-detail' }),
  },
  {
    path: PAGES.ADD_USER,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.ADD_USER,
    element: lazy({ path: 'pages/system-management/add-user' }),
  },
  {
    path: PAGES.UPDATE_USER,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.UPDATE_USER,
    element: lazy({ path: 'pages/system-management/update-user' }),
  },

  /**
   * Role
   */
  {
    path: PAGES.ROLE_LIST,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.ROLE_LIST,
    element: lazy({ path: 'pages/system-management/role-list' }),
  },
  {
    path: PAGES.ROLE_DETAIL,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.ROLE_DETAIL,
    element: lazy({ path: 'pages/system-management/role-detail' }),
  },
  {
    path: PAGES.ADD_ROLE,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.ADD_ROLE,
    element: lazy({ path: 'pages/system-management/add-role' }),
  },
  {
    path: PAGES.UPDATE_ROLE,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.UPDATE_ROLE,
    element: lazy({ path: 'pages/system-management/update-role' }),
  },

  /**
   * Error
   */
  {
    path: PAGES.ERROR_404,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.ERROR_404,
    element: lazy({ path: 'pages/error/404' }),
  },

  /**
   * All
   */
  {
    path: PAGES.ALL,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.ALL,
    element: <Navigate to={PAGES.ERROR_404} />,
  },
  // for dashboard only
  {
    path: PAGES.DAY_TASK,
    auth: [...ALL_ROLE_EXCEPT_GUEST],
    name: PAGES_NAME.DAY_TASK,
    element: lazy({ path: 'pages/job/add-task' }),
  },
];
