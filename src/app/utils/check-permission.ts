import { ROLE } from '@types';

type CheckPermissionProps = {
  auth: ROLE[] | undefined;
  roles: ROLE[];
};

const checkPermission = ({ auth, roles }: CheckPermissionProps): boolean => {
  if (!auth || auth.length === 0) {
    return true;
  }

  if (auth && auth.includes(ROLE.GUEST) && roles.length === 0) {
    return true;
  }

  return auth.some(value => roles.includes(value));
};

export default checkPermission;
