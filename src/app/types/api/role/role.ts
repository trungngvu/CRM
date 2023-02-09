import { ACTIVE_STATUS } from '../../active-status';
import { PAGES_NAME } from '../../pages-name';

export type RoleProps = {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  description: string;
  status: ACTIVE_STATUS;
  permissions: {
    id: number;
    name: PAGES_NAME;
  }[];
};

export type Role = {
  description: string;
  id: number;
  name: string;
  status: ACTIVE_STATUS;
};
