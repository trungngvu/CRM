import { UserStatus } from './status';

export type CreateUserProps = {
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

export type CreateUserResponse = CreateUserProps;
