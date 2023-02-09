import { ACTIVE_STATUS } from '../../active-status';
import { Role } from '../role';
import { UserProps } from '../user';

export type DepartmentProps = {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  description: string;
  status: ACTIVE_STATUS;
  users: UserProps[];
  roles: Role[];
};
