import { USER_GROUP_STATUS } from '../../user-group-status';
import { DepartmentProps } from './department';

export type UpdateDepartmentProps = {
  id: string;
  name: string;
  description: string;
  status?: USER_GROUP_STATUS;
  users: number[];
};

export type UpdateDepartmentResponse = Partial<DepartmentProps>;
