import { RoleProps, RoleStatus } from './role';

export type UpdateRoleProps = {
  id: string | number;
  name: string;
  description: string;
  status: RoleStatus;
};

export type UpdateRoleResponse = RoleProps;
