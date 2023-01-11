import { ResumeProps } from './resume';

export type GetResumesProps = {
  id: string | number | null;
};

export type GetResumesResponse = {
  data: ResumeProps[];
  count: number;
};
