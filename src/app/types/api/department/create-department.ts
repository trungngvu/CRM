import { USER_GROUP_STATUS } from '../../user-group-status';
import { DepartmentProps } from './department';

export type CreateDepartmentProps = {
  name: string;
  description: string;
  status?: USER_GROUP_STATUS;
  users: number[];
  roles: number[];
};

export type CreateDepartmentResponse = DepartmentProps;
