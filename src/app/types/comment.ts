import { COMMENT_TYPE } from './comment-type';

export interface COMMENT {
  id: number;
  name: string;
  userID: number;
  time: string;
  detail: string | Array<string>;
  type: COMMENT_TYPE;
  avaSrc?: string;
}
