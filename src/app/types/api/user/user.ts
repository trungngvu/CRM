import { ACTIVE_STATUS } from '../../active-status';
import { PAGES_NAME } from '../../pages-name';
import { ROLE } from '../../roles';

type UserDepartmentProps = {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  status: ACTIVE_STATUS;
};

export type UserProps = {
  createdAt: string;
  updatedAt: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  fullName: string;
  status: ACTIVE_STATUS;
  gender: string;
  permissions: PAGES_NAME[];
  roles: {
    createdAt: string;
    updatedAt: string;
    id: number | string;
    name: ROLE;
    status?: ACTIVE_STATUS;
  }[];
  phone: string;
  department: UserDepartmentProps[];
};
