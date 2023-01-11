import { UserProps } from './user';

export type GetUserProps = {
  id: string | number | null;
};

export type GetUsersResponse = {
  data: UserProps[];
  count: number;
};
