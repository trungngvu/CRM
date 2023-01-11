export enum ROLE {
  USER = 'User',
  ADMIN = 'Admin',
  GUEST = 'Guest',
}

export const ALL_ROLE_EXCEPT_GUEST = [ROLE.ADMIN, ROLE.USER];
