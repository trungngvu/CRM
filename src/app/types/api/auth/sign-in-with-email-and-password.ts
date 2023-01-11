import { UserProps } from '../user';

export type SignInWithEmailAndPasswordProps = {
  email: string;
  password: string;
  remember: boolean;
};

export type SignInWithEmailAndPasswordResponse = {
  token: string;
  user: UserProps;
};
