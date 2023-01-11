import { UserProps } from '../user';

export type GetUsersByTaskProps = {
  projectId: string | number | null;
};

export type GetUsersByTaskResponse = {
  data: UserProps[];
  count: number;
};
