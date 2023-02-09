export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL,

  SIGN_UP: '/auth/sign-up',
  SIGN_IN_WITH_EMAIL_AND_PASSWORD: '/auth/email/login',
  SIGN_IN_WITH_TOKEN: '/auth/me',
  FORGOT_PASSWORD: '/auth/forgot-password',
  CHANGE_PASSWORD: '/auth/change-password',

  PROJECTS: '/project-manager',

  TASKS: '/work-manager',
  TASK_USERS: '/work-manager/users',

  USERS: '/users',

  DEPARTMENT: '/department',

  ROLE: '/roles',
  PERMISSION: '/roles/permissions',

  FILES: '/files',
  FILES_UPLOAD: '/files/upload',

  RESUME: '/analysis-cv',
  RESUME_UPLOAD: '/analysis-cv/upload',
};
