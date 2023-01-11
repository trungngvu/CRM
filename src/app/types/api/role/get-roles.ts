import { RoleProps } from './role';

export type GetRolesProps = {
  id: string | number | null;
};

export type GetRolesResponse = {
  data: RoleProps[];
  count: number;
};
