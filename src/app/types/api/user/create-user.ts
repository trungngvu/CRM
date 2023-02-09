import { ACTIVE_STATUS } from '../../active-status';
import { UserProps } from './user';

export type CreateUserProps = {
  email: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  gender: string;
  photo?: string;
  roles: number[];
  department: number[];
  status: ACTIVE_STATUS;
};

export type CreateUserResponse = UserProps;
