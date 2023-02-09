import { ACTIVE_STATUS } from '../../active-status';
import { DepartmentProps } from './department';

export type CreateDepartmentProps = {
  name: string;
  description: string;
  status?: ACTIVE_STATUS;
  users: number[];
  roles: number[];
};

export type CreateDepartmentResponse = DepartmentProps;
