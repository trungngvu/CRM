import { JwtPayload } from 'jwt-decode';

export type JwtPayloadProps = JwtPayload & {
  id: string;
  email: string;
  roles: string[];
};
