import { USER_GROUP_STATUS } from '../../user-group-status';
import { Role } from '../role';
import { UserProps } from '../user';

export type DepartmentProps = {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  description: string;
  status: USER_GROUP_STATUS;
  users: UserProps[];
  roles: Role[];
};
