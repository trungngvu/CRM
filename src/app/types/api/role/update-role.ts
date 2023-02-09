import { ACTIVE_STATUS } from '../../active-status';
import { RoleProps } from './role';

export type UpdateRoleProps = {
  id: string | number;
  name: string;
  description: string;
  status: ACTIVE_STATUS;
};

export type UpdateRoleResponse = RoleProps;
