import { UserProps } from '../user';

export type SignInWithTokenResponse = {
  token: string;
  user: UserProps;
};
