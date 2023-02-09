import { ACTIVE_STATUS } from '../../active-status';
import { RoleProps } from './role';

export type CreateRoleProps = {
  name: string;
  description: string;
  status: ACTIVE_STATUS;
};

export type CreateRoleResponse = RoleProps;
