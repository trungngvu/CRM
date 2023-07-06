export enum PAGES {
  BASE_URL = '/',
  HOME = '/',
  FAQ = '/faq',

  NOTIFICATION = '/notification',

  LOADING = '/loading',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  FORGOT_PASSWORD = '/forgot-password',
  CHANGE_PASSWORD = '/change-password',
  PROFILE = '/profile',

  PROJECT = '/project',
  PROJECT_LIST = '/project/list',
  PROJECT_DETAIL = '/project/detail',
  ADD_PROJECT = '/project/add',
  UPDATE_PROJECT = '/project/update',

  TASK = '/task',
  TASK_LIST = '/task/list',
  TASK_DETAIL = '/task/detail',
  ADD_TASK = '/task/add',
  UPDATE_TASK = '/task/update',

  PLAN = '/plan',
  PLAN_LIST = '/plan/list',
  PLAN_DETAIL = '/plan/detail',
  ADD_PLAN = '/plan/add',
  UPDATE_PLAN = '/plan/update',

  JOB = '/job',
  JOB_LIST = '/job/list',
  JOB_DETAIL = '/job/detail',
  ADD_JOB = '/job/add',
  UPDATE_JOB = '/job/update',

  PERSONNEL_MANAGEMENT = '/personnel-management',
  CANDIDATE_LIST = '/personnel-management/candidate-list',
  ADD_CANDIDATE = '/personnel-management/add-candidate',

  SYSTEM_MANAGEMENT = '/system-management',
  USER_GROUP_LIST = '/system-management/user-group-list',
  USER_GROUP_DETAIL = '/system-management/user-group-detail',
  ADD_USER_GROUP = '/system-management/add-user-group',
  UPDATE_USER_GROUP = '/system-management/update-user-group',
  USER_LIST = '/system-management/user-list',
  USER_DETAIL = '/system-management/user-detail',
  ADD_USER = '/system-management/add-user',
  UPDATE_USER = '/system-management/update-user',
  ROLE_LIST = '/system-management/role-list',
  UPDATE_ROLE = '/system-management/update-role',
  ADD_ROLE = '/system-management/add-role',
  ROLE_DETAIL = '/system-management/role-detail',

  ERROR_404 = '/error/404',
  ALL = '*',
  // For dashboard only
  DAY_TASK = '/daytask/add',
}
