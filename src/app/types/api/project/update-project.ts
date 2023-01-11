import { PROJECT_AND_TASK_STATUS } from '../../project-and-task-status';
import { ProjectProps } from './project';

export type UpdateProjectProps = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  managerId: number;
  status?: PROJECT_AND_TASK_STATUS;
  users: number[];
};

export type UpdateProjectResponse = Partial<ProjectProps>;
