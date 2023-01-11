import { UserStatus } from './status';

export type UpdateUserProps = {
  id: string | number;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  gender: string;
  photo?: string;
  roles: number[];
  department: number[];
  status: UserStatus;
};

export type UpdateUserResponse = UpdateUserProps;
