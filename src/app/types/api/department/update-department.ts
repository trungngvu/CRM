import { ACTIVE_STATUS } from '../../active-status';
import { DepartmentProps } from './department';

export type UpdateDepartmentProps = {
  id: string;
  name: string;
  description: string;
  status?: ACTIVE_STATUS;
  users: number[];
};

export type UpdateDepartmentResponse = Partial<DepartmentProps>;
