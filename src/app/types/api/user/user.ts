import { ROLE } from '../../roles';
import { UserStatus } from './status';

export type Status = 'ALL' | 'ACTIVE' | 'DEACTIVATE';

export type Department = {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  status: Status;
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
  status: UserStatus;
  gender: string;
  roles: {
    createdAt: string;
    updatedAt: string;
    id: number | string;
    name: ROLE;
    status?: UserStatus;
  }[];
  phone: string;
  department: Department[];
};

export type GetUserResponse = UserProps;
