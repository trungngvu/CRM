export type RoleStatus = 'ALL' | 'ACTIVE' | 'DEACTIVATE';

export type RoleProps = {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  description: string;
  status: RoleStatus;
};

export type Role = {
  description: string;
  id: number;
  name: string;
  status: RoleStatus;
};
