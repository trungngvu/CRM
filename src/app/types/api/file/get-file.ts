import { File } from './file';

export type GetFileProps = {
  path: string | number | null;
};

export type GetFileResponse = {
  data: File;
};
