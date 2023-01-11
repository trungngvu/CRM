import { UserProps } from '../api';

export type UserSliceProps = {
  waitAuthCheck: boolean;
  isAuthenticated: boolean | undefined;
  accessToken: string | null;
  data: UserProps | undefined;
};
